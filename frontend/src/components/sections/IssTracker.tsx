
import { Suspense, useEffect, useMemo, useState } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls, Stars, Html } from "@react-three/drei";
import * as THREE from "three";

type ISSData = {
  latitude: number;
  longitude: number;
  altitude: number;
  velocity: number;
  timestamp: number;
};

function getISSPosition(
  latitude: number,
  longitude: number,
  radius: number
): [number, number, number] {
  const lat = THREE.MathUtils.degToRad(latitude);
  const lon = THREE.MathUtils.degToRad(longitude);

  return [
    radius * Math.cos(lat) * Math.sin(lon),
    radius * Math.sin(lat),
    radius * Math.cos(lat) * Math.cos(lon),
  ];
}

// 3D Earth
function Earth() {
  const texture = useLoader(
    THREE.TextureLoader,
    "https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg"
  );

  return (
    <group>
      <mesh>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial map={texture} roughness={1} />
      </mesh>

      <mesh>
        <sphereGeometry args={[2.06, 64, 64]} />
        <meshBasicMaterial
          color="#258BFF"
          transparent
          opacity={0.12}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}

// ISS orbital path
function OrbitPath() {
  const orbitLine = useMemo(() => {
    const points: THREE.Vector3[] = [];
    const inclination = THREE.MathUtils.degToRad(51.6);

    for (let i = 0; i <= 180; i++) {
      const angle = (i / 180) * Math.PI * 2;

      points.push(
        new THREE.Vector3(
          2.17 * Math.cos(angle),
          2.17 * Math.sin(angle) * Math.sin(inclination),
          2.17 * Math.sin(angle) * Math.cos(inclination)
        )
      );
    }

    const geometry = new THREE.BufferGeometry().setFromPoints(points);

    const material = new THREE.LineBasicMaterial({
      color: "#00E5FF",
      transparent: true,
      opacity: 0.65,
    });

    return new THREE.Line(geometry, material);
  }, []);

  useEffect(() => {
    return () => {
      orbitLine.geometry.dispose();
      (orbitLine.material as THREE.Material).dispose();
    };
  }, [orbitLine]);

  return <primitive object={orbitLine} />;
}

// Live ISS marker
function ISSMarker({ data }: { data: ISSData | null }) {
  if (!data) return null;

  const position = getISSPosition(
    data.latitude,
    data.longitude,
    2.13
  );

  return (
    <group position={position}>
      <mesh>
        <sphereGeometry args={[0.075, 24, 24]} />
        <meshBasicMaterial color="#00FFFF" />
      </mesh>

      <mesh>
        <boxGeometry args={[0.13, 0.055, 0.055]} />
        <meshStandardMaterial
          color="#FFFFFF"
          emissive="#00AFFF"
          emissiveIntensity={0.7}
        />
      </mesh>

      <mesh position={[-0.13, 0, 0]}>
        <boxGeometry args={[0.14, 0.025, 0.12]} />
        <meshStandardMaterial color="#167BFF" />
      </mesh>

      <mesh position={[0.13, 0, 0]}>
        <boxGeometry args={[0.14, 0.025, 0.12]} />
        <meshStandardMaterial color="#167BFF" />
      </mesh>

      <Html distanceFactor={8} position={[0, 0.2, 0]}>
        <div
          style={{
            color: "#00FFFF",
            fontSize: "12px",
            fontWeight: 800,
            whiteSpace: "nowrap",
            textShadow: "0 0 10px #00FFFF",
            pointerEvents: "none",
          }}
        >
          ISS
        </div>
      </Html>
    </group>
  );
}

// 3D Earth scene
function EarthScene({ data }: { data: ISSData | null }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 6.5], fov: 45 }}
      style={{ height: "480px", width: "100%" }}
    >
      <color attach="background" args={["#050A18"]} />

      <ambientLight intensity={1.5} />
      <directionalLight position={[5, 3, 5]} intensity={2.5} />

      <Stars
        radius={100}
        depth={50}
        count={2500}
        factor={4}
        saturation={0}
        fade
        speed={0.5}
      />

      <Suspense
        fallback={
          <mesh>
            <sphereGeometry args={[2, 32, 32]} />
            <meshStandardMaterial color="#1769AA" />
          </mesh>
        }
      >
        <Earth />
      </Suspense>

      <OrbitPath />
      <ISSMarker data={data} />

      <OrbitControls
        enablePan={false}
        enableZoom
        enableRotate
        enableDamping
        dampingFactor={0.05}
        minDistance={3.5}
        maxDistance={11}
        autoRotate={false}
      />
    </Canvas>
  );
}

