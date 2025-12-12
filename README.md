# 🌿 मनःSphere — AI-Powered Mental Wellness Platform  
*A Social Platform + AI Emotion Engine for Mindful Living*

मनःSphere is an advanced AI-powered mental wellness platform designed to help users understand their emotions, track their mood, discover wellness activities, and connect with a supportive community.  
It combines **empathy with artificial intelligence** to make mental wellness *simple, private, and empowering*.

This project includes a complete social ecosystem — AI-analyzed posts, activity discovery, messaging, notifications, profile system, mental check-ups, and more — all powered by a state-of-the-art **DeBERTa-v3 emotion classification model**.

---

## ✨ Features

### 🏠 Modern Landing Page  
- Sleek design with branding (*मन्:Sphere*)  
- Headline: *Find Peace with AI-Powered Clarity*  
- Clear CTAs: **Start Your Journey**, **Learn How It Works**, **Discover Calm**

---

### 👤 Authentication System  
#### **Sign-Up Page**
- Full name, username, email, password fields  
- Smooth gradient design  
- Secure account creation  

#### **Login Page**
- Email/username + password login  
- Minimal UI with soft shadows  

---

### 🧠 AI-Powered Home Feed  
- Users can post text, photos, or videos  
- Every post gets **real-time emotion classification**  
- Displays emotion label + confidence percentage (e.g., *Sadness 75%*)  
- Interaction options: Like, Comment, Repost, Share, Copy  

---

### 🎯 Activity Discovery  
Users can explore curated wellness activities:

Categories include:  
`Meditation`, `Workshop`, `Fitness`, `Outdoor`, `Wellness`, `Creative`

Each activity card displays:  
- Host  
- Date & time  
- Duration  
- Mode (Virtual/In-person)  
- Registered users  
- Trending badge  
- Join Now button  

---

### 🧪 Mental Wellness Check-up  
- Based on **PHQ-9, GAD-7, WHO-5**  
- 15–20 quick questions  
- Accurate mental health screening  
- Entirely private and secure  

---

### 🔔 Notifications Center  
- Activity reminders  
- Mentions  
- Wellness suggestions  
- Filters: All | Mentions | Topics  
- Option to mark all as read  

---

### 👤 User Profile Page  
Includes:  
- Cover image  
- Avatar  
- Username + handle  
- Bio with emojis  
- Location  
- Website link  
- Join date  
- Stats: Posts | Following | Followers  
- Tabs: Posts | Saved | Tagged  

---

### 🆘 Help & Support Center  
- FAQs  
- Community guidelines  
- Privacy & safety  
- Contact support  
- Getting started guide  

---

# 🤖 AI Models Used

मनःSphere’s AI engine was built by training and comparing **12 models** across 3 categories:

---

## 1️⃣ Traditional Machine Learning Models
Using **TF-IDF (30k features)**:

- **Support Vector Machine (SVM)**
- **Logistic Regression**
- **Naïve Bayes**

Strengths: Fast & interpretable  
Weaknesses: No deep contextual understanding  

---

## 2️⃣ Deep Learning Models (Sequential)
Built using **TensorFlow/Keras** + **Word2Vec/GloVe** embeddings:

- **Text-CNN**  
- **BiLSTM**  
- **BiLSTM + Attention**  

Strengths: Captures word sequences & emotional cues  
Weaknesses: Weaker on long-context than Transformers  

---

## 3️⃣ Transformer Models (State-of-the-Art)
Using **HuggingFace Transformers**:

- **BERT Base**
- **DistilBERT Base**
- **MPNet Base**
- **DeBERTa-v3 Baseline (D1)**
- **DeBERTa-v3 Weighted-Focal (D2)**
- **DeBERTa-v3 Smoothed-Focal (D3)**

Strengths: Best emotional nuance + context understanding  
Weaknesses: Higher computational requirements  

---

# 📊 FULL MODEL COMPARISON TABLE

