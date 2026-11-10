
import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, OrbitControls, Stars } from "@react-three/drei";
import type { Group } from "three";
import * as THREE from "three";
import { ArrowLeft, Orbit, Pause, Play, X } from "lucide-react";

type Planet = {
  name: string;
  color: string;
  radius: number;
  size: number;
  speed: number;
  inclination: number;
  ring?: boolean;
  diameter: string;
  gravity: string;
  moons: string;
  day: string;
  year: string;
  fact: string;
};

type KnowledgeTab =
  | "Overview"
  | "Atmosphere & Weather"
  | "Surface & Structure"
  | "Space Exploration"
  | "Amazing Discoveries";

type PlanetKnowledge = {
  overview: string;
  atmosphere: string;
  surface: string;
  exploration: string;
  discoveries: string;
};

const planets: Planet[] = [
  {
    name: "Mercury",
    color: "#aaa9a5",
    radius: 2.5,
    size: 0.17,
    speed: 0.8,
    inclination: 0.025,
    diameter: "4,879 km",
    gravity: "3.7 m/s²",
    moons: "0",
    day: "58.6 Earth days",
    year: "88 Earth days",
    fact: "Mercury has extreme temperature changes between day and night.",
  },
  {
    name: "Venus",
    color: "#e6b66d",
    radius: 3.6,
    size: 0.26,
    speed: 0.58,
    inclination: 0.045,
    diameter: "12,104 km",
    gravity: "8.87 m/s²",
    moons: "0",
    day: "243 Earth days",
    year: "225 Earth days",
    fact: "Venus is the hottest planet in our Solar System.",
  },
  {
    name: "Earth",
    color: "#368cdb",
    radius: 4.9,
    size: 0.29,
    speed: 0.43,
    inclination: 0.065,
    diameter: "12,742 km",
    gravity: "9.81 m/s²",
    moons: "1",
    day: "24 hours",
    year: "365.25 days",
    fact: "Earth is currently the only known planet to support life.",
  },
  {
    name: "Mars",
    color: "#c65d3b",
    radius: 6.2,
    size: 0.22,
    speed: 0.34,
    inclination: 0.085,
    diameter: "6,779 km",
    gravity: "3.71 m/s²",
    moons: "2",
    day: "24.6 hours",
    year: "687 Earth days",
    fact: "Mars has the largest volcano in the Solar System: Olympus Mons.",
  },
  {
    name: "Jupiter",
    color: "#d6a77c",
    radius: 8.1,
    size: 0.72,
    speed: 0.24,
    inclination: 0.105,
    diameter: "139,820 km",
    gravity: "24.79 m/s²",
    moons: "95 known",
    day: "9.9 hours",
    year: "11.86 Earth years",
    fact: "Jupiter's Great Red Spot is a giant storm that has lasted for centuries.",
  },
  {
    name: "Saturn",
    color: "#d9c49a",
    radius: 10.3,
    size: 0.59,
    speed: 0.18,
    inclination: 0.12,
    ring: true,
    diameter: "116,460 km",
    gravity: "10.44 m/s²",
    moons: "146 known",
    day: "10.7 hours",
    year: "29.4 Earth years",
    fact: "Saturn's spectacular rings are made mostly of ice and rocky particles.",
  },
  {
    name: "Uranus",
    color: "#75cbd0",
    radius: 12.4,
    size: 0.43,
    speed: 0.14,
    inclination: 0.14,
    ring: true,
    diameter: "50,724 km",
    gravity: "8.69 m/s²",
    moons: "28 known",
    day: "17.2 hours",
    year: "84 Earth years",
    fact: "Uranus rotates on its side, giving it extreme seasonal changes.",
  },
  {
    name: "Neptune",
    color: "#416de0",
    radius: 14.4,
    size: 0.42,
    speed: 0.11,
    inclination: 0.16,
    diameter: "49,244 km",
    gravity: "11.15 m/s²",
    moons: "16 known",
    day: "16.1 hours",
    year: "165 Earth years",
    fact: "Neptune has some of the fastest winds measured on any planet.",
  },
];

