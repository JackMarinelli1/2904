import { useEffect, useState } from "react";

// Inserisci questo tag nel tuo index.html nel <head> per il font:
// <link href="https://fonts.googleapis.com/css2?family=Alfa+Slab+One&display=swap" rel="stylesheet">

const events = [
  { id: 1, name: "Buchiamo una gomma lungo la Route 66", cost: 20 },
  { id: 2, name: "Veniamo fermati dalla polizia", cost: 5 },
  { id: 3, name: "Uno vomita al ristorante", cost: 20 },
  { id: 4, name: "Ci perdiamo nel deserto", cost: 25 },
  { id: 5, name: "Facciamo amicizia con un gruppo di motociclisti", cost: 1 },
  { id: 6, name: "Facciamo amicizia con un senzatetto", cost: 1 },
  { id: 7, name: "Renzo in carcere", cost: 55 },
  { id: 8, name: "Jack in carcere", cost: 55 },
  { id: 9, name: "Marci in carcere", cost: 55 },
  { id: 10, name: "Marci sbronzo", cost: 15 },
];

export default function App() {
  const maxCredits = 100;
  const [nickname, setNickname] = useState("");
  const [entered, setEntered] = useState(false);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    const savedNick = localStorage.getItem("nickname");
    if (savedNick) {
      setNickname(savedNick);
      setEntered(true);
    }
  }, []);

  const handleEnter = () => {
    if (nickname.trim()) {
      localStorage.setItem("nickname", nickname);
      setEntered(true);
    }
  };

  const totalCost = selected.reduce((sum, id) => {
    const ev = events.find((e) => e.id === id);
    return sum + (ev?.cost || 0);
  }, 0);

  const toggleEvent = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]
    );
  };

  const handleReset = () => {
    setSelected([]);
  };

  const fontStyle = {
    fontFamily: "'Alfa Slab One', cursive",
    letterSpacing: "1px",
    textTransform: "uppercase",
  };

  const buttonStyle = {
    padding: "0.7rem 1.2rem",
    backgroundColor: "#ffd700",
    color: "#000",
    fontWeight: "bold",
    border: "2px solid black",
    borderRadius: "8px",
    cursor: "pointer",
    fontFamily: "'Alfa Slab One', cursive",
    textTransform: "uppercase",
    boxShadow: "2px 2px 0px black",
  };

  const resetStyle = {
    ...buttonStyle,
    backgroundColor: "transparent",
    color: "white",
    border: "2px solid white",
    boxShadow: "none",
  };

  if (!entered) {
    return (
      <div
        style={{
          backgroundImage: 'url("/landing_usa_long.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "black",
          textAlign: "center",
          padding: "1rem",
        }}
      >
        <h1 style={{ ...fontStyle, fontSize: "2.5rem", marginBottom: "1rem" }}>
          FantaRoute66
        </h1>
        <p style={{ marginBottom: "1rem", fontWeight: "bold" }}>
          Scommetti sugli imprevisti. Vivi il viaggio. Vinci la gloria.
        </p>
        <input
          type="text"
          placeholder="Inserisci il tuo nickname"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          style={{
            padding: "0.5rem",
            borderRadius: "5px",
            border: "1px solid #000",
            width: "200px",
            marginBottom: "1rem",
            fontWeight: "bold",
          }}
        />
        <button onClick={handleEnter} style={buttonStyle}>
          Entra nel gioco
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundImage: 'url("/landing_usa_long.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        padding: "2rem",
        position: "relative",
        color: "white",
      }}
    >
      {/* Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.6)",
          zIndex: 0,
        }}
      ></div>

      <div style={{ position: "relative", zIndex: 1 }}>
        <h1 style={{ ...fontStyle, fontSize: "2rem" }}>FantaRoute66</h1>
        <p>
          Ciao <strong>{nickname}</strong>! Hai <strong>{maxCredits}</strong>{" "}
          crediti. Scommetti sugli imprevisti!
        </p>

        <p style={{ margin: "1rem 0", fontWeight: "bold" }}>
          Crediti usati: {totalCost} / {maxCredits} <br />
          Residui: {maxCredits - totalCost}
        </p>

        {totalCost >= maxCredits && (
          <p style={{ color: "#ffd700", fontWeight: "bold" }}>
            Hai usato tutti i tuoi crediti!
          </p>
        )}

        <div>
          {events.map((event) => {
            const isSelected = selected.includes(event.id);
            const disabled = !isSelected && totalCost + event.cost > maxCredits;

            return (
              <div
                key={event.id}
                onClick={() => !disabled && toggleEvent(event.id)}
                style={{
                  opacity: disabled ? 0.4 : 1,
                  cursor: disabled ? "not-allowed" : "pointer",
                  border: `2px solid ${isSelected ? "#ffd700" : "white"}`,
                  marginBottom: "1rem",
                  padding: "1rem",
                  borderRadius: "10px",
                  backgroundColor: "rgba(255,255,255,0.1)",
                  fontWeight: "bold",
                  fontSize: "1rem",
                }}
              >
                {event.name} — <span style={{ color: "#ffd700" }}>{event.cost} crediti</span>
              </div>
            );
          })}
        </div>

        {selected.length > 0 && (
          <div style={{ marginTop: "1.5rem" }}>
            <h3 style={{ ...fontStyle }}>Eventi selezionati:</h3>
            <ul>
              {selected.map((id) => {
                const ev = events.find((e) => e.id === id);
                return (
                  <li key={id}>
                    {ev.name} ({ev.cost} crediti)
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        <div style={{ marginTop: "2rem", display: "flex", gap: "1rem" }}>
          <button
            disabled={totalCost === 0}
            style={{
              ...buttonStyle,
              opacity: totalCost === 0 ? 0.5 : 1,
              cursor: totalCost === 0 ? "not-allowed" : "pointer",
            }}
          >
            Conferma selezione
          </button>
          <button onClick={handleReset} style={resetStyle}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
