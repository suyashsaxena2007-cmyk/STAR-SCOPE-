
import { useNavigate } from "react-router-dom";

type MissionCard = {
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  color: string;
  targets: string[];
  tag: string;
};

const missions: MissionCard[] = [
  {
    title: "ISS Tracker",
    subtitle: "LOW EARTH ORBIT",
    description:
      "Explore the International Space Station's position and orbital information.",
    icon: "🛰️",
    color: "#58a6ff",
    targets: ["iss-tracker", "iss", "issTracker"],
    tag: "ORBITAL TRACKING",
  },
  {
    title: "Launch Center",
    subtitle: "UPCOMING MISSIONS",
    description:
      "Check upcoming rocket launches and explore mission details.",
    icon: "🚀",
    color: "#b49aff",
    targets: ["launches", "launch-center", "upcoming-launches"],
    tag: "LAUNCH EXPLORER",
  },
  {
    title: "Asteroid Radar",
    subtitle: "NEAR-EARTH OBJECTS",
    description:
      "Explore near-Earth asteroids and their available orbital data.",
    icon: "☄️",
    color: "#ffbd69",
    targets: [
      "near-earth-asteroids",
      "asteroids",
      "asteroid-radar",
      "neo-radar",
    ],
    tag: "OBJECT MONITORING",
  },
  {
    title: "Solar System",
    subtitle: "PLANETARY EXPLORATION",
    description:
      "Explore the Sun and planets in your interactive Solar System.",
    icon: "🪐",
    color: "#6ee7c8",
    targets: ["solar-explorer", "solar", "interactive-solar-system"],
    tag: "PLANET EXPLORER",
  },
  {
    title: "Mars Rover Gallery",
    subtitle: "SURFACE EXPLORATION",
    description:
      "Explore Mars rover imagery and discover the Red Planet's terrain.",
    icon: "🔴",
    color: "#ff8e79",
    targets: ["mars-rover-gallery", "mars-gallery", "mars-rover"],
    tag: "MARS EXPLORATION",
  },
  {
    title: "Space Dictionary",
    subtitle: "LEARN SPACE SCIENCE",
    description:
      "Look up astronomy terms and learn the language of space exploration.",
    icon: "📚",
    color: "#f4d779",
    targets: ["dictionary", "space-dictionary"],
    tag: "KNOWLEDGE BASE",
  },
  {
    title: "Space Quiz Arena",
    subtitle: "TEST YOUR SPACE KNOWLEDGE",
    description:
      "Challenge yourself with space science questions and test how much of the universe you know.",
    icon: "🧠",
    color: "#ff7edb",
    targets: ["space-quiz", "quiz", "space-quiz-arena"],
    tag: "COSMIC CHALLENGE",
  },
  {
    title: "Astronomy Explorer",
    subtitle: "EXPLORE THE COSMOS",
    description:
      "Discover planets, stars, galaxies, nebulae, and black holes through an interactive astronomy explorer.",
    icon: "🔭",
    color: "#7dd3fc",
    targets: [
      "astronomy-explorer",
      "astronomy",
      "cosmos-explorer",
    ],
    tag: "DEEP SPACE EXPLORATION",
  },
];