const knowledge: Record<string, PlanetKnowledge> = {
  Mercury: {
    overview:
      "Mercury is the smallest planet and the closest planet to the Sun. It has a heavily cratered surface and almost no atmosphere to retain heat.",
    atmosphere:
      "Mercury has an extremely thin exosphere rather than a thick atmosphere. It cannot trap heat, so temperatures vary dramatically between its sunlit and dark sides.",
    surface:
      "Its rocky surface is covered with impact craters, cliffs and ancient volcanic plains. The Caloris Basin is one of its largest impact features.",
    exploration:
      "NASA's Mariner 10 first flew past Mercury in the 1970s. The MESSENGER spacecraft later orbited the planet and mapped much of its surface. BepiColombo is another mission studying Mercury.",
    discoveries:
      "Scientists found evidence of water ice in permanently shadowed craters near Mercury's poles, despite the planet's proximity to the Sun.",
  },
  Venus: {
    overview:
      "Venus is the second planet from the Sun. It is similar in size to Earth, but its extremely dense atmosphere creates a powerful greenhouse effect.",
    atmosphere:
      "Venus has a thick atmosphere made mostly of carbon dioxide, with clouds of sulfuric acid. Surface pressure is around 92 times Earth's sea-level pressure.",
    surface:
      "The surface is rocky, volcanic and extremely hot. Vast plains, mountains and thousands of volcanic structures shape its landscape.",
    exploration:
      "The Soviet Venera missions sent landers to Venus. NASA's Magellan spacecraft mapped its surface using radar, while newer missions are being planned to study its atmosphere and geology.",
    discoveries:
      "Venus rotates in the opposite direction to most planets. Its atmosphere also rotates much faster than the planet's surface, a phenomenon called super-rotation.",
  },
  Earth: {
    overview:
      "Earth is the third planet from the Sun and our home. Liquid water on its surface, a protective atmosphere and suitable temperatures make it uniquely habitable among known worlds.",
    atmosphere:
      "Earth's atmosphere is made mostly of nitrogen and oxygen. It protects life from harmful radiation, regulates temperature and supports weather systems.",
    surface:
      "About 71% of Earth's surface is covered by water. Its solid outer layer is divided into moving tectonic plates that shape mountains, oceans and earthquakes.",
    exploration:
      "Satellites, space stations and robotic missions continuously observe Earth. The International Space Station also allows astronauts to study our planet from orbit.",
    discoveries:
      "Earth is the only world currently known to support life. Its magnetic field helps shield the planet from charged particles from the Sun.",
  },
  Mars: {
    overview:
      "Mars is the fourth planet from the Sun. Its reddish appearance comes from iron minerals in its soil, and it has been a major target in the search for past life.",
    atmosphere:
      "Mars has a very thin atmosphere composed mostly of carbon dioxide. Dust storms can grow large enough to cover much of the planet.",
    surface:
      "Mars has giant volcanoes, deep canyons, ancient river channels and polar ice caps. Olympus Mons is the tallest known volcano in the Solar System.",
    exploration:
      "NASA's rovers, including Curiosity and Perseverance, explore the Martian surface. Orbiters study its atmosphere, geology and possible water history.",
    discoveries:
      "Evidence shows that liquid water once flowed across parts of Mars. Scientists are investigating whether ancient environments could have supported microbial life.",
  },
  Jupiter: {
    overview:
      "Jupiter is the largest planet in the Solar System. It is a gas giant with powerful storms, faint rings and a large family of moons.",
    atmosphere:
      "Its atmosphere is mostly hydrogen and helium. Colorful cloud bands and enormous storms move across the planet, including the Great Red Spot.",
    surface:
      "Jupiter has no solid surface like Earth. Deeper inside, pressure increases until hydrogen behaves like a liquid and possibly metallic hydrogen.",
    exploration:
      "NASA's Juno spacecraft studies Jupiter's gravity, magnetic field and atmosphere. Earlier missions such as Galileo and Voyager also transformed our understanding of the planet.",
    discoveries:
      "Jupiter's moon Europa has a global ocean beneath its icy crust, making it an important target in the search for environments that could support life.",
  },
  Saturn: {
    overview:
      "Saturn is the sixth planet from the Sun and is famous for its extensive ring system. It is a gas giant made mainly of hydrogen and helium.",
    atmosphere:
      "Saturn's atmosphere contains hydrogen and helium, with clouds and storms. Powerful winds and a huge hexagon-shaped jet stream surround its north pole.",
    surface:
      "Saturn does not have a solid surface. Its rings contain countless pieces of water ice and rocky material, ranging from tiny grains to large chunks.",
    exploration:
      "NASA's Cassini spacecraft spent 13 years studying Saturn, its rings and its moons. The Huygens probe landed on Saturn's moon Titan.",
    discoveries:
      "Enceladus, one of Saturn's moons, releases water-rich plumes into space. Evidence suggests a global ocean exists beneath its icy surface.",
  },
  Uranus: {
    overview:
      "Uranus is the seventh planet from the Sun. It is an ice giant with a blue-green appearance caused by methane in its atmosphere.",
    atmosphere:
      "Its atmosphere contains hydrogen, helium and methane. Methane absorbs red light, giving Uranus its distinctive blue-green color.",
    surface:
      "Uranus has no solid surface. Its interior contains hot, dense fluids rich in water, ammonia and methane, beneath its atmosphere.",
    exploration:
      "Voyager 2 is the only spacecraft to have visited Uranus up close, flying past it in 1986. Telescopes continue to monitor its changing atmosphere.",
    discoveries:
      "Uranus has an extreme axial tilt of about 98 degrees. This means it effectively rolls around the Sun on its side.",
  },
  Neptune: {
    overview:
      "Neptune is the eighth and most distant planet from the Sun. It is a cold, dark blue ice giant with an active and dynamic atmosphere.",
    atmosphere:
      "Neptune's atmosphere contains hydrogen, helium and methane. It features powerful winds and large storm systems.",
    surface:
      "Neptune has no solid surface. Its interior is thought to contain dense hot fluids, including water, ammonia and methane.",
    exploration:
      "Voyager 2 flew past Neptune in 1989 and remains the only spacecraft to have visited it. Earth-based and space telescopes continue to study the planet.",
    discoveries:
      "Neptune's moon Triton orbits in the opposite direction to the planet's rotation. It also has active nitrogen geysers on its surface.",
  },
};

