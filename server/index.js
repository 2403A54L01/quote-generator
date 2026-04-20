import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

const QUOTES = [
  { text: "Happiness is not something ready made. It comes from your own actions.", author: "Dalai Lama", mood: "happy" },
  { text: "The most wasted of days is one without laughter.", author: "E. E. Cummings", mood: "happy" },
  { text: "For every minute you are angry you lose sixty seconds of happiness.", author: "Ralph Waldo Emerson", mood: "happy" },
  { text: "The purpose of our lives is to be happy.", author: "Dalai Lama", mood: "happy" },
  { text: "Count your age by friends, not years. Count your life by smiles, not tears.", author: "John Lennon", mood: "happy" },
  { text: "Try to be a rainbow in someone's cloud.", author: "Maya Angelou", mood: "happy" },
  { text: "Tears come from the heart and not from the brain.", author: "Leonardo da Vinci", mood: "sad" },
  { text: "Every man has his secret sorrows which the world knows not.", author: "Henry Wadsworth Longfellow", mood: "sad" },
  { text: "The word 'happy' would lose its meaning if it were not balanced by sadness.", author: "Carl Jung", mood: "sad" },
  { text: "Sadness flies away on the wings of time.", author: "Jean de La Fontaine", mood: "sad" },
  { text: "There is no greater sorrow than to recall happiness in times of misery.", author: "Dante Alighieri", mood: "sad" },
  { text: "Tears are words that need to be written.", author: "Paulo Coelho", mood: "sad" },
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs", mood: "motivation" },
  { text: "It always seems impossible until it's done.", author: "Nelson Mandela", mood: "motivation" },
  { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt", mood: "motivation" },
  { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson", mood: "motivation" },
  { text: "The secret of getting ahead is getting started.", author: "Mark Twain", mood: "motivation" },
  { text: "Do one thing every day that scares you.", author: "Eleanor Roosevelt", mood: "motivation" },
  { text: "Everything you've ever wanted is on the other side of fear.", author: "George Addair", mood: "motivation" },
  { text: "Where there is love there is life.", author: "Mahatma Gandhi", mood: "love" },
  { text: "Love all, trust a few, do wrong to none.", author: "William Shakespeare", mood: "love" },
  { text: "The best thing to hold onto in life is each other.", author: "Audrey Hepburn", mood: "love" },
  { text: "We are most alive when we're in love.", author: "John Updike", mood: "love" },
  { text: "To love and be loved is to feel the sun from both sides.", author: "David Viscott", mood: "love" },
  { text: "Spread love everywhere you go.", author: "Mother Teresa", mood: "love" },
  { text: "The mind is everything. What you think you become.", author: "Buddha", mood: "wisdom" },
  { text: "An unexamined life is not worth living.", author: "Socrates", mood: "wisdom" },
  { text: "Turn your wounds into wisdom.", author: "Oprah Winfrey", mood: "wisdom" },
  { text: "Knowing yourself is the beginning of all wisdom.", author: "Aristotle", mood: "wisdom" },
  { text: "The journey of a thousand miles begins with a single step.", author: "Lao Tzu", mood: "wisdom" },
  { text: "Quality is not an act, it is a habit.", author: "Aristotle", mood: "wisdom" },
  { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill", mood: "success" },
  { text: "The best way to predict the future is to create it.", author: "Peter Drucker", mood: "success" },
  { text: "Strive not to be a success, but rather to be of value.", author: "Albert Einstein", mood: "success" },
  { text: "You miss 100% of the shots you don't take.", author: "Wayne Gretzky", mood: "success" },
  { text: "Dream big and dare to fail.", author: "Norman Vaughan", mood: "success" },
  { text: "The way to get started is to quit talking and begin doing.", author: "Walt Disney", mood: "success" },
  { text: "I'm not lazy, I'm on energy-saving mode.", author: "Anonymous", mood: "funny" },
  { text: "I'm on a seafood diet. I see food and I eat it.", author: "Dolly Parton", mood: "funny" },
  { text: "Common sense is like deodorant. The people who need it most never use it.", author: "Anonymous", mood: "funny" },
  { text: "If at first you don't succeed, then skydiving definitely isn't for you.", author: "Steven Wright", mood: "funny" },
  { text: "I am so clever that sometimes I don't understand a single word of what I am saying.", author: "Oscar Wilde", mood: "funny" },
  { text: "Life is short. Smile while you still have teeth.", author: "Anonymous", mood: "funny" },
  { text: "Within you, there is a stillness and a sanctuary to which you can retreat at any time.", author: "Hermann Hesse", mood: "calm" },
  { text: "Peace comes from within. Do not seek it without.", author: "Buddha", mood: "calm" },
  { text: "Quiet the mind, and the soul will speak.", author: "Ma Jaya Sati Bhagavati", mood: "calm" },
  { text: "Nothing can bring you peace but yourself.", author: "Ralph Waldo Emerson", mood: "calm" },
  { text: "Smile, breathe, and go slowly.", author: "Thich Nhat Hanh", mood: "calm" },
  { text: "In the midst of movement and chaos, keep stillness inside of you.", author: "Deepak Chopra", mood: "calm" },
];

app.get("/api/quote", (req, res) => {
  const { mood } = req.query;
  const pool = mood && mood !== "all" ? QUOTES.filter((q) => q.mood === mood) : QUOTES;
  if (!pool.length) return res.status(404).json({ error: "No quotes for this mood" });
  res.json(pool[Math.floor(Math.random() * pool.length)]);
});

app.get("/api/quotes", (_req, res) => res.json(QUOTES));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Quotely API listening on http://localhost:${PORT}`));
