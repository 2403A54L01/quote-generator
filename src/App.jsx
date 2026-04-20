import { useEffect, useState } from "react";

const MOODS = [
  { value: "all", label: "All moods" },
  { value: "happy", label: "😊 Happy" },
  { value: "sad", label: "😢 Sad" },
  { value: "motivation", label: "🔥 Motivation" },
  { value: "love", label: "❤️ Love" },
  { value: "wisdom", label: "🦉 Wisdom" },
  { value: "success", label: "🏆 Success" },
  { value: "funny", label: "😂 Funny" },
  { value: "calm", label: "🌿 Calm" },
];

export default function App() {
  const [mood, setMood] = useState("all");
  const [quote, setQuote] = useState({ text: "Loading inspiration...", author: "Quotely", mood: "all" });
  const [fade, setFade] = useState(false);
  const [copied, setCopied] = useState(false);
  const [spin, setSpin] = useState(false);
  const [tab, setTab] = useState("generator");
  const [favorites, setFavorites] = useState([]);
  const [history, setHistory] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    try {
      const f = localStorage.getItem("qg:favorites");
      const h = localStorage.getItem("qg:history");
      if (f) setFavorites(JSON.parse(f));
      if (h) setHistory(JSON.parse(h));
    } catch {}
    fetch("/api/quotes").then((r) => r.json()).then((q) => setTotal(q.length)).catch(() => {});
    fetchQuote("all");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => { localStorage.setItem("qg:favorites", JSON.stringify(favorites)); }, [favorites]);
  useEffect(() => { localStorage.setItem("qg:history", JSON.stringify(history)); }, [history]);

  const fetchQuote = async (m = mood) => {
    setFade(true);
    setSpin(true);
    setCopied(false);
    try {
      const res = await fetch(`/api/quote?mood=${encodeURIComponent(m)}`);
      const q = await res.json();
      setTimeout(() => {
        setQuote(q);
        setFade(false);
        setHistory((prev) => (prev[0]?.text === q.text ? prev : [q, ...prev].slice(0, 20)));
      }, 350);
    } catch {
      setFade(false);
    } finally {
      setTimeout(() => setSpin(false), 600);
    }
  };

  const onMoodChange = (v) => { setMood(v); fetchQuote(v); };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(`"${quote.text}" — ${quote.author}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  const tweet = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`"${quote.text}" — ${quote.author}`)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const isFav = favorites.some((f) => f.text === quote.text);
  const toggleFav = () => {
    setFavorites((p) => (p.some((f) => f.text === quote.text) ? p.filter((f) => f.text !== quote.text) : [quote, ...p]));
  };

  const loadQuote = (q) => {
    setMood("all");
    setFade(true);
    setTimeout(() => {
      setQuote(q);
      setFade(false);
      setTab("generator");
    }, 300);
  };

  return (
    <div className="app">
      <nav className="nav">
        <div className="brand">
          <div className="brand-icon">✦</div>
          <span style={{ fontFamily: "var(--font-display)" }}>Quotely</span>
        </div>
        {total > 0 && <div className="badge">{total} curated quotes</div>}
      </nav>

      <header className="hero">
        <div className="kicker">Daily Inspiration</div>
        <h1>Words that move <em>you</em>.</h1>
        <p>Hand-picked quotes for every mood — save your favorites, revisit your history, and share what resonates.</p>
      </header>

      <div className="tabs">
        <button className={`tab ${tab === "generator" ? "active" : ""}`} onClick={() => setTab("generator")}>✦ Generator</button>
        <button className={`tab ${tab === "favorites" ? "active" : ""}`} onClick={() => setTab("favorites")}>
          ♥ Favorites {favorites.length > 0 && <span className="tab-count">{favorites.length}</span>}
        </button>
        <button className={`tab ${tab === "history" ? "active" : ""}`} onClick={() => setTab("history")}>⟲ History</button>
      </div>

      {tab === "generator" && (
        <article className="card">
          <div className="card-top">
            <div className="quote-icon">"</div>
            <select className="mood" value={mood} onChange={(e) => onMoodChange(e.target.value)}>
              {MOODS.map((m) => <option key={m.value} value={m.value}>{m.label}</option>)}
            </select>
          </div>

          <div className={`quote ${fade ? "fade-out" : ""}`}>
            <blockquote>“{quote.text}”</blockquote>
            <div className="author">
              <div className="line" />
              <span>{quote.author}</span>
            </div>
          </div>

          <div className="actions">
            <button className="btn btn-primary" onClick={() => fetchQuote()}>
              <span className={spin ? "spinning" : ""} style={{ display: "inline-block" }}>↻</span> New Quote
            </button>
            <div className="icon-row">
              <button className={`icon-btn ${isFav ? "active" : ""}`} onClick={toggleFav} title="Save">
                {isFav ? "♥" : "♡"}
              </button>
              <button className="icon-btn" onClick={copy} title="Copy">{copied ? "✓" : "⧉"}</button>
              <button className="icon-btn" onClick={tweet} title="Share on X">✕</button>
            </div>
          </div>

          <div className="meta">
            {mood === "all" ? "All moods" : MOODS.find((m) => m.value === mood)?.label} · Tap a mood to filter
          </div>
        </article>
      )}

      {tab === "favorites" && (
        favorites.length === 0 ? (
          <div className="empty">
            <div className="ico">♥</div>
            <h3>No favorites yet</h3>
            <p>Tap the heart on a quote to save it here.</p>
          </div>
        ) : (
          <div className="grid">
            {favorites.map((q, i) => (
              <QCard key={i} q={q} onClick={() => loadQuote(q)} onRemove={() => setFavorites((p) => p.filter((f) => f.text !== q.text))} />
            ))}
          </div>
        )
      )}

      {tab === "history" && (
        history.length === 0 ? (
          <div className="empty">
            <div className="ico">⟲</div>
            <h3>No history yet</h3>
            <p>Quotes you view will appear here.</p>
          </div>
        ) : (
          <>
            <div className="grid">
              {history.map((q, i) => <QCard key={i} q={q} onClick={() => loadQuote(q)} />)}
            </div>
            <button className="clear" onClick={() => setHistory([])}>🗑 Clear history</button>
          </>
        )
      )}

      <footer>Made with care · Quotely © {new Date().getFullYear()}</footer>
    </div>
  );
}

function QCard({ q, onClick, onRemove }) {
  return (
    <div className="qcard" onClick={onClick}>
      <div className="quote-icon" style={{ fontSize: 32 }}>"</div>
      <p className="q">“{q.text}”</p>
      <div className="a">— {q.author}</div>
      {q.mood && <div className="tag">{q.mood}</div>}
      {onRemove && (
        <button className="remove" onClick={(e) => { e.stopPropagation(); onRemove(); }} title="Remove">✕</button>
      )}
    </div>
  );
}