const tabs: KnowledgeTab[] = [
  "Overview",
  "Atmosphere & Weather",
  "Surface & Structure",
  "Space Exploration",
  "Amazing Discoveries",
];

type PlanetOrbitProps = {
  planet: Planet;
  paused: boolean;
  onSelect: (planet: Planet) => void;
};

function PlanetOrbit({ planet, paused, onSelect }: PlanetOrbitProps) {
  const orbitRef = useRef<Group | null>(null);

  useFrame((_, delta) => {
    if (orbitRef.current && !paused) {
      orbitRef.current.rotation.z += delta * planet.speed;
    }
  });

  // A larger invisible sphere makes small planets easier to select.
  const hitRadius = Math.max(planet.size * 2.8, 0.55);

  const selectPlanet = (event: {
    stopPropagation: () => void;
  }) => {
    event.stopPropagation();

    if (paused) {
      onSelect(planet);
    }
  };

  return (
    <group rotation={[planet.inclination, 0, 0]}>
      {/* Orbit path */}
      <mesh>
        <torusGeometry args={[planet.radius, 0.009, 6, 180]} />
        <meshBasicMaterial
          color="#64748b"
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* Planet movement */}
      <group ref={orbitRef}>
        <group position={[planet.radius, 0, 0]}>
          {/* Invisible enlarged click target */}
          <mesh onClick={selectPlanet}>
            <sphereGeometry args={[hitRadius, 24, 24]} />
            <meshBasicMaterial
              transparent
              opacity={0}
              depthWrite={false}
              colorWrite={false}
            />
          </mesh>

          {/* Visible planet */}
          <mesh onClick={selectPlanet}>
            <sphereGeometry args={[planet.size, 48, 48]} />
            <meshStandardMaterial
              color={planet.color}
              roughness={0.8}
              metalness={0.04}
            />
          </mesh>

          {/* Atmospheric glow - excluded from click detection */}
          <mesh scale={1.12} raycast={() => null}>
            <sphereGeometry args={[planet.size, 32, 32]} />
            <meshBasicMaterial
              color={planet.color}
              transparent
              opacity={0.1}
              side={THREE.BackSide}
              depthWrite={false}
            />
          </mesh>

          {/* Planet rings */}
          {planet.ring && (
            <mesh
              rotation={[0.25, 0.15, 0.25]}
              onClick={selectPlanet}
            >
              <ringGeometry
                args={[planet.size * 1.35, planet.size * 2.15, 96]}
              />
              <meshStandardMaterial
                color="#d9c49a"
                side={THREE.DoubleSide}
                transparent
                opacity={0.82}
                roughness={0.9}
              />
            </mesh>
          )}

          {/* Planet label */}
          <Html
            position={[0, planet.size + 0.28, 0]}
            center
            distanceFactor={13}
            style={{ pointerEvents: "none" }}
          >
            <div className="planet-label">{planet.name}</div>
          </Html>
        </group>
      </group>
    </group>
  );
}

