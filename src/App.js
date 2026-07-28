import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
} from "react";
import "./App.css";

/* ==========================================================
   DATA — edit freely, this is the only place you need to touch
   ========================================================== */

const HERO_MESSAGE = `I don't know if words can ever explain how much you mean to me...
But today I want to try.
You came into my life as a college friend, became my biggest support,
my strongest motivation, and the person who makes every ordinary day beautiful.
Thank you for believing in me, guiding me, and standing beside me through
every dream and every struggle. Happy Birthday to my favourite person ❤️`;

const SCRAPBOOK_PAGES = [
  { left: "/assets/photos/1.jpg", right: "/assets/photos/2.jpg", note: "The day everything started ❤️" },
  { left: "/assets/photos/3.jpg", right: "/assets/photos/4.jpg", note: "College became beautiful because of you 🌸" },
  { left: "/assets/photos/5.jpg", right: "/assets/photos/6.jpg", note: "Every smile became my favourite memory ❤️" },
  { left: "/assets/photos/7.jpg", right: "/assets/photos/8.jpg", note: "You're my happiest place 🐼" },
  { left: "/assets/photos/9.jpg", right: "/assets/photos/10.jpg", note: "Every adventure with you is magical ✨" },
  { left: "/assets/photos/11.jpg", right: "/assets/photos/12.jpg", note: "Forever looks beautiful with you ❤️" },
  { left: "/assets/photos/13.jpg", right: "/assets/photos/14.jpg", note: "Every little moment with you means the world to me 💖" },
  { left: "/assets/photos/15.jpg", right: "/assets/photos/16.jpg", note: "Our laughter is my favourite melody 🎶" },
  { left: "/assets/photos/17.jpg", right: "/assets/photos/18.jpg", note: "Every picture tells a story of us 🌹" },
  { left: "/assets/photos/19.jpg", right: "/assets/photos/20.jpg", note: "You make ordinary days extraordinary ☀️" },
  { left: "/assets/photos/21.jpg", right: "/assets/photos/22.jpg", note: "Holding your hand feels like home 🤍" },
  { left: "/assets/photos/23.jpg", right: "/assets/photos/24.jpg", note: "Here's to countless more adventures together 🌍" },
  { left: "/assets/photos/25.jpg", right: "/assets/photos/26.jpg", note: "Every memory with you is my favourite memory 🥰" },
  { left: "/assets/photos/27.jpg", right: "/assets/photos/28.jpg", note: "No matter where we go, it's always special with you 🌈" },
  { left: "/assets/photos/29.jpg", right: "/assets/photos/30.jpg", note: "And this is only the beginning of our forever... ❤️♾️" },
];

const LOVE_TIMELINE = [
  { year: "2019", title: "The Beginning 🎓", text: "The year when two strangers met in college and unknowingly started a beautiful story." },
  { year: "2020", title: "College Memories ❤️", text: "Late night conversations, endless laughs, silly fights and memories that became priceless." },
  { year: "2021", title: "Finding My Favourite Person 💕", text: "Somewhere between friendship and love, you became the person I couldn't imagine my life without." },
  { year: "2022", title: "Our Forever Started ❤️", text: "The day my life changed forever. I found my best friend, my partner and my home." },
  { year: "2023", title: "Growing Together 🌸", text: "We learned, supported each other and became stronger together." },
  { year: "2024", title: "Dreams & Challenges 💪", text: "Every difficult moment became easier because I had you beside me." },
  { year: "2025", title: "Same Company, Same Journey 💼", text: "From college partners to working together. Watching you grow has been my biggest happiness." },
  { year: "2026", title: "Your Special Birthday 🎂", text: "Today I celebrate the most beautiful chapter of my life — YOU ❤️" },
];

const RELATIONSHIP_START = new Date("2022-09-15");
const TOTAL_CANDLES = 5;

const FINAL_LETTER = `If I get one chance to choose my person again... I will choose you.
In every lifetime. Thank you for being my happiness, my strength, and my home.
I love you ❤️`;

/* ==========================================================
   SMALL REUSABLE HOOKS
   ========================================================== */

