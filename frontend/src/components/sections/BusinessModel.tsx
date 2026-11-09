
import { useState } from "react";

const revenueStreams = [
  {
    icon: "🎓",
    title: "Education subscriptions",
    description:
      "Offer advanced learning modules, quizzes and astronomy learning paths.",
    model: "Freemium",
  },
  {
    icon: "🏫",
    title: "Institutional plans",
    description:
      "Provide classroom dashboards, educational resources and group learning tools to schools and colleges.",
    model: "B2B",
  },
  {
    icon: "📊",
    title: "Premium space tools",
    description:
      "Explore paid advanced visualizations, data exports and enhanced analytics if developed.",
    model: "Subscription",
  },
  {
    icon: "🤝",
    title: "Partnerships & sponsorships",
    description:
      "Collaborate with science events, educational organizations and relevant sponsors.",
    model: "Partnerships",
  },
];

const customerGroups = [
  {
    icon: "👩‍🎓",
    title: "Students & educators",
    detail: "Interactive learning, quizzes and classroom activities.",
  },
  {
    icon: "🔭",
    title: "Space enthusiasts",
    detail: "Space exploration tools and accessible astronomy information.",
  },
  {
    icon: "🏛️",
    title: "Schools & colleges",
    detail: "Educational demonstrations, group learning and science outreach.",
  },
  {
    icon: "🧪",
    title: "Research & science groups",
    detail: "Potential future access to specialized visualizations and data tools.",
  },
];