function SolarScene({
  paused,
  onSelect,
}: {
  paused: boolean;
  onSelect: (planet: Planet) => void;
}) {
  const sunRef = useRef<Group | null>(null);

  useFrame((_, delta) => {
    if (sunRef.current && !paused) {
      sunRef.current.rotation.y += delta * 0.12;
    }
  });

  return (
    <>
      <ambientLight intensity={0.65} />
      <pointLight
        position={[0, 0, 0]}
        intensity={180}
        distance={45}
        decay={2}
        color="#fff1cf"
      />

      <Stars
        radius={90}
        depth={55}
        count={4500}
        factor={4}
        saturation={0}
        fade
        speed={0.5}
      />

      {/* Sun */}
      <group ref={sunRef}>
        <mesh>
          <sphereGeometry args={[1.15, 64, 64]} />
          <meshBasicMaterial color="#ffb347" />
        </mesh>

        <mesh scale={1.2} raycast={() => null}>
          <sphereGeometry args={[1.15, 32, 32]} />
          <meshBasicMaterial
            color="#ff8c28"
            transparent
            opacity={0.14}
            side={THREE.BackSide}
          />
        </mesh>
      </group>

      {planets.map((planet) => (
        <PlanetOrbit
          key={planet.name}
          planet={planet}
          paused={paused}
          onSelect={onSelect}
        />
      ))}

      <OrbitControls
        enablePan={false}
        enableZoom
        minDistance={16}
        maxDistance={38}
        minPolarAngle={0.35}
        maxPolarAngle={2.65}
        rotateSpeed={0.55}
        zoomSpeed={0.8}
      />
    </>
  );
}

