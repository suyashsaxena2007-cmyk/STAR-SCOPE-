
import { useState } from "react";

type Planet = {
  name: string;
  color: string;
  distance: string;
  diameter: string;
  gravity: string;
  moons: string;
  day: string;
  year: string;
  fact: string;
};

const planets: Planet[] = [
  {
    name: "Mercury",
    color: "#a9a9a9",
    distance: "57.9 million km",
    diameter: "4,879 km",
    gravity: "3.7 m/s²",
    moons: "0",
    day: "58.6 Earth days",
    year: "88 Earth days",
    fact: "Mercury is the closest planet to the Sun and has extreme temperature changes.",
  },
  {
    name: "Venus",
    color: "#e6b566",
    distance: "108.2 million km",
    diameter: "12,104 km",
    gravity: "8.87 m/s²",
    moons: "0",
    day: "243 Earth days",
    year: "225 Earth days",
    fact: "Venus is the hottest planet because of its thick, heat-trapping atmosphere.",
  },
  {
    name: "Earth",
    color: "#35a7ff",
    distance: "149.6 million km",
    diameter: "12,742 km",
    gravity: "9.81 m/s²",
    moons: "1",
    day: "24 hours",
    year: "365.25 days",
    fact: "Earth is the only world currently known to support life.",
  },
  {
    name: "Mars",
    color: "#f06b4f",
    distance: "227.9 million km",
    diameter: "6,779 km",
    gravity: "3.71 m/s²",
    moons: "2",
    day: "24.6 hours",
    year: "687 Earth days",
    fact: "Mars has the giant volcano Olympus Mons and evidence of ancient liquid water.",
  },
  {
    name: "Jupiter",
    color: "#d6a477",
    distance: "778.6 million km",
    diameter: "139,820 km",
    gravity: "24.79 m/s²",
    moons: "101 (known)",
    day: "9.9 hours",
    year: "11.86 Earth years",
    fact: "Jupiter is the largest planet and its Great Red Spot is a giant storm.",
  },
  {
    name: "Saturn",
    color: "#e8d29a",
    distance: "1.43 billion km",
    diameter: "116,460 km",
    gravity: "10.44 m/s²",
    moons: "285 (known)",
    day: "10.7 hours",
    year: "29.4 Earth years",
    fact: "Saturn's spectacular rings are made mainly of ice and rocky material.",
  },
  {
    name: "Uranus",
    color: "#83dce0",
    distance: "2.87 billion km",
    diameter: "50,724 km",
    gravity: "8.69 m/s²",
    moons: "29 (known)",
    day: "17.2 hours",
    year: "84 Earth years",
    fact: "Uranus rotates on its side, giving it unusually extreme seasons.",
  },
  {
    name: "Neptune",
    color: "#4775ff",
    distance: "4.50 billion km",
    diameter: "49,244 km",
    gravity: "11.15 m/s²",
    moons: "16 (known)",
    day: "16.1 hours",
    year: "165 Earth years",
    fact: "Neptune is a distant ice giant with extremely fast winds.",
  },
];

