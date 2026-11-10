
import { useState, type ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
  Menu,
  X,
  ArrowUpRight,
  Orbit,
  Radio,
} from "lucide-react";

import "./index.css";

import IssTracker from "./components/sections/IssTracker";
import Launches from "./components/sections/Launches";
import MarsRoverGallery from "./components/MarsRoverGallery";
import NearEarthAsteroidsRadar from "./components/NearEarthAsteroidsRadar";
import Dictionary from "./components/sections/Dictionary";
import Apod from "./components/sections/Apod";
import InteractiveSolarSystem from "./components/sections/InteractiveSolarSystem";
import ExoplanetExplorer from "./components/sections/ExoplanetExplorer";
import SpaceQuizArena from "./components/sections/SpaceQuizArena";
import MissionControlCenter from "./components/sections/MissionControlCenter";
import BusinessModel from "./components/sections/BusinessModel";
import SpaceAI from "./components/sections/SpaceAI";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  // Dedicated module routes
  const modulePages: Record<
    string,
    { title: string; component: ReactNode }
  > = {
    "/iss-tracker": {
      title: "ISS Tracker",
      component: <IssTracker />,
    },
    "/launches": {
      title: "Launch Center",
      component: <Launches />,
    },
    "/asteroids": {
      title: "Asteroid Radar",
      component: <NearEarthAsteroidsRadar />,
    },
    "/solar-system": {
      title: "Explore Our Solar System",
      component: <InteractiveSolarSystem />,
    },
    "/mars-rover": {
      title: "Mars Rover Gallery",
      component: <MarsRoverGallery />,
    },
    "/dictionary": {
      title: "Space Dictionary",
      component: <Dictionary />,
    },
    "/space-quiz": {
      title: "Space Quiz Arena",
      component: <SpaceQuizArena />,
    },
    "/astronomy-explorer": {
      title: "Astronomy Explorer",
      component: <ExoplanetExplorer />,
    },
  };

  const currentModule = modulePages[location.pathname];

  // Dedicated module page layout
  if (currentModule) {
    return (
      <div
        className="app-shell"
        style={{
          minHeight: "100vh",
          background: "#050711",
          color: "#f4f6ff",
        }}
      >
        <header className="navbar">
          <a
            className="brand"
            href="/"
            aria-label="Star Scope home"
            onClick={(event) => {
              event.preventDefault();
              navigate("/");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <span className="brand-icon">
              <Orbit size={24} />
            </span>

            <span>
              STAR<span className="brand-light">SCOPE</span>
              <small>EXPLORE BEYOND</small>
            </span>
          </a>

          <button
            className="button-secondary"
            onClick={() => navigate("/")}
          >
            ← Back to Home
          </button>
        </header>

        <main>
          <div style={{ padding: "24px 20px 8px" }}>
            <h1>{currentModule.title}</h1>
          </div>

          {currentModule.component}
        </main>

        <footer className="footer">
          <a
            className="brand"
            href="/"
            onClick={(event) => {
              event.preventDefault();
              navigate("/");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <span className="brand-icon">
              <Orbit size={22} />
            </span>

            <span>
              STAR<span className="brand-light">SCOPE</span>
              <small>EXPLORE BEYOND</small>
            </span>
          </a>

          <p>Made for the endlessly curious. © 2026 Star Scope</p>

          <button onClick={() => navigate("/")}>
            Back to Home ↑
          </button>
        </footer>
      </div>
    );
  }

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });

    setMenuOpen(false);
  };

  return (
    <div className="app-shell">
      <header className="navbar">
        <a
          className="brand"
          href="/"
          aria-label="Star Scope home"
          onClick={(event) => {
            event.preventDefault();
            navigate("/");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <span className="brand-icon">
            <Orbit size={24} />
          </span>

          <span>
            STAR<span className="brand-light">SCOPE</span>
            <small>EXPLORE BEYOND</small>
          </span>
        </a>

        <button
          className="mobile-menu"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          {menuOpen ? <X /> : <Menu />}
        </button>

        <nav
          className={menuOpen ? "nav-links nav-open" : "nav-links"}
        >
          <button
            onClick={() => {
              setMenuOpen(false);
              navigate("/solar-system");
            }}
          >
            Solar System
          </button>

          <button onClick={() => scrollTo("missions")}>
            Missions
          </button>

          <button
            onClick={() => {
              setMenuOpen(false);
              navigate("/dictionary");
            }}
          >
            Space Dictionary
          </button>

          <button
            className="nav-cta"
            onClick={() => scrollTo("missions")}
          >
            Explore Space <ArrowUpRight size={16} />
          </button>
        </nav>
      </header>

      <main>
        {/* HERO */}
        <section className="hero" id="home">
          <div className="hero-stars" />

          <div className="hero-copy">
            <div className="eyebrow">
              <span className="live-dot" /> YOUR GATEWAY TO THE COSMOS
            </div>

            <h1>
              The universe has data.
              <br />
              <span>We make it speak.</span>
            </h1>

            <p className="hero-description">
              Explore our solar system, discover upcoming space missions,
              and turn the mysteries of the cosmos into knowledge.
            </p>

            <div className="hero-actions">
              <button
                className="button-primary"
                onClick={() => navigate("/solar-system")}
              >
                Explore the Universe <ArrowUpRight size={17} />
              </button>

              <button
                className="button-secondary"
                onClick={() => scrollTo("missions")}
              >
                Discover Missions
              </button>
            </div>

            <div className="hero-note">
              <Radio size={14} /> A new perspective on our universe.
            </div>
          </div>

          <div className="hero-bottom">
            <div>
              <span className="stat-label">OUR COSMIC ADDRESS</span>
              <strong>Milky Way Galaxy</strong>
            </div>

            <div>
              <span className="stat-label">KNOWN PLANETS</span>
              <strong>
                08 <span className="stat-muted">/ SOLAR SYSTEM</span>
              </strong>
            </div>

            <div>
              <span className="stat-label">CURIOSITY LEVEL</span>
              <strong>
                Infinite <span className="stat-star">✳</span>
              </strong>
            </div>
          </div>
        </section>

        {/* 1. MISSION CONTROL CENTER */}
        <div id="missions">
          <MissionControlCenter />
        </div>

        {/* 2. SPACE AI */}
        <SpaceAI />

        {/* 3. PICTURE OF THE DAY */}
        <div id="picture-of-the-day">
          <Apod />
        </div>

        {/* 4. BUSINESS MODEL */}
        <BusinessModel />

        {/* CLOSING SECTION */}
        <section className="closing-cta">
          <div className="eyebrow">THE COSMOS IS CALLING</div>

          <h2>
            Stay curious.
            <br />
            <span>Look up.</span>
          </h2>

          <p>The next discovery could start with you.</p>

          <button
            className="button-primary"
            onClick={() => scrollTo("missions")}
          >
            Continue exploring <ArrowUpRight size={17} />
          </button>
        </section>
      </main>

      <footer className="footer">
        <a
          className="brand"
          href="/"
          onClick={(event) => {
            event.preventDefault();
            navigate("/");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <span className="brand-icon">
            <Orbit size={22} />
          </span>

          <span>
            STAR<span className="brand-light">SCOPE</span>
            <small>EXPLORE BEYOND</small>
          </span>
        </a>

        <p>
          Made for the endlessly curious. <span>© 2026 Star Scope</span>
        </p>

        <button onClick={() => scrollTo("home")}>
          Back to top ↑
        </button>
      </footer>
    </div>
  );
}

export default App;
