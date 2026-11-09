
import { useEffect, useState } from "react";

type Question = {
  question: string;
  options: string[];
  answer: number;
  explanation: string;
  difficulty: "Easy" | "Medium" | "Hard";
};

const questions: Question[] = [
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Mercury"],
    answer: 1,
    explanation: "Iron-rich dust gives Mars its distinctive reddish appearance.",
    difficulty: "Easy",
  },
  {
    question: "Which is the largest planet in our Solar System?",
    options: ["Saturn", "Earth", "Jupiter", "Neptune"],
    answer: 2,
    explanation: "Jupiter is the largest planet in our Solar System.",
    difficulty: "Easy",
  },
  {
    question: "What is the name of our galaxy?",
    options: ["Andromeda", "Milky Way", "Whirlpool", "Sombrero"],
    answer: 1,
    explanation: "Our Solar System is located in the Milky Way galaxy.",
    difficulty: "Easy",
  },
  {
    question: "Which planet has the most prominent ring system?",
    options: ["Mars", "Venus", "Saturn", "Mercury"],
    answer: 2,
    explanation: "Saturn's extensive rings are made mostly of ice and rocky material.",
    difficulty: "Easy",
  },
  {
    question: "What is the closest star to Earth?",
    options: ["Sirius", "Proxima Centauri", "The Sun", "Polaris"],
    answer: 2,
    explanation: "The Sun is our nearest star.",
    difficulty: "Easy",
  },
  {
    question: "What does a light-year measure?",
    options: ["Time", "Brightness", "Distance", "Temperature"],
    answer: 2,
    explanation: "A light-year is the distance light travels in one year.",
    difficulty: "Medium",
  },
  {
    question: "Which space telescope launched in 2021?",
    options: [
      "Hubble Space Telescope",
      "James Webb Space Telescope",
      "Kepler Telescope",
      "Chandra X-ray Observatory",
    ],
    answer: 1,
    explanation: "The James Webb Space Telescope launched on 25 December 2021.",
    difficulty: "Medium",
  },
  {
    question: "What is the boundary around a black hole beyond which light cannot escape called?",
    options: ["Solar boundary", "Event horizon", "Oort cloud", "Photosphere"],
    answer: 1,
    explanation: "The event horizon marks the boundary beyond which escape is impossible.",
    difficulty: "Hard",
  },
  {
    question: "Which was the first artificial satellite to orbit Earth?",
    options: ["Apollo 11", "Voyager 1", "Sputnik 1", "Explorer 1"],
    answer: 2,
    explanation: "The Soviet Union launched Sputnik 1 in 1957.",
    difficulty: "Medium",
  },
  {
    question: "What is the name of the boundary where the solar wind meets interstellar space?",
    options: ["Heliopause", "Magnetopause", "Terminator", "Asteroid belt"],
    answer: 0,
    explanation: "The heliopause marks the outer boundary of the Sun's heliosphere.",
    difficulty: "Hard",
  },
  {
    question: "Which planet rotates on its side to an extreme degree?",
    options: ["Earth", "Uranus", "Mars", "Mercury"],
    answer: 1,
    explanation: "Uranus has an axial tilt of about 98 degrees.",
    difficulty: "Medium",
  },
  {
    question: "What is the primary force that keeps planets in orbit around the Sun?",
    options: ["Magnetism", "Friction", "Gravity", "Solar wind"],
    answer: 2,
    explanation: "The Sun's gravity keeps the planets in their orbits.",
    difficulty: "Easy",
  },
];

const styles = {
  panel: {
    background: "linear-gradient(145deg, #141e3b, #0b1022)",
    border: "1px solid #2a385d",
    borderRadius: 18,
    padding: 22,
  } as const,
  button: {
    width: "100%",
    textAlign: "left" as const,
    padding: "14px 16px",
    borderRadius: 12,
    border: "1px solid #344467",
    background: "#111b32",
    color: "#f4f6ff",
    cursor: "pointer",
    fontSize: 14,
    lineHeight: 1.5,
  } as const,
};

