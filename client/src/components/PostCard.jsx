import React, { useEffect, useMemo, useState } from "react";
import { MoreHorizontal, ThumbsUp, MessageCircle, Repeat2, Send, Share2, Copy } from "lucide-react";

// Helpers
const pretty = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);
const fmtConfidence = (c) =>
  typeof c === "number" && !isNaN(c) ? `${c.toFixed(1)}%` : null;

// Small badge: emoji + label + confidence; uses backend emotion color if present
const EmotionBadge = ({ emoji, label, color, confidence }) => {
  const labelPretty = pretty(label || "neutral");
  const value = fmtConfidence(confidence);

  return (
    <div
      className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[13px] font-medium"
      style={{
        borderColor: color || "var(--border, #CBD5E1)",
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.66) 0%, rgba(255,255,255,0.9) 100%)",
      }}
      aria-label={`Detected emotion ${labelPretty}${value ? ` at ${value}` : ""}`}
    >
      <span className="text-[16px] leading-none">{emoji || "😐"}</span>
      <span
        className="bg-clip-text text-transparent"
        style={{
          backgroundImage: `linear-gradient(90deg, ${color || "#64748B"}, #6366F1)`,
        }}
      >
        {labelPretty}
        {value && <span className="ml-1 text-muted-foreground">({value})</span>}
      </span>
    </div>
  );
};

const PostCard = ({ post }) => {
  // Safe defaults
  const {
    id,
    user = "Anonymous User",
    username = "user",
    avatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=manish",
    text = "",
    emotion = {},
    time = "Just now",
    image,
    likes = 0,
    comments = 0,
  } = post || {};

  const [analyzed, setAnalyzed] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setAnalyzed(true), 800);
    return () => clearTimeout(t);
  }, []);

  const accent = useMemo(() => emotion?.color || "var(--border, #E5E7EB)", [emotion?.color]);

  const handleLike = () => {
    setLiked((v) => !v);
    setLikeCount((c) => (liked ? Math.max(0, c - 1) : c + 1));
  };

  // Long text expander
  const MAX_CHARS = 320;
  const isLong = (text || "").length > MAX_CHARS;
  const visibleText = isLong && !expanded ? `${text.slice(0, MAX_CHARS)}…` : text;

  // Share / copy helpers
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(text || "");
    } catch {}
  };

  const shareNative = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title: "Post", text: text || "" });
      } else {
        await copyToClipboard();
      }
    } catch {}
  };

  return (
    <div
      className="bg-card border border-border rounded-xl shadow-soft hover-lift animate-fade-in"
      aria-live="polite"
    >
      {/* Header */}
      <div className="flex items-start justify-between px-5 pt-5 pb-3">
        <div className="flex items-start gap-3">
          <span className="relative inline-flex">
            <img
              src={avatar}
              alt={`${user} avatar`}
              className="w-10 h-10 rounded-full border-2 border-border object-cover"
              loading="lazy"
            />
            {/* Accent ring from emotion color */}
            <span
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{ boxShadow: `0 0 0 2px ${accent} inset` }}
              aria-hidden="true"
            />
          </span>
          <div>
            <h3 className="text-sm font-semibold text-foreground">{user}</h3>
            <p className="text-xs text-muted-foreground">
              @{username} · {time}
            </p>
          </div>
        </div>
        <button
          className="p-1.5 rounded-md hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="More options"
          type="button"
        >
          <MoreHorizontal size={18} />
        </button>
      </div>

      {/* Content */}
      <div className="px-5 pb-3 text-sm leading-relaxed text-foreground whitespace-pre-line">
        {visibleText}
        {isLong && (
          <button
            onClick={() => setExpanded((v) => !v)}
            className="ml-2 text-xs font-medium text-primary hover:underline"
            type="button"
          >
            {expanded ? "See less" : "See more"}
          </button>
        )}
      </div>

      {/* Optional Image */}
      {image && (
        <div className="px-5 pb-3">
          <img
            src={image}
            alt="Post content"
            className="w-full rounded-xl border border-border object-cover"
            loading="lazy"
          />
        </div>
      )}

      {/* Emotion */}
      <div className="min-h-[28px] px-5 pb-3">
        {!analyzed ? (
          <div className="h-6 w-52 rounded-full bg-muted animate-pulse" aria-label="Analyzing…" />
        ) : emotion?.label || emotion?.emoji ? (
          <div className="flex items-center gap-2 text-sm font-medium">
            <EmotionBadge
              emoji={emotion?.emoji}
              label={emotion?.label}
              color={emotion?.color}
              confidence={post?.confidence}
            />
          </div>
        ) : (
          <p className="text-muted-foreground italic text-xs">No sentiment detected.</p>
        )}
      </div>

      {/* Accent divider */}
      <div
        className="h-px w-full"
        style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
        aria-hidden="true"
      />

      {/* Actions */}
      <div className="flex justify-around items-center text-muted-foreground text-sm px-5 py-3">
        <button
          onClick={handleLike}
          className={`flex items-center gap-2 hover:text-primary transition-colors ${
            liked ? "text-primary" : ""
          }`}
          type="button"
          aria-pressed={liked}
          aria-label="Like"
        >
          <ThumbsUp size={16} className={liked ? "fill-current" : ""} />
          <span>{likeCount > 0 ? likeCount : "Like"}</span>
        </button>

        <button className="flex items-center gap-2 hover:text-primary transition-colors" type="button">
          <MessageCircle size={16} />
          <span>{comments > 0 ? comments : "Comment"}</span>
        </button>

        <button className="flex items-center gap-2 hover:text-accent transition-colors" type="button">
          <Repeat2 size={16} />
          <span>Repost</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={shareNative}
            className="flex items-center gap-2 hover:text-primary transition-colors"
            type="button"
            aria-label="Share"
          >
            <Share2 size={16} />
            <span>Share</span>
          </button>
          <button
            onClick={copyToClipboard}
            className="flex items-center gap-2 hover:text-primary transition-colors"
            type="button"
            aria-label="Copy post text"
          >
            <Copy size={16} />
            <span>Copy</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
