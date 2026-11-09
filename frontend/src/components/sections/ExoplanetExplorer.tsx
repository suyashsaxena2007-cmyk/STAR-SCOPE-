
import { useEffect, useMemo, useState } from "react";

type Exoplanet = {
  pl_name: string;
  hostname: string;
  discoverymethod: string;
  disc_year: number | null;
  sy_dist: number | null;
  pl_rade: number | null;
  pl_bmasse: number | null;
};

const API_URL = "https://exoplanetarchive.ipac.caltech.edu/TAP/sync";

export default function ExoplanetExplorer() {
  const [planets, setPlanets] = useState<Exoplanet[]>([]);
  const [search, setSearch] = useState("");
  const [method, setMethod] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadPlanets() {
      try {
        setLoading(true);
        setError("");

        const query =
          "select top 100 pl_name,hostname,discoverymethod,disc_year,sy_dist,pl_rade,pl_bmasse " +
          "from pscomppars where default_flag=1 order by disc_year desc";

        const params = new URLSearchParams({
          query,
          format: "json",
        });

        const response = await fetch(`${API_URL}?${params.toString()}`);

        if (!response.ok) {
          throw new Error("NASA API se data nahi aa paya.");
        }

        const result = await response.json();
        let records: Exoplanet[];

        // NASA response ko handle karna
        if (Array.isArray(result)) {
          records = result;
        } else if (
          result &&
          Array.isArray(result.metadata) &&
          Array.isArray(result.data)
        ) {
          const columns = result.metadata.map(
            (column: { name: string }) => column.name
          );

          records = result.data.map((row: unknown[]) => {
            const planet: Record<string, unknown> = {};

            columns.forEach((column: string, index: number) => {
              planet[column] = row[index];
            });

            return planet as Exoplanet;
          });
        } else {
          throw new Error("NASA API ka response samajh nahi aaya.");
        }

        setPlanets(records);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Kuch galat ho gaya. Dobara try karo."
        );
      } finally {
        setLoading(false);
      }
    }

    loadPlanets();
  }, []);

  const methods = useMemo(() => {
    const uniqueMethods = planets
      .map((planet) => planet.discoverymethod)
      .filter((value): value is string => Boolean(value));

    return ["All", ...Array.from(new Set(uniqueMethods)).sort()];
  }, [planets]);

  const filteredPlanets = useMemo(() => {
    const term = search.trim().toLowerCase();

    return planets.filter((planet) => {
      const matchesSearch =
        !term ||
        (planet.pl_name || "").toLowerCase().includes(term) ||
        (planet.hostname || "").toLowerCase().includes(term);

      const matchesMethod =
        method === "All" || planet.discoverymethod === method;

      return matchesSearch && matchesMethod;
    });
  }, [planets, search, method]);

  const formatNumber = (value: number | null, digits = 2) =>
    value == null || !Number.isFinite(Number(value))
      ? "Not available"
      : Number(value).toLocaleString(undefined, {
          maximumFractionDigits: digits,
        });

  return (
    <section
      id="exoplanet-explorer"
      style={{
        padding: "64px 20px",
        color: "#f4f6ff",
        background:
          "radial-gradient(ellipse at top, #172554 0%, #080d20 55%, #050711 100%)",
      }}
    >
      <div style={{ maxWidth: 1150, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 30 }}>
          <p
            style={{
              color: "#8bb8ff",
              letterSpacing: 3,
              fontSize: 12,
              fontWeight: 700,
            }}
          >
            BEYOND OUR SOLAR SYSTEM
          </p>

          <h2
            style={{
              fontSize: "clamp(30px, 5vw, 46px)",
              margin: "10px 0",
            }}
          >
            Exoplanet Explorer
          </h2>

          <p style={{ color: "#b7c3df", lineHeight: 1.7 }}>
            Discover distant worlds orbiting stars beyond our Sun.
          </p>
        </div>

        <div
          style={{
            display: "flex",
            gap: 12,
            flexWrap: "wrap",
            marginBottom: 24,
          }}
        >
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search planet or host star..."
            aria-label="Search planet or host star"
            style={{
              flex: "1 1 240px",
              minWidth: 0,
              padding: "13px 15px",
              borderRadius: 12,
              border: "1px solid #344568",
              background: "#101a31",
              color: "#ffffff",
              fontSize: 14,
            }}
          />

          <select
            value={method}
            onChange={(event) => setMethod(event.target.value)}
            aria-label="Filter by discovery method"
            style={{
              flex: "0 1 240px",
              minWidth: 0,
              padding: "13px 15px",
              borderRadius: 12,
              border: "1px solid #344568",
              background: "#101a31",
              color: "#ffffff",
              fontSize: 14,
            }}
          >
            {methods.map((item) => (
              <option key={item} value={item}>
                {item === "All" ? "All discovery methods" : item}
              </option>
            ))}
          </select>
        </div>

        {loading && (
          <p style={{ textAlign: "center", padding: 35, color: "#b7c3df" }}>
            Loading real exoplanet data from NASA...
          </p>
        )}

        {!loading && error && (
          <div
            style={{
              padding: 20,
              borderRadius: 14,
              border: "1px solid #70404c",
              background: "#251520",
              textAlign: "center",
            }}
          >
            <p>{error}</p>
            <button
              onClick={() => window.location.reload()}
              style={{
                padding: "10px 16px",
                borderRadius: 9,
                border: 0,
                cursor: "pointer",
              }}
            >
              Reload page
            </button>
          </div>
        )}

        {!loading && !error && (
          <>
            <p style={{ color: "#aebbd7", marginBottom: 18 }}>
              Showing {filteredPlanets.length} of {planets.length} loaded
              planets
            </p>

            {filteredPlanets.length === 0 ? (
              <p style={{ textAlign: "center", padding: 30 }}>
                Koi matching planet nahi mila. Search badal kar dekho.
              </p>
            ) : (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                  gap: 18,
                }}
              >
                {filteredPlanets.map((planet, index) => (
                  <article
                    key={planet.pl_name || index}
                    style={{
                      padding: 21,
                      borderRadius: 17,
                      border: "1px solid #293b60",
                      background:
                        "linear-gradient(145deg, #14213d, #0b1225)",
                      boxShadow: "0 10px 30px #00000020",
                    }}
                  >
                    <div
                      style={{
                        fontSize: 12,
                        color: "#8bb8ff",
                        letterSpacing: 1.2,
                        marginBottom: 9,
                      }}
                    >
                      EXOPLANET
                    </div>

                    <h3
                      style={{
                        fontSize: 21,
                        overflowWrap: "anywhere",
                        margin: "0 0 8px",
                      }}
                    >
                      {planet.pl_name || "Unnamed planet"}
                    </h3>

                    <p
                      style={{
                        color: "#b7c3df",
                        fontSize: 13,
                        margin: "0 0 17px",
                      }}
                    >
                      Host star: {planet.hostname || "Not available"}
                    </p>

                    <div
                      style={{
                        padding: "9px 11px",
                        borderRadius: 9,
                        background: "#243657",
                        color: "#d9e7ff",
                        fontSize: 12,
                        marginBottom: 17,
                      }}
                    >
                      {planet.discoverymethod || "Discovery method unavailable"}
                    </div>

                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: 15,
                      }}
                    >
                      <div>
                        <p style={{ color: "#8d9cbd", fontSize: 12 }}>
                          Discovery year
                        </p>
                        <strong>{planet.disc_year ?? "N/A"}</strong>
                      </div>

                      <div>
                        <p style={{ color: "#8d9cbd", fontSize: 12 }}>
                          Distance (pc)
                        </p>
                        <strong>{formatNumber(planet.sy_dist)}</strong>
                      </div>

                      <div>
                        <p style={{ color: "#8d9cbd", fontSize: 12 }}>
                          Radius (Earth = 1)
                        </p>
                        <strong>{formatNumber(planet.pl_rade)}</strong>
                      </div>

                      <div>
                        <p style={{ color: "#8d9cbd", fontSize: 12 }}>
                          Mass (Earth = 1)
                        </p>
                        <strong>{formatNumber(planet.pl_bmasse)}</strong>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}

            <p
              style={{
                textAlign: "center",
                color: "#8291b2",
                fontSize: 12,
                marginTop: 28,
              }}
            >
              Data source: NASA Exoplanet Archive. Missing values are shown as
              unavailable.
            </p>
          </>
        )}
      </div>
    </section>
  );
}