export default function SpaceQuizArena() {
  const [difficulty, setDifficulty] = useState<"All" | Question["difficulty"]>("All");
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);
  const [finished, setFinished] = useState(false);
  const [started, setStarted] = useState(false);

  function startQuiz(level = difficulty) {
    const pool =
      level === "All"
        ? questions
        : questions.filter((question) => question.difficulty === level);

    const shuffled = [...pool].sort(() => Math.random() - 0.5);

    setQuizQuestions(shuffled);
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setTimeLeft(20);
    setFinished(false);
    setDifficulty(level);
    setStarted(true);
  }

  function nextQuestion() {
    if (current + 1 >= quizQuestions.length) {
      setFinished(true);
      return;
    }

    setCurrent((value) => value + 1);
    setSelected(null);
    setTimeLeft(20);
  }

  function chooseAnswer(index: number) {
    if (selected !== null || finished) return;

    setSelected(index);

    if (index === quizQuestions[current].answer) {
      setScore((value) => value + 1);
    }
  }

  useEffect(() => {
    if (!started || finished || selected !== null) return;

    const timer = window.setTimeout(() => {
      if (timeLeft <= 1) {
        setTimeLeft(0);
        setSelected(-1);
      } else {
        setTimeLeft((value) => value - 1);
      }
    }, 1000);

    return () => window.clearTimeout(timer);
  }, [started, finished, selected, timeLeft]);

  const question = quizQuestions[current];
  const answered = selected !== null;
  const percentage = quizQuestions.length
    ? Math.round((score / quizQuestions.length) * 100)
    : 0;

  return (
    <section
      id="space-quiz"
      style={{
        padding: "64px 20px",
        background:
          "radial-gradient(ellipse at top, #1b2550 0%, #090e20 60%, #050711 100%)",
        color: "#f4f6ff",
      }}
    >
      <div style={{ maxWidth: 850, margin: "0 auto" }}>
        <header style={{ textAlign: "center", marginBottom: 32 }}>
          <p
            style={{
              color: "#9abaff",
              fontSize: 12,
              letterSpacing: 4,
              fontWeight: 700,
            }}
          >
            TEST YOUR COSMIC KNOWLEDGE
          </p>
          <h2
            style={{
              fontSize: "clamp(32px, 5vw, 48px)",
              margin: "12px 0",
            }}
          >
            🚀 Space Quiz Arena
          </h2>
          <p style={{ color: "#b6c3e1", lineHeight: 1.7 }}>
            One universe. Twelve questions. How much do you know?
          </p>
        </header>

        {!started ? (
          <div style={styles.panel}>
            <h3 style={{ fontSize: 22, marginTop: 0 }}>Choose your difficulty</h3>
            <p style={{ color: "#b6c3e1", fontSize: 14 }}>
              Har question ke liye 20 seconds milenge.
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
                gap: 10,
                margin: "24px 0",
              }}
            >
              {(["All", "Easy", "Medium", "Hard"] as const).map((level) => (
                <button
                  key={level}
                  onClick={() => setDifficulty(level)}
                  style={{
                    padding: 13,
                    borderRadius: 12,
                    border:
                      difficulty === level
                        ? "1px solid #90b4ff"
                        : "1px solid #344467",
                    background:
                      difficulty === level ? "#263c68" : "#10182c",
                    color: "#ffffff",
                    cursor: "pointer",
                    fontWeight: 600,
                  }}
                >
                  {level === "All" ? "🌌 All Levels" : level}
                </button>
              ))}
            </div>

            <button
              onClick={() => startQuiz()}
              style={{
                width: "100%",
                padding: 15,
                borderRadius: 12,
                border: 0,
                background: "linear-gradient(90deg, #4778ee, #8059ed)",
                color: "white",
                fontWeight: 700,
                cursor: "pointer",
                fontSize: 15,
              }}
            >
              Start Mission →
            </button>
          </div>
        ) : finished ? (
          <div style={{ ...styles.panel, textAlign: "center" }}>
            <div style={{ fontSize: 55 }}>
              {percentage >= 80 ? "🏆" : percentage >= 50 ? "🛰️" : "🌠"}
            </div>
            <h3 style={{ fontSize: 30, marginBottom: 8 }}>
              {percentage >= 80
                ? "Cosmic Genius!"
                : percentage >= 50
                  ? "Mission Accomplished!"
                  : "Keep Exploring!"}
            </h3>
            <p style={{ color: "#b6c3e1" }}>Mission complete. Here is your result.</p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 10,
                margin: "28px 0",
              }}
            >
              {[
                { label: "Score", value: `${score}/${quizQuestions.length}` },
                { label: "Accuracy", value: `${percentage}%` },
                { label: "Wrong / Missed", value: `${quizQuestions.length - score}` },
              ].map((item) => (
                <div
                  key={item.label}
                  style={{
                    background: "#10182d",
                    borderRadius: 12,
                    padding: "18px 8px",
                  }}
                >
                  <div style={{ fontSize: 22, fontWeight: 700 }}>{item.value}</div>
                  <div style={{ color: "#a9b8d9", fontSize: 12, marginTop: 7 }}>
                    {item.label}
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => startQuiz()}
              style={{
                ...styles.button,
                textAlign: "center",
                background: "#315fd4",
                border: 0,
                fontWeight: 700,
              }}
            >
              ↻ Play Again
            </button>
            <button
              onClick={() => {
                setStarted(false);
                setFinished(false);
                setSelected(null);
              }}
              style={{
                ...styles.button,
                textAlign: "center",
                marginTop: 10,
              }}
            >
              Change Difficulty
            </button>
          </div>
        ) : question ? (
          <div style={styles.panel}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 10,
                color: "#b7c4e2",
                fontSize: 13,
              }}
            >
              <span>
                QUESTION {current + 1} / {quizQuestions.length}
              </span>
              <span>⭐ Score: {score}</span>
              <span style={{ color: timeLeft <= 5 ? "#ff8888" : "#a9c5ff" }}>
                ⏱️ {timeLeft}s
              </span>
            </div>

            <div
              style={{
                height: 5,
                background: "#263451",
                borderRadius: 10,
                overflow: "hidden",
                margin: "17px 0 26px",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${((current + 1) / quizQuestions.length) * 100}%`,
                  background: "linear-gradient(90deg, #568cff, #a18aff)",
                  transition: "width 0.2s",
                }}
              />
            </div>

            <span
              style={{
                display: "inline-block",
                background: "#25395f",
                color: "#c6d8ff",
                padding: "5px 10px",
                borderRadius: 20,
                fontSize: 12,
              }}
            >
              {question.difficulty}
            </span>

            <h3
              style={{
                fontSize: "clamp(20px, 4vw, 27px)",
                lineHeight: 1.5,
                margin: "18px 0 23px",
              }}
            >
              {question.question}
            </h3>

            <div style={{ display: "grid", gap: 11 }}>
              {question.options.map((option, index) => {
                let background = "#111b32";
                let border = "1px solid #344467";

                if (answered && index === question.answer) {
                  background = "#123c32";
                  border = "1px solid #35c997";
                } else if (answered && index === selected) {
                  background = "#46232e";
                  border = "1px solid #ef7182";
                }

                return (
                  <button
                    key={option}
                    disabled={answered}
                    onClick={() => chooseAnswer(index)}
                    style={{
                      ...styles.button,
                      background,
                      border,
                      cursor: answered ? "default" : "pointer",
                      opacity: answered && index !== question.answer && index !== selected ? 0.65 : 1,
                    }}
                  >
                    <span style={{ color: "#9fb7eb", marginRight: 12 }}>
                      {["A", "B", "C", "D"][index]}.
                    </span>
                    {option}
                    {answered && index === question.answer ? "  ✓" : ""}
                    {answered && index === selected && index !== question.answer ? "  ✗" : ""}
                  </button>
                );
              })}
            </div>

            {answered && (
              <div
                style={{
                  marginTop: 20,
                  padding: 16,
                  borderRadius: 12,
                  background: "#10182c",
                  border: "1px solid #293b60",
                }}
              >
                <strong style={{ color: selected === question.answer ? "#61e0b5" : "#ffb1ba" }}>
                  {selected === -1
                    ? "⏰ Time's up!"
                    : selected === question.answer
                      ? "✓ Correct answer!"
                      : "✗ Not quite!"}
                </strong>
                <p style={{ color: "#c1cce3", fontSize: 14, lineHeight: 1.6 }}>
                  {question.explanation}
                </p>
                <button
                  onClick={nextQuestion}
                  style={{
                    ...styles.button,
                    textAlign: "center",
                    background: "#315fd4",
                    border: 0,
                    fontWeight: 700,
                    marginTop: 5,
                  }}
                >
                  {current + 1 === quizQuestions.length
                    ? "View Final Results →"
                    : "Next Question →"}
                </button>
              </div>
            )}

            <button
              onClick={() => {
                setStarted(false);
                setSelected(null);
              }}
              style={{
                marginTop: 18,
                background: "transparent",
                color: "#aebbd7",
                border: 0,
                cursor: "pointer",
                padding: 6,
              }}
            >
              Exit quiz
            </button>
          </div>
        ) : null}

        <p
          style={{
            textAlign: "center",
            color: "#8291b2",
            fontSize: 12,
            marginTop: 25,
          }}
        >
          STARSCOPE • EXPLORE THE UNIVERSE, ONE QUESTION AT A TIME
        </p>
      </div>
    </section>
  );
}