export default function MissionControlCenter() {
  const navigate = useNavigate();

  const missionRoutes: Record<string, string> = {
    "ISS Tracker": "/iss-tracker",
    "Launch Center": "/launches",
    "Asteroid Radar": "/asteroids",
    "Solar System": "/solar-system",
    "Mars Rover Gallery": "/mars-rover",
    "Space Dictionary": "/dictionary",
    "Space Quiz Arena": "/space-quiz",
    "Astronomy Explorer": "/astronomy-explorer",
  };

  function openMission(title: string) {
    const route = missionRoutes[title];

    if (route) {
      navigate(route);
    }
  }

  return (
    <section
      id="mission-control-center"
      style={{
        position: "relative",
        overflow: "hidden",
        padding: "76px 20px",
        color: "#f4f6ff",
        background:
          "radial-gradient(ellipse at 50% 0%, #1d3260 0%, #0a1126 48%, #050711 100%)",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          width: 300,
          height: 300,
          borderRadius: "50%",
          border: "1px solid #30466c55",
          top: -180,
          right: "-70px",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: 1150,
          margin: "0 auto",
          position: "relative",
        }}
      >
        <header style={{ textAlign: "center", marginBottom: 38 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 9,
              border: "1px solid #31476d",
              background: "#111d36",
              padding: "8px 13px",
              borderRadius: 30,
              color: "#b8d0ff",
              fontSize: 11,
              letterSpacing: 2,
              fontWeight: 700,
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "#63e6be",
                display: "inline-block",
              }}
            />
            STAR SCOPE COMMAND HUB
          </div>

          <h2
            style={{
              fontSize: "clamp(32px, 5vw, 52px)",
              lineHeight: 1.15,
              margin: "20px 0 14px",
              letterSpacing: -1,
            }}
          >
            Mission Control Center
          </h2>

          <p
            style={{
              maxWidth: 650,
              margin: "0 auto",
              color: "#b5c3e0",
              fontSize: 15,
              lineHeight: 1.8,
            }}
          >
            Your gateway to orbital tracking, rocket launches, asteroid
            monitoring, planetary exploration, astronomy, and cosmic
            challenges.
          </p>
        </header>

        {/* Mission overview stats */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(145px, 1fr))",
            gap: 12,
            marginBottom: 34,
          }}
        >
          {[
            { value: "01", label: "ORBITAL TRACKING", icon: "🛰️" },
            { value: "02", label: "LAUNCH EXPLORATION", icon: "🚀" },
            { value: "03", label: "ASTEROID RADAR", icon: "☄️" },
            { value: "04", label: "PLANETARY SYSTEM", icon: "🪐" },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{
                padding: "17px 15px",
                border: "1px solid #283957",
                borderRadius: 14,
                background: "#101a30cc",
              }}
            >
              <div style={{ fontSize: 22 }}>{stat.icon}</div>
              <div
                style={{
                  fontSize: 22,
                  fontWeight: 800,
                  marginTop: 10,
                  color: "#f3f6ff",
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontSize: 10,
                  letterSpacing: 1.1,
                  color: "#91a6cb",
                  marginTop: 5,
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Mission cards heading */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "end",
            flexWrap: "wrap",
            gap: 12,
            marginBottom: 18,
          }}
        >
          <div>
            <p
              style={{
                color: "#91b6ff",
                fontSize: 11,
                letterSpacing: 2,
                margin: "0 0 7px",
              }}
            >
              FLIGHT SYSTEMS
            </p>
            <h3 style={{ fontSize: 23, margin: 0 }}>
              Explore your modules
            </h3>
          </div>

          <span style={{ color: "#92a3c5", fontSize: 12 }}>
            {missions.length} modules · Choose your next mission
          </span>
        </div>

        {/* Mission cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 17,
          }}
        >
          {missions.map((mission) => (
            <article
              key={mission.title}
              style={{
                display: "flex",
                flexDirection: "column",
                padding: 22,
                borderRadius: 17,
                border: "1px solid #2b3c5c",
                background:
                  "linear-gradient(145deg, #14213b, #0c1427 80%)",
                minHeight: 255,
                transition: "border-color 0.2s, transform 0.2s",
              }}
              onMouseEnter={(event) => {
                event.currentTarget.style.borderColor = mission.color;
                event.currentTarget.style.transform = "translateY(-3px)";
              }}
              onMouseLeave={(event) => {
                event.currentTarget.style.borderColor = "#2b3c5c";
                event.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 12,
                }}
              >
                <div
                  style={{
                    display: "grid",
                    placeItems: "center",
                    width: 52,
                    height: 52,
                    borderRadius: 15,
                    background: `${mission.color}18`,
                    border: `1px solid ${mission.color}55`,
                    fontSize: 26,
                  }}
                >
                  {mission.icon}
                </div>

                <span
                  style={{
                    color: mission.color,
                    fontSize: 10,
                    letterSpacing: 1,
                    textAlign: "right",
                  }}
                >
                  {mission.tag}
                </span>
              </div>

              <p
                style={{
                  color: mission.color,
                  fontSize: 10,
                  letterSpacing: 1.5,
                  margin: "21px 0 7px",
                }}
              >
                {mission.subtitle}
              </p>

              <h3 style={{ fontSize: 21, margin: "0 0 9px" }}>
                {mission.title}
              </h3>

              <p
                style={{
                  color: "#aebbd5",
                  fontSize: 13,
                  lineHeight: 1.75,
                  margin: "0 0 22px",
                  flex: 1,
                }}
              >
                {mission.description}
              </p>

              <button
                type="button"
                onClick={() => openMission(mission.title)}
                style={{
                  width: "100%",
                  padding: "12px 14px",
                  borderRadius: 10,
                  border: `1px solid ${mission.color}70`,
                  background: `${mission.color}14`,
                  color: "#f4f6ff",
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                Open Module <span aria-hidden="true">→</span>
              </button>
            </article>
          ))}
        </div>

        {/* Information note */}
        <div
          style={{
            marginTop: 30,
            padding: "18px 20px",
            borderRadius: 13,
            border: "1px solid #293958",
            background: "#0c1529",
            display: "flex",
            alignItems: "flex-start",
            gap: 12,
          }}
        >
          <span style={{ fontSize: 21 }}>ℹ️</span>
          <p
            style={{
              color: "#aebbd5",
              fontSize: 12,
              lineHeight: 1.8,
              margin: 0,
            }}
          >
            This is your navigation hub. Live values and mission statuses
            are shown inside their respective modules; this dashboard does
            not invent real-time telemetry.
          </p>
        </div>

        <p
          style={{
            textAlign: "center",
            color: "#7183a8",
            fontSize: 11,
            letterSpacing: 2,
            marginTop: 32,
          }}
        >
          STAR SCOPE • EXPLORE BEYOND THE ORDINARY
        </p>
      </div>
    </section>
  );
}