export default function InteractiveSolarSystem() {
  const [paused, setPaused] = useState(false);
  const [selected, setSelected] = useState<Planet | null>(null);
  const [activeTab, setActiveTab] = useState<KnowledgeTab>("Overview");

  const selectedKnowledge = selected
    ? knowledge[selected.name]
    : null;

  const tabContent = () => {
    if (!selectedKnowledge) return "";

    switch (activeTab) {
      case "Overview":
        return selectedKnowledge.overview;
      case "Atmosphere & Weather":
        return selectedKnowledge.atmosphere;
      case "Surface & Structure":
        return selectedKnowledge.surface;
      case "Space Exploration":
        return selectedKnowledge.exploration;
      case "Amazing Discoveries":
        return selectedKnowledge.discoveries;
      default:
        return selectedKnowledge.overview;
    }
  };

  const openPlanet = (planet: Planet) => {
    setSelected(planet);
    setActiveTab("Overview");
  };

  const closeKnowledge = () => {
    setSelected(null);
  };

  return (
    <div className="solar-page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

        * {
          box-sizing: border-box;
        }

        .solar-page {
          position: relative;
          width: 100%;
          min-height: 100vh;
          overflow: hidden;
          background:
            radial-gradient(ellipse at 50% 45%, #101b35 0%, #070d1c 48%, #030711 100%);
          color: #f3f6ff;
          font-family: Inter, sans-serif;
        }

        .solar-header {
          position: relative;
          z-index: 5;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
          padding: 22px 5%;
        }

        .solar-back {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          border: 1px solid rgba(148, 163, 184, 0.22);
          border-radius: 10px;
          padding: 10px 14px;
          color: #dce7ff;
          background: rgba(15, 23, 42, 0.7);
          cursor: pointer;
          font-size: 13px;
        }

        .solar-heading {
          text-align: center;
        }

        .solar-heading h1 {
          margin: 0;
          font-size: clamp(22px, 3vw, 34px);
          letter-spacing: 2px;
          font-weight: 800;
        }

        .solar-heading p {
          margin: 7px 0 0;
          color: #93a4c5;
          font-size: 11px;
          letter-spacing: 2px;
          text-transform: uppercase;
        }

        .solar-status {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #a9b8d5;
          font-size: 12px;
        }

        .status-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #45e0a2;
          box-shadow: 0 0 12px #45e0a2;
        }

        .solar-intro {
          position: relative;
          z-index: 2;
          text-align: center;
          padding: 8px 16px 0;
        }

        .solar-intro h2 {
          margin: 0;
          font-size: clamp(17px, 2.4vw, 24px);
          font-weight: 600;
        }

        .solar-intro p {
          margin: 9px 0 0;
          color: #9aabc9;
          font-size: 13px;
        }

        .solar-canvas {
          position: relative;
          width: 100%;
          height: min(66vh, 650px);
          min-height: 420px;
          cursor: grab;
        }

        .solar-canvas:active {
          cursor: grabbing;
        }

        .planet-label {
          color: #e6efff;
          font-size: 11px;
          font-weight: 600;
          white-space: nowrap;
          text-shadow: 0 2px 8px #000;
        }

        .solar-controls {
          position: relative;
          z-index: 3;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
          padding: 0 16px 24px;
        }

        .solar-control-btn {
          display: inline-flex;
          justify-content: center;
          align-items: center;
          gap: 9px;
          border: 1px solid rgba(125, 160, 220, 0.35);
          border-radius: 10px;
          padding: 12px 19px;
          color: #e8efff;
          background: rgba(20, 35, 65, 0.8);
          cursor: pointer;
          font-size: 13px;
          font-weight: 600;
          transition: 0.2s ease;
        }

        .solar-control-btn:hover {
          border-color: #69a5ff;
          background: rgba(40, 70, 120, 0.8);
          transform: translateY(-2px);
        }

        .solar-hint {
          position: relative;
          z-index: 2;
          text-align: center;
          color: #7f91b2;
          font-size: 11px;
          padding: 0 15px 26px;
        }

        .knowledge-overlay {
          position: fixed;
          z-index: 20;
          inset: 0;
          display: flex;
          justify-content: flex-end;
          background: rgba(0, 0, 0, 0.48);
          backdrop-filter: blur(5px);
        }

        .knowledge-panel {
          width: min(510px, 100%);
          height: 100%;
          overflow-y: auto;
          padding: 30px;
          border-left: 1px solid rgba(148, 163, 184, 0.18);
          background: linear-gradient(160deg, #101d35, #070d1c 75%);
          box-shadow: -20px 0 70px rgba(0, 0, 0, 0.35);
          animation: panel-in 0.25s ease;
        }

        @keyframes panel-in {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .knowledge-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }

        .knowledge-eyebrow {
          color: #83a9f4;
          font-size: 10px;
          letter-spacing: 2px;
          text-transform: uppercase;
        }

        .knowledge-close {
          display: grid;
          place-items: center;
          width: 36px;
          height: 36px;
          border: 1px solid rgba(148, 163, 184, 0.25);
          border-radius: 9px;
          background: rgba(30, 45, 75, 0.65);
          color: white;
          cursor: pointer;
        }

        .knowledge-title {
          display: flex;
          align-items: center;
          gap: 16px;
          margin: 30px 0 24px;
        }

        .planet-orb {
          flex: 0 0 auto;
          width: 58px;
          height: 58px;
          border-radius: 50%;
          box-shadow: inset -10px -8px 18px rgba(0,0,0,.35), 0 0 28px var(--planet-color);
        }

        .knowledge-title h2 {
          margin: 0;
          font-size: 30px;
        }

        .knowledge-title p {
          margin: 6px 0 0;
          color: #91a5ca;
          font-size: 12px;
        }

        .planet-stats {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px;
          margin-bottom: 25px;
        }

        .planet-stat {
          padding: 14px;
          border: 1px solid rgba(148, 163, 184, 0.14);
          border-radius: 11px;
          background: rgba(22, 38, 67, 0.62);
        }

        .planet-stat span {
          display: block;
          margin-bottom: 7px;
          color: #8fa2c4;
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .planet-stat strong {
          color: #f2f6ff;
          font-size: 15px;
        }

        .knowledge-section-title {
          margin: 0 0 13px;
          font-size: 15px;
        }

        .knowledge-tabs {
          display: flex;
          gap: 8px;
          overflow-x: auto;
          padding-bottom: 12px;
          scrollbar-width: thin;
        }

        .knowledge-tab {
          flex: 0 0 auto;
          border: 1px solid rgba(148, 163, 184, 0.18);
          border-radius: 8px;
          padding: 9px 11px;
          color: #a9b9d5;
          background: rgba(18, 32, 57, 0.75);
          cursor: pointer;
          font-size: 11px;
        }

        .knowledge-tab.active {
          color: #fff;
          border-color: #6297ef;
          background: rgba(48, 91, 160, 0.55);
        }

        .knowledge-content {
          min-height: 145px;
          padding: 18px;
          border: 1px solid rgba(100, 145, 220, 0.2);
          border-radius: 12px;
          background: rgba(18, 32, 57, 0.65);
          color: #c3d0e8;
          font-size: 13px;
          line-height: 1.8;
        }

        .cosmic-fact {
          margin-top: 18px;
          padding: 17px;
          border-left: 3px solid #72a8ff;
          border-radius: 8px;
          background: rgba(49, 83, 139, 0.18);
        }

        .cosmic-fact strong {
          display: block;
          margin-bottom: 8px;
          color: #8bb6ff;
          font-size: 11px;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .cosmic-fact p {
          margin: 0;
          color: #c5d2e9;
          font-size: 12px;
          line-height: 1.7;
        }

        @media (max-width: 650px) {
          .solar-header {
            padding: 16px;
          }

          .solar-status {
            display: none;
          }

          .solar-canvas {
            height: 55vh;
            min-height: 360px;
          }

          .knowledge-panel {
            padding: 22px 18px;
          }
        }
      `}</style>

      <header className="solar-header">
        <button
          className="solar-back"
          onClick={() => window.history.back()}
        >
          <ArrowLeft size={16} />
          Back
        </button>

        <div className="solar-heading">
          <h1>SOLAR SYSTEM</h1>
          <p>Explore our cosmic neighbourhood</p>
        </div>

        <div className="solar-status">
          <span className="status-dot" />
          SYSTEM ONLINE
        </div>
      </header>

      <section className="solar-intro">
        <h2>Journey Through Our Solar System</h2>
        <p>
          Drag to rotate · Scroll to zoom · Pause orbit and select a planet
        </p>
      </section>

      <div className="solar-canvas">
        <Canvas
          camera={{ position: [0, 10, 25], fov: 48 }}
          dpr={[1, 1.7]}
          gl={{ antialias: true, alpha: true }}
        >
          <SolarScene
            paused={paused}
            onSelect={openPlanet}
          />
        </Canvas>
      </div>

      <div className="solar-controls">
        <button
          className="solar-control-btn"
          onClick={() => setPaused((current) => !current)}
        >
          {paused ? <Play size={16} /> : <Pause size={16} />}
          {paused ? "Resume Orbit" : "Pause Orbit"}
        </button>

        <button
          className="solar-control-btn"
          onClick={() => {
            setSelected(null);
            setPaused(false);
          }}
        >
          <Orbit size={16} />
          Reset View
        </button>
      </div>

      <p className="solar-hint">
        {paused
          ? "Orbit paused — click any planet to explore its Knowledge Centre."
          : "Pause the orbit first to select a planet and explore its details."}
      </p>

      {selected && selectedKnowledge && (
        <div
          className="knowledge-overlay"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              closeKnowledge();
            }
          }}
        >
          <aside className="knowledge-panel">
            <div className="knowledge-top">
              <span className="knowledge-eyebrow">
                Planet Knowledge Centre
              </span>

              <button
                className="knowledge-close"
                onClick={closeKnowledge}
                aria-label="Close knowledge centre"
              >
                <X size={18} />
              </button>
            </div>

            <div className="knowledge-title">
              <div
                className="planet-orb"
                style={
                  {
                    background: selected.color,
                    "--planet-color": selected.color,
                  } as React.CSSProperties
                }
              />

              <div>
                <h2>{selected.name}</h2>
                <p>Solar System · Planet Profile</p>
              </div>
            </div>

            <div className="planet-stats">
              <div className="planet-stat">
                <span>Diameter</span>
                <strong>{selected.diameter}</strong>
              </div>

              <div className="planet-stat">
                <span>Gravity</span>
                <strong>{selected.gravity}</strong>
              </div>

              <div className="planet-stat">
                <span>Known Moons</span>
                <strong>{selected.moons}</strong>
              </div>

              <div className="planet-stat">
                <span>Day Length</span>
                <strong>{selected.day}</strong>
              </div>

              <div className="planet-stat">
                <span>Year Length</span>
                <strong>{selected.year}</strong>
              </div>

              <div className="planet-stat">
                <span>Distance Order</span>
                <strong>
                  {planets.findIndex(
                    (planet) => planet.name === selected.name
                  ) + 1}
                  {["st", "nd", "rd"][planets.findIndex(
                    (planet) => planet.name === selected.name
                  )] || "th"}
                </strong>
              </div>
            </div>

            <h3 className="knowledge-section-title">
              Explore {selected.name}
            </h3>

            <div className="knowledge-tabs">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  className={`knowledge-tab ${
                    activeTab === tab ? "active" : ""
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="knowledge-content">
              {tabContent()}
            </div>

            <div className="cosmic-fact">
              <strong>Did you know?</strong>
              <p>{selected.fact}</p>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