export default function BusinessModel() {
  const [activeTab, setActiveTab] = useState("revenue");

  return (
    <section
      id="business-model"
      style={{
        padding: "76px 20px",
        color: "#f4f6ff",
        background:
          "radial-gradient(ellipse at top, #182b50 0%, #0a1124 48%, #050711 100%)",
      }}
    >
      <div style={{ maxWidth: 1120, margin: "0 auto" }}>
        <header style={{ textAlign: "center", marginBottom: 38 }}>
          <p
            style={{
              color: "#9bbcff",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: 3,
            }}
          >
            FROM SPACE EXPLORATION TO SUSTAINABLE GROWTH
          </p>

          <h2
            style={{
              fontSize: "clamp(32px, 5vw, 48px)",
              margin: "13px 0",
            }}
          >
            Starscope Business Model
          </h2>

          <p
            style={{
              maxWidth: 700,
              margin: "0 auto",
              color: "#b6c4df",
              lineHeight: 1.8,
              fontSize: 14,
            }}
          >
            Making space science more accessible through interactive
            technology, educational experiences and potential institutional
            partnerships.
          </p>
        </header>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 15,
            marginBottom: 34,
          }}
        >
          {[
            {
              icon: "🌍",
              title: "Our Mission",
              text: "Make space exploration easier to understand and explore.",
            },
            {
              icon: "🧑‍🚀",
              title: "Our Audience",
              text: "Students, educators, enthusiasts and institutions.",
            },
            {
              icon: "💡",
              title: "Our Approach",
              text: "Free core tools with optional premium learning services.",
            },
          ].map((item) => (
            <div
              key={item.title}
              style={{
                padding: 22,
                border: "1px solid #2a3d60",
                background: "#111b31",
                borderRadius: 16,
              }}
            >
              <div style={{ fontSize: 27 }}>{item.icon}</div>
              <h3 style={{ fontSize: 19, margin: "13px 0 8px" }}>
                {item.title}
              </h3>
              <p
                style={{
                  color: "#afbedb",
                  fontSize: 13,
                  lineHeight: 1.7,
                  margin: 0,
                }}
              >
                {item.text}
              </p>
            </div>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 10,
            marginBottom: 23,
          }}
        >
          {[
            { id: "revenue", label: "💰 Revenue Streams" },
            { id: "customers", label: "👥 Customer Segments" },
            { id: "growth", label: "📈 Growth Strategy" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                flex: "1 1 180px",
                padding: "13px 16px",
                borderRadius: 11,
                border:
                  activeTab === tab.id
                    ? "1px solid #86aaff"
                    : "1px solid #2b3c5d",
                background: activeTab === tab.id ? "#243c67" : "#10182b",
                color: "#f4f6ff",
                cursor: "pointer",
                fontWeight: 600,
                fontSize: 13,
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "revenue" && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(235px, 1fr))",
              gap: 15,
            }}
          >
            {revenueStreams.map((stream) => (
              <article
                key={stream.title}
                style={{
                  padding: 22,
                  border: "1px solid #2b3c5d",
                  background: "linear-gradient(145deg, #14213b, #0d1427)",
                  borderRadius: 16,
                }}
              >
                <div style={{ fontSize: 30 }}>{stream.icon}</div>
                <h3 style={{ fontSize: 18, margin: "13px 0 9px" }}>
                  {stream.title}
                </h3>
                <p
                  style={{
                    color: "#afbedb",
                    fontSize: 13,
                    lineHeight: 1.75,
                    minHeight: 68,
                  }}
                >
                  {stream.description}
                </p>
                <span
                  style={{
                    display: "inline-block",
                    marginTop: 8,
                    padding: "6px 10px",
                    borderRadius: 20,
                    background: "#24385a",
                    color: "#c8d9ff",
                    fontSize: 11,
                  }}
                >
                  {stream.model}
                </span>
              </article>
            ))}
          </div>
        )}

        {activeTab === "customers" && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
              gap: 15,
            }}
          >
            {customerGroups.map((group) => (
              <article
                key={group.title}
                style={{
                  padding: 22,
                  border: "1px solid #2b3c5d",
                  background: "#111b31",
                  borderRadius: 16,
                }}
              >
                <div style={{ fontSize: 29 }}>{group.icon}</div>
                <h3 style={{ fontSize: 18, margin: "13px 0 8px" }}>
                  {group.title}
                </h3>
                <p
                  style={{
                    color: "#afbedb",
                    fontSize: 13,
                    lineHeight: 1.75,
                    margin: 0,
                  }}
                >
                  {group.detail}
                </p>
              </article>
            ))}
          </div>
        )}

        {activeTab === "growth" && (
          <div
            style={{
              padding: 24,
              border: "1px solid #2b3c5d",
              background: "#111b31",
              borderRadius: 16,
            }}
          >
            {[
              {
                number: "01",
                title: "Build an engaging free experience",
                detail:
                  "Improve existing space tools, quizzes and educational content.",
              },
              {
                number: "02",
                title: "Pilot with student communities",
                detail:
                  "Gather feedback from clubs, educators and college science groups.",
              },
              {
                number: "03",
                title: "Test institutional partnerships",
                detail:
                  "Explore small educational pilots before investing in paid plans.",
              },
              {
                number: "04",
                title: "Validate willingness to pay",
                detail:
                  "Test pricing and demand before launching premium subscriptions.",
              },
            ].map((step) => (
              <div
                key={step.number}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 15,
                  padding: "17px 0",
                  borderBottom:
                    step.number === "04" ? "none" : "1px solid #293958",
                }}
              >
                <div
                  style={{
                    flexShrink: 0,
                    display: "grid",
                    placeItems: "center",
                    width: 40,
                    height: 40,
                    borderRadius: 12,
                    background: "#243c67",
                    color: "#c8d9ff",
                    fontWeight: 700,
                  }}
                >
                  {step.number}
                </div>
                <div>
                  <h3 style={{ fontSize: 16, margin: "2px 0 7px" }}>
                    {step.title}
                  </h3>
                  <p
                    style={{
                      color: "#afbedb",
                      fontSize: 13,
                      lineHeight: 1.7,
                      margin: 0,
                    }}
                  >
                    {step.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        <div
          style={{
            marginTop: 24,
            padding: 21,
            borderRadius: 15,
            border: "1px solid #41618c",
            background:
              "linear-gradient(120deg, #182a49, #121c33)",
          }}
        >
          <h3 style={{ margin: "0 0 9px", fontSize: 18 }}>
            Our proposed model: Free + Premium
          </h3>
          <p
            style={{
              color: "#c0cde4",
              fontSize: 13,
              lineHeight: 1.8,
              margin: 0,
            }}
          >
            Keep essential exploration and learning tools free. If user demand
            is validated, introduce optional paid learning resources,
            institutional access and advanced features. Revenue, pricing and
            customer demand are targets to validate—not established results.
          </p>
        </div>

        <p
          style={{
            color: "#8293b4",
            fontSize: 11,
            textAlign: "center",
            marginTop: 26,
            lineHeight: 1.7,
          }}
        >
          STARSCOPE • PROPOSED BUSINESS MODEL • SUBJECT TO MARKET VALIDATION
        </p>
      </div>
    </section>
  );
}