// Main ISS tracker
export default function IssTracker() {
  const [data, setData] = useState<ISSData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function fetchISS() {
      try {
        const response = await fetch(
          "https://api.wheretheiss.at/v1/satellites/25544"
        );

        if (!response.ok) {
          throw new Error("ISS data unavailable");
        }

        const result: ISSData = await response.json();

        if (active) {
          setData(result);
          setError("");
          setLoading(false);
        }
      } catch {
        if (active) {
          setError("Live data nahi mil raha. Thodi der baad try karo.");
          setLoading(false);
        }
      }
    }

    fetchISS();

    const interval = window.setInterval(fetchISS, 5000);

    return () => {
      active = false;
      window.clearInterval(interval);
    };
  }, []);

  return (
    <section
      id="iss-tracker"
      style={{
        background: "#0D1224",
        color: "#f4f7ff",
        padding: "32px",
        borderRadius: "20px",
        margin: "24px 0",
        border: "1px solid #263452",
        overflow: "hidden",
      }}
    >
      <p
        style={{
          color: "#00E5FF",
          letterSpacing: "3px",
          fontSize: "12px",
          fontWeight: 700,
        }}
      >
        LIVE ORBITAL TELEMETRY
      </p>

      <h2 style={{ fontSize: "28px", margin: "12px 0" }}>
        International Space Station
      </h2>

      <p style={{ color: "#aab7d0" }}>
        Track the ISS as it travels around Earth.
      </p>

      {/* Interactive 3D Earth */}
      <div
        style={{
          marginTop: "24px",
          borderRadius: "16px",
          overflow: "hidden",
          border: "1px solid #263F63",
          background: "#050A18",
        }}
      >
        <EarthScene data={data} />
      </div>

      <p
        style={{
          color: "#8FA0BD",
          fontSize: "12px",
          textAlign: "center",
          marginTop: "10px",
        }}
      >
        DRAG TO ROTATE · SCROLL TO ZOOM · EXPLORE EARTH
      </p>

      {loading && <p>Loading live ISS telemetry...</p>}

      {error && (
        <p role="alert" style={{ color: "#FF8B8B" }}>
          {error}
        </p>
      )}

      {data && (
        <>
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(150px, 1fr))",
              gap: "14px",
              marginTop: "24px",
            }}
          >
            {[
              {
                label: "LATITUDE",
                value: `${data.latitude.toFixed(4)}°`,
              },
              {
                label: "LONGITUDE",
                value: `${data.longitude.toFixed(4)}°`,
              },
              {
                label: "ALTITUDE",
                value: `${data.altitude.toFixed(2)} km`,
              },
              {
                label: "VELOCITY",
                value: `${data.velocity.toFixed(2)} km/h`,
              },
            ].map((item) => (
              <div
                key={item.label}
                style={{
                  background: "#151F37",
                  border: "1px solid #263452",
                  borderRadius: "12px",
                  padding: "16px",
                }}
              >
                <p
                  style={{
                    color: "#8FA0BD",
                    fontSize: "11px",
                    letterSpacing: "1px",
                  }}
                >
                  {item.label}
                </p>

                <h3
                  style={{
                    color: "#00E5FF",
                    fontSize: "19px",
                    marginTop: "8px",
                  }}
                >
                  {item.value}
                </h3>
              </div>
            ))}
          </div>

          <p style={{ color: "#8fa0bd", marginTop: "22px" }}>
            Last updated:{" "}
            {new Date(data.timestamp * 1000).toLocaleTimeString()}
          </p>
        </>
      )}
    </section>
  );
}