| Category | Model | Architecture | Enhancements | Accuracy | Macro F1 | Notes |
|----------|--------|--------------|--------------|----------|----------|-------|
| Traditional ML | **SVM** | TF-IDF | — | **0.7558** | **0.7585** | Best classical model |
| Traditional ML | Logistic Regression | TF-IDF | — | 0.7410 | 0.7441 | Stable baseline |
| Traditional ML | Naïve Bayes | TF-IDF | — | 0.6997 | 0.7088 | Weak minority recall |
| Deep Learning | Text-CNN | CNN | Word Embeddings | 0.7636 | 0.7620 | Fast convergence |
| Deep Learning | BiLSTM | LSTM | Word Embeddings | 0.7618 | 0.7590 | Bidirectional context |
| Deep Learning | **BiLSTM + Attention** | LSTM + Attention | Word Embeddings | **0.7650** | **0.7650** | Best deep model |
| Transformers | BERT Base | Transformer | — | 0.7970 | 0.7970 | Strong baseline |
| Transformers | DistilBERT | Transformer | — | 0.7916 | 0.7919 | Lightweight |
| Transformers | MPNet Base | Mask+Permute LM | Focal Loss | 0.7990 | 0.7990 | Balanced |
| Transformers | **DeBERTa-v3 D1** | Disentangled Attention | Baseline | 0.7923 | 0.7923 | Base model |
| Transformers | ⭐ **DeBERTa-v3 D2** ⭐ | Disentangled Attention | **Focal Loss + Class Weights** | **0.8121** | **0.813** | ⭐ BEST OVERALL |
| Transformers | DeBERTa-v3 D3 | Disentangled Attention | Label Smoothing + FP16 | 0.8122 | 0.8120 | Best runtime efficiency |

---

# 🏆 Best Model: **DeBERTa-v3 Weighted-Focal (Model D2)**

This is the final production model integrated into मनःSphere’s backend.

### ✔ Why It’s the Best:
- Highest accuracy: **81.21%**  
- Highest macro F1: **0.813**  
- Excellent at minority emotions  
- Most stable during training  
- Deep contextual emotional understanding  
- Best generalization on unseen text  

This model powers:  
✔ Feed emotion tags  
✔ Mood insights  
✔ Mental check-up analysis  
✔ Recommendation engine  

---

# 🧱 System Architecture

### High-Level Workflow:
1. **User Input** (posts/messages/journal entries)  
2. **Preprocessing** (tokenization, cleaning, embeddings)  
3. **Emotion Classification** using DeBERTa-v3  
4. **Confidence Scoring**  
5. **Mood Dashboard & Insights**  
6. **Trend Analysis & Recommendations**

---

# 📚 Dataset  
Based on your dataset description:

- **169,845 samples**  
- **7 emotion classes**: anger, fear, joy, love, neutral, sadness, surprise  
- Balanced dataset  
- Clean, high-quality text  
- No missing values  
- Suitable for deep learning & transformers  

---

# 🛠 Tech Stack

### **Frontend**
- React.js  
- TailwindCSS  
- Modern, responsive UI  

### **Backend**
- FastAPI / Flask  
- REST APIs  
- JWT authentication  

### **AI/ML**
- HuggingFace Transformers  
- PyTorch  
- DeBERTa-v3 fine-tuning  

### **Database**
- MongoDB  

---

# 🚀 Installation & Setup

### 1️⃣ Clone Repository
```
git clone https://github.com/yourusername/manahSphere.git
cd manahSphere
```
###2️⃣ Install Client
```
cd client
npm install
npm start
```
###3️⃣ Install Backend
```
cd server
pip install -r requirements.txt
uvicorn main:app --reload
```
###4️⃣ Add Environment Variables
```
Create a .env:

MONGO_URI=your_mongo_url
JWT_SECRET=your_secret
MODEL_PATH=./models/deberta-v3
🚀 Running the AI Model Server
python model_server.py
```
---
#🔮 Future Enhancements

AI Emotional Chatbot

Multi-language support (Hindi, Bengali, etc.)

Multimodal analysis (text + voice + facial emotions)

Cloud deployment (AWS/GCP/Azure)

Better personalization algorithms
---
#👥 Authors

Manish Kumar Gupta

Sneha Kumari

Aastha Jaiswal

Ankit Shaw

Anand Kumar

Guided by
Prof. Dr. Sudipta Basu Pal
University of Engineering & Management, Kolkata