export default function InteractiveSolarSystem() {
  const [selected, setSelected] = useState<Planet>(planets[2]);

  return (
    <section
      id="solar"
      style={{
        background: "#070913",
        color: "#f4f7ff",
        padding: "40px 24px",
        border: "1px solid #263452",
        borderRadius: "20px",
        margin: "28px 0",
        overflow: "hidden",
      }}
    >
      <p
        style={{
          color: "#00E5FF",
          letterSpacing: "3px",
          fontSize: "12px",
        }}
      >
        EXPLORE THE COSMOS
      </p>

      <h2 style={{ fontSize: "clamp(28px, 4vw, 40px)", margin: "12px 0" }}>
        Interactive Solar System
      </h2>

      <p style={{ color: "#aab7d0", lineHeight: 1.7 }}>
        Select a planet to explore its characteristics. Planet sizes and
        spacing in this illustration are not to scale.
      </p>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          gap: "18px",
          padding: "32px 8px",
          margin: "20px 0",
          borderRadius: "16px",
          background:
            "radial-gradient(ellipse at center, #17213d 0%, #0b1020 55%, #070913 100%)",
        }}
      >
        <button
          onClick={() => {
            setSelected({
              name: "Sun",
              color: "#ffb703",
              distance: "0 km",
              diameter: "1,392,700 km",
              gravity: "274 m/s²",
              moons: "0",
              day: "About 25 Earth days at its equator",
              year: "Not applicable",
              fact: "The Sun is a star at the centre of our solar system. Its gravity keeps the planets in orbit.",
            });
          }}
          aria-label="Explore the Sun"
          style={{
            background: "#ffb703",
            color: "#251500",
            border: "3px solid #ffe7a0",
            borderRadius: "50%",
            width: "64px",
            height: "64px",
            fontWeight: 800,
            cursor: "pointer",
            boxShadow: "0 0 28px #ffb70388",
          }}
        >
          Sun
        </button>

        {planets.map((planet, index) => (
          <button
            key={planet.name}
            onClick={() => setSelected(planet)}
            aria-pressed={selected.name === planet.name}
            title={`Explore ${planet.name}`}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "8px",
              background: "transparent",
              color: "#f4f7ff",
              border:
                selected.name === planet.name
                  ? "1px solid #00E5FF"
                  : "1px solid transparent",
              borderRadius: "12px",
              padding: "10px 8px",
              cursor: "pointer",
              minWidth: "72px",
            }}
          >
            <span
              style={{
                display: "block",
                width: `${Math.max(14, 16 + index * 3)}px`,
                height: `${Math.max(14, 16 + index * 3)}px`,
                borderRadius: "50%",
                background: planet.color,
                boxShadow:
                  selected.name === planet.name
                    ? `0 0 18px ${planet.color}`
                    : "none",
                outline:
                  selected.name === planet.name
                    ? "2px solid #ffffff"
                    : "none",
                outlineOffset: "3px",
              }}
            />
            <span style={{ fontSize: "12px" }}>{planet.name}</span>
          </button>
        ))}
      </div>

      <div
        style={{
          border: `1px solid ${selected.color}77`,
          borderRadius: "16px",
          padding: "24px",
          background: "#0D1224",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <span
            style={{
              width: "38px",
              height: "38px",
              flexShrink: 0,
              borderRadius: "50%",
              background: selected.color,
              boxShadow: `0 0 20px ${selected.color}77`,
            }}
          />
          <div>
            <p style={{ color: "#00E5FF", fontSize: "11px", margin: 0 }}>
              SELECTED CELESTIAL BODY
            </p>
            <h3 style={{ fontSize: "28px", margin: "4px 0" }}>
              {selected.name}
            </h3>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 150px), 1fr))",
            gap: "12px",
            marginTop: "24px",
          }}
        >
          {[
            ["Distance from Sun", selected.distance],
            ["Diameter", selected.diameter],
            ["Gravity", selected.gravity],
            ["Known moons", selected.moons],
            ["Length of day", selected.day],
            ["Length of year", selected.year],
          ].map(([label, value]) => (
            <div
              key={label}
              style={{
                background: "#111d32",
                borderRadius: "10px",
                padding: "14px",
              }}
            >
              <p
                style={{
                  color: "#91a4c4",
                  fontSize: "12px",
                  margin: "0 0 8px",
                }}
              >
                {label}
              </p>
              <strong style={{ fontSize: "15px" }}>{value}</strong>
            </div>
          ))}
        </div>

        <p style={{ color: "#c2cde0", lineHeight: 1.8, marginTop: "20px" }}>
          <strong style={{ color: selected.color }}>Cosmic fact: </strong>
          {selected.fact}
        </p>
      </div>

      <p style={{ color: "#7f8da8", fontSize: "12px", marginTop: "18px" }}>
        Moon counts can change as new moons are confirmed. Values are
        approximate reference figures, not live measurements.
      </p>
    </section>
  );
}
