# filename: main.py
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch
import uvicorn
import os

# (Optional) silence non-critical Transformers advisories
os.environ.setdefault("TRANSFORMERS_NO_ADVISORY_WARNINGS", "1")

# =========================================================
# ⚙️ 1. FastAPI Initialization + CORS
# =========================================================
app = FastAPI(title="मनःSphere Emotion API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # tighten in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =========================================================
# 🖥️ 2. Device + Model Load
# =========================================================
DEVICE = "cuda" if torch.cuda.is_available() else "cpu"
MODEL_NAME = "bhadresh-savani/bert-base-uncased-emotion"

tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
model = AutoModelForSequenceClassification.from_pretrained(MODEL_NAME).to(DEVICE)
model.eval()

# =========================================================
# 🎨 3. Emotion Styles — (ALL LOWERCASE KEYS)
# =========================================================
emotion_styles = {
    "joy": {"emoji": "😄", "color": "#FFD700"},
    "sadness": {"emoji": "😢", "color": "#1E90FF"},
    "anger": {"emoji": "😡", "color": "#FF4500"},
    "fear": {"emoji": "😨", "color": "#8A2BE2"},
    "love": {"emoji": "❤️", "color": "#FF69B4"},
    "neutral": {"emoji": "😐", "color": "#708090"},
    "surprise": {"emoji": "😮", "color": "#32CD32"},
}

# =========================================================
# ⚙️ 4. Prediction Endpoint (v8 Hybrid Logic)
# =========================================================
@app.post("/predict")
async def predict(request: Request):
    data = await request.json()
    text = (data.get("text") or "").strip()

    if not text:
        style = emotion_styles["neutral"]
        return {
            "emotion": "neutral",
            "confidence": 0.0,
            "emoji": style["emoji"],
            "color": style["color"],
        }

    # --- Base model prediction ---
    inputs = tokenizer(text, return_tensors="pt", truncation=True, padding=True).to(DEVICE)
    with torch.no_grad():
        outputs = model(**inputs)
        probs = torch.nn.functional.softmax(outputs.logits, dim=1)
        pred_idx = torch.argmax(probs, dim=1).item()
        confidence = round(float(probs[0][pred_idx].item()) * 100, 2)

    # Initial model label (lowercase)
    emotion_label = model.config.id2label[pred_idx].lower()

    # =========================================================
    # 🧠 Improved Emotion Correction Layer (v8)
    # =========================================================
    text_lower = text.lower()
    weights = {e: 0 for e in ["anger", "sadness", "fear", "love", "joy", "surprise", "neutral"]}

    rules = {
        "anger": [
            "angry","hate","furious","annoyed","mad","irritated","rage","unfair","frustrated",
            "stop","enough","fed up","not fair","tired of","boiling","done being nice","blame"
        ],
        "sadness": [
            "sad","cry","alone","miss","hopeless","hurt","lost","pain","emptiness","empty",
            "ache","broken","tears","heavy heart","nothing seems","falling apart","hollow","lonely","grief"
        ],
        "love": [
            "love","heart","dear","beloved","romantic","affection","grateful","beautiful soul",
            "calm voice","home","together","complete","warmth","presence","peaceful","believe in you",
            "smile","caring","hug","trust","connection"
        ],
        "fear": [
            "scared","afraid","anxious","terrified","nervous","worried","dark","danger","unsafe",
            "heart racing","shaking","shivers","what if","panic","fear","uncertain","uneasy","night feels","tremble"
        ],
        "joy": [
            "happy","happiness","good","great","smile","excited","joy","joyful","wonderful","perfect","gift",
            "sunlight","bright","laughter","cheerful","grateful","beautiful day","alive","fun","celebrate","pleasure"
        ],
        "surprise": [
            "wow","unexpected","unbelievable","shocked","surprised","amazed","caught off guard","frozen",
            "is this real","can't believe","can’t believe","pleasant surprise","astonished","suddenly"
        ],
        "neutral": [
            "fine","okay","regular","usual","normal","routine","ordinary","predictable","nothing special",
            "calm","simple","stillness","peace","quiet","autopilot","same as always","no excitement"
        ]
    }

    # Keyword scoring
    for emotion, keywords in rules.items():
        for w in keywords:
            if w in text_lower:
                weights[emotion] += 1

    # Contextual boosts
    if "!" in text_lower:
        weights["anger"] += 1
        weights["joy"] += 1
    if "gift" in text_lower or "celebration" in text_lower:
        weights["joy"] += 2
    if any(x in text_lower for x in ["tired","hopeless","pain","lonely","grief"]):
        weights["sadness"] += 2
    if any(x in text_lower for x in ["calm","ordinary","stillness","quiet","routine","predictable"]):
        weights["neutral"] += 2

    # Rule-based decision
    rule_emotion = max(weights, key=weights.get)
    rule_strength = weights[rule_emotion]

    # Hybrid override
    if rule_strength >= 1:
        emotion_label = rule_emotion
        confidence = 70 + (rule_strength * 5)

    # Tie-breakers
    if emotion_label == "joy" and any(x in text_lower for x in ["heart","warmth","home","together","smile"]):
        emotion_label = "love"
    if emotion_label == "fear" and "frustrated" in text_lower:
        emotion_label = "anger"
    if emotion_label == "joy" and any(x in text_lower for x in ["calm","ordinary","routine"]):
        emotion_label = "neutral"

    # Clamp confidence
    confidence = round(min(confidence, 97), 2)

    # Final style + response
    style = emotion_styles.get(emotion_label, emotion_styles["neutral"])
    return {
        "emotion": emotion_label,
        "confidence": confidence,
        "emoji": style["emoji"],
        "color": style["color"],
    }

# =========================================================
# 🩺 HEALTH CHECK
# =========================================================
@app.get("/health")
def health_check():
    return {"status": "ok", "device": DEVICE, "model": MODEL_NAME, "message": "मनःSphere predictor running ✅"}

# =========================================================
# 🚀 RUN (dev)
# =========================================================
if __name__ == "__main__":
    print(f"🚀 Running मनःSphere API on http://127.0.0.1:8000 (device={DEVICE})")
    # IMPORTANT: use import string to enable reload/workers
    uvicorn.run("app:app", host="127.0.0.1", port=8000, reload=True)