// Reveals an element with a class once it scrolls into view
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, visible];
}

/* ==========================================================
   BACKGROUND — floating hearts / sparkles ambience
   ========================================================== */

function FloatingBackground() {
  const emojis = ["❤️", "✨", "🌸"];
  const items = useMemo(
    () =>
      Array.from({ length: 16 }, (_, i) => ({
        id: i,
        emoji: emojis[i % emojis.length],
        left: Math.round(Math.random() * 100),
        delay: (Math.random() * 9).toFixed(2),
        duration: (8 + Math.random() * 6).toFixed(2),
        size: 16 + Math.round(Math.random() * 14),
      })),
    [] // eslint-disable-line react-hooks/exhaustive-deps
  );

  return (
    <div id="background" aria-hidden="true">
      <div className="gradient-layer" />
      {items.map((h) => (
        <span
          key={h.id}
          className="floating-heart"
          style={{
            left: `${h.left}%`,
            animationDelay: `${h.delay}s`,
            animationDuration: `${h.duration}s`,
            fontSize: `${h.size}px`,
          }}
        >
          {h.emoji}
        </span>
      ))}
    </div>
  );
}

/* ==========================================================
   INTRO — envelope opener
   ========================================================== */

function IntroSection({ onOpen }) {
  return (
    <section id="intro-section" className="section intro-section">
      <div className="envelope-container">
        <div className="envelope">💌</div>
        <h1 className="intro-title">A Surprise For Ishii ❤️</h1>
        <button className="open-button" onClick={onOpen}>
          Click To Open Your Surprise ✨
        </button>
      </div>
    </section>
  );
}

/* ==========================================================
   HERO
   ========================================================== */

function HeroSection() {
  const [ref, visible] = useReveal();
  return (
    <section className="section hero-section" ref={ref}>
      <div className={`floating-elements ${visible ? "float" : ""}`}>
        ❤️ 🐼 🐱 🥟 🍝 ✨ 🌸
      </div>
      <h1 className={`hero-title ${visible ? "appear" : "pre-appear"}`}>
        Happy Birthday
        <span>ISHII ❤️</span>
      </h1>
      <p className={`hero-message ${visible ? "appear" : "pre-appear"}`}>
        {HERO_MESSAGE.split("\n").map((line, i) => (
          <React.Fragment key={i}>
            {line}
            <br />
          </React.Fragment>
        ))}
      </p>
    </section>
  );
}

/* ==========================================================
   VIDEO
   ========================================================== */

function VideoSection() {
  const [ref, visible] = useReveal();
  return (
    <section className="section video-section" ref={ref}>
      <h2 className={visible ? "appear" : "pre-appear"}>
        A Song Made Only For You 🎵
      </h2>

      <div className={`video-container ${visible ? "appear" : "pre-appear"}`}>
        <video
          src="/assets/video/ishii-song.mp4"
          controls
          playsInline
          preload="metadata"
          style={{ height: "100vh", width: "100%", borderRadius: "12px" }}
        />
      </div>
    </section>
  );
}

/* ==========================================================
   SCRAPBOOK / GALLERY
   ========================================================== */

function GallerySection() {
  const [page, setPage] = useState(0);
  const [ref, visible] = useReveal();
  const lastIndex = SCRAPBOOK_PAGES.length - 1;

  const goNext = useCallback(
    () => setPage((p) => Math.min(p + 1, lastIndex)),
    [lastIndex]
  );
  const goPrev = useCallback(() => setPage((p) => Math.max(p - 1, 0)), []);

  const current = SCRAPBOOK_PAGES[page];

  return (
    <section className="section gallery-section" id="scrapbook-section" ref={ref}>
      <h1 className={`gallery-title ${visible ? "appear" : "pre-appear"}`}>
        Our Beautiful Memories 📖❤️
      </h1>

      <div className="scrapbook" role="group" aria-label="Photo scrapbook">
        <div className="page-front" key={page}>
          <div className="photo">
            <img src={current.left} alt="" onError={placeholderFallback} />
          </div>
          <div className="photo">
            <img src={current.right} alt="" onError={placeholderFallback} />
          </div>
          <p className="memory-note">{current.note}</p>
        </div>
      </div>

      <div className="book-controls">
        <button onClick={goPrev} disabled={page === 0}>
          ← Previous
        </button>
        <span className="page-indicator">
          {page + 1} / {SCRAPBOOK_PAGES.length}
        </span>
        <button onClick={goNext} disabled={page === lastIndex}>
          Next →
        </button>
      </div>
    </section>
  );
}

function placeholderFallback(e) {
  e.currentTarget.style.display = "none";
  e.currentTarget.parentElement.classList.add("photo--placeholder");
}

/* ==========================================================
   TIMELINE
   ========================================================== */

function TimelineCard({ item }) {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} className={`timeline-card ${visible ? "show" : ""}`}>
      <div className="timeline-dot">❤️</div>
      <div className="timeline-content">
        <div className="timeline-info">
          <span className="timeline-year">{item.year}</span>
          <h2>{item.title}</h2>
          <p className="timeline-text">{item.text}</p>
        </div>
      </div>
    </div>
  );
}

function TimelineSection() {
  const [days, setDays] = useState(0);

  useEffect(() => {
    const update = () => {
      const diff = new Date() - RELATIONSHIP_START;
      setDays(Math.floor(diff / (1000 * 60 * 60 * 24)));
    };
    update();
    const id = setInterval(update, 86400000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="section timeline-section">
      <h1>Our Story ❤️</h1>
      <div id="love-days">{days} days of choosing each other ❤️</div>

      <div id="timeline-container">
        {LOVE_TIMELINE.map((item) => (
          <TimelineCard key={item.year} item={item} />
        ))}
        <div className="timeline-ending">
          <h1>And this is just the beginning ❤️</h1>
          <p>The next chapters will be written together...</p>
        </div>
      </div>
    </section>
  );
}

/* ==========================================================
   CAKE
   ========================================================== */

function Sparkle({ style }) {
  return <span className="cake-sparkle" style={style} aria-hidden="true" />;
}

function CakeSection({ onWishMade }) {
  const [blown, setBlown] = useState(() => Array(TOTAL_CANDLES).fill(false));
  const [sparkles, setSparkles] = useState([]);
  const [wishOpen, setWishOpen] = useState(false);
  const [wishStage, setWishStage] = useState("ask"); // ask | accepted
  const [ref, visible] = useReveal();

  const blownCount = blown.filter(Boolean).length;
  const allBlown = blownCount === TOTAL_CANDLES;

  useEffect(() => {
    if (allBlown) {
      const t = setTimeout(() => setWishOpen(true), 900);
      return () => clearTimeout(t);
    }
  }, [allBlown]);

  const blowCandle = (index) => {
    if (blown[index]) return;
    setBlown((prev) => {
      const next = [...prev];
      next[index] = true;
      return next;
    });

    const id = Date.now();
    const newSparkles = Array.from({ length: 6 }, (_, i) => ({
      id: `${id}-${i}`,
      left: `${40 + Math.random() * 20}%`,
      top: `${Math.random() * 20}%`,
    }));
    setSparkles((s) => [...s, ...newSparkles]);
    setTimeout(() => {
      setSparkles((s) => s.filter((sp) => !newSparkles.find((n) => n.id === sp.id)));
    }, 1200);
  };

  const completeWish = () => {
    setWishStage("accepted");
    onWishMade && onWishMade();
    setTimeout(() => setWishOpen(false), 4500);
  };

  return (
    <section className="section cake-section" id="cake-section" ref={ref}>
      <h1 className={visible ? "appear" : "pre-appear"}>Make A Wish Ishii 🎂</h1>

      <div className="cake-wrapper">
        <div className="cake-top">
          <div className="cream" />
        </div>
        <div className="cake-body">
          <div className="cake-decoration">❤️ ❤️ ❤️</div>
        </div>
        <div className="candles">
          {blown.map((isBlown, i) => (
            <div
              key={i}
              className={`candle ${isBlown ? "blown" : ""}`}
              onClick={() => blowCandle(i)}
            >
              {!isBlown && <div className="flame">🔥</div>}
              <div className="stick" />
            </div>
          ))}
        </div>
        {sparkles.map((s) => (
          <Sparkle key={s.id} style={{ left: s.left, top: s.top }} />
        ))}
      </div>

      <p className="cake-message">
        {allBlown
          ? "All candles lit your wish into the sky ✨"
          : `Click each candle and make a wish (${blownCount}/${TOTAL_CANDLES}) ✨`}
      </p>

      {wishOpen && (
        <div className="wish-screen">
          {wishStage === "ask" ? (
            <div>
              <h1>✨ Make A Wish Ishii ✨</h1>
              <p>Close your eyes... your wish is travelling to the stars ❤️</p>
              <button onClick={completeWish}>I Made My Wish 💖</button>
            </div>
          ) : (
            <div>
              <h1>Your wish has been accepted 💫</h1>
              <p>But I already got my biggest wish... You ❤️</p>
            </div>
          )}
        </div>
      )}
    </section>
  );
}

/* ==========================================================
   FINAL LETTER
   ========================================================== */

function LetterSection() {
  const [open, setOpen] = useState(false);
  const [ref, visible] = useReveal();

  return (
    <section className="section letter-section" id="letter-section" ref={ref}>
      {!open ? (
        <div className={`closed-envelope ${visible ? "appear" : "pre-appear"}`}>
          <div className="envelope-emoji">💌</div>
          <h1>A Final Letter For You</h1>
          <button onClick={() => setOpen(true)}>Open My Heart ❤️</button>
        </div>
      ) : (
        <div className="letter-container appear">
          <h1>My Ishii ❤️</h1>
          <p>
            {FINAL_LETTER.split("\n").map((line, i) => (
              <React.Fragment key={i}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </p>
        </div>
      )}
    </section>
  );
}

/* ==========================================================
   MUSIC CONTROLLER — floating toggle + volume
   ========================================================== */

function MusicController({ activeTrack }) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(35);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!started) return;
    const audio = audioRef.current;
    if (!audio) return;
    audio.src = `/assets/music/${activeTrack}.mp3`;
    audio.loop = activeTrack !== "birthday";
    audio.volume = volume / 100;
    audio.play().then(() => setPlaying(true)).catch(() => { });
  }, [activeTrack, started]); // eslint-disable-line react-hooks/exhaustive-deps

  const toggle = () => {
    const audio = audioRef.current;
    if (!started) {
      setStarted(true);
      return;
    }
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().then(() => setPlaying(true)).catch(() => { });
    }
  };

  const changeVolume = (e) => {
    const v = Number(e.target.value);
    setVolume(v);
    if (audioRef.current) audioRef.current.volume = v / 100;
  };

  return (
    <>
      <audio ref={audioRef} />
      <button id="musicToggle" onClick={toggle} aria-label="Toggle music">
        {playing ? "🎵" : "🔇"}
      </button>
      <input
        id="volumeControl"
        type="range"
        min="0"
        max="100"
        value={volume}
        onChange={changeVolume}
        aria-label="Music volume"
      />
    </>
  );
}

/* ==========================================================
   ROOT APP
   ========================================================== */

export default function App() {
  const [opened, setOpened] = useState(false);
  const [track, setTrack] = useState("background");

  const handleOpen = () => {
    setOpened(true);
    setTrack("background");
  };

  return (
    <div className="app">
      <FloatingBackground />

      {!opened && <IntroSection onOpen={handleOpen} />}

      {opened && (
        <>
          <HeroSection />
          <VideoSection />
          <GallerySection />
          <TimelineSection />
          <CakeSection onWishMade={() => setTrack("birthday")} />
          <LetterSection />
          <MusicController activeTrack={track} />

          <footer>
            <div className="footer-content">
              <h2>Happy Birthday, Ishii</h2>
              <h3>Forever & Always ❤️</h3>
              <p>Made with love, just for you.</p>
            </div>
          </footer>
        </>
      )}
    </div>
  );
}