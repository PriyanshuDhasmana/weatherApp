import { useState, useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { motion } from "framer-motion";
import { WiDaySunny, WiRain, WiCloud, WiSnow, WiThunderstorm } from "react-icons/wi";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    setError(""); setWeather(null);
    try {
      const res = await fetch(`http://localhost:5000/api/weather?city=${city}`);
      const data = await res.json();
      if (data.error) setError(data.error);
      else setWeather(data);
    } catch {
      setError("Failed to fetch weather");
    }
  };

  const particlesInit = useCallback(async (main) => { await loadFull(main); }, []);

  const getBg = () => {
    if (!weather) return ["#00c6ff", "#0072ff"];
    const type = weather.weather[0].main.toLowerCase();
    if (type.includes("rain")) return ["#0f2027", "#203a43"];
    if (type.includes("cloud")) return ["#485563", "#29323c"];
    if (type.includes("clear")) return ["#2980b9", "#6dd5fa"];
    if (type.includes("snow")) return ["#83a4d4", "#b6fbff"];
    if (type.includes("thunder")) return ["#141E30", "#243B55"];
    return ["#373B44", "#4286f4"];
  };

  const getIcon = () => {
    if (!weather) return <WiDaySunny size={100} />;
    const type = weather.weather[0].main.toLowerCase();
    if (type.includes("rain")) return <WiRain size={100} />;
    if (type.includes("cloud")) return <WiCloud size={100} />;
    if (type.includes("clear")) return <WiDaySunny size={100} />;
    if (type.includes("snow")) return <WiSnow size={100} />;
    if (type.includes("thunder")) return <WiThunderstorm size={100} />;
    return <WiDaySunny size={100} />;
  };

  const bg = getBg();

  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: `linear-gradient(135deg, ${bg[0]}, ${bg[1]})`,
        color: "white",
        fontFamily: "'Poppins', sans-serif",
        overflow: "hidden",
      }}
    >
      {/* Particle Background */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          fullScreen: { enable: false },
          background: { color: { value: "transparent" } },
          fpsLimit: 60,
          particles: {
            number: { value: 60 },
            color: { value: "#ffffff" },
            links: { enable: true, distance: 120, color: "#ffffff", opacity: 0.15 },
            move: { enable: true, speed: 1 },
            opacity: { value: 0.5 },
            size: { value: 2 },
          },
        }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      />

      {/* Weather Card */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        style={{
          position: "relative",
          zIndex: 10,
          background: "rgba(255, 255, 255, 0.1)",
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
          backdropFilter: "blur(10px)",
          borderRadius: "20px",
          padding: "40px 50px",
          textAlign: "center",
          minWidth: "340px",
          marginBottom: "40px",
        }}
      >
        <h1 style={{ fontSize: "2rem", marginBottom: "15px" }}>🌤️ Weather Info</h1>

        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city..."
          style={{
            padding: "10px 14px",
            borderRadius: "10px",
            border: "none",
            width: "180px",
            marginRight: "10px",
            outline: "none",
          }}
        />
        <button
          onClick={fetchWeather}
          style={{
            padding: "10px 18px",
            borderRadius: "10px",
            border: "none",
            background: "#fff",
            color: "#333",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          Get
        </button>

        {error && <p style={{ color: "#ffb3b3", marginTop: 10 }}>{error}</p>}

        {weather && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            style={{ marginTop: 25 }}
          >
            <div style={{ fontSize: "1.6rem", fontWeight: "700" }}>{weather.name}</div>
            <div style={{ marginTop: 10 }}>{getIcon()}</div>
            <div style={{ fontSize: "1.2rem", textTransform: "capitalize" }}>
              {weather.weather[0].description}
            </div>
            <div style={{ marginTop: 10, fontSize: "1.8rem", fontWeight: "600" }}>
              🌡️ {weather.main.temp} °C
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Footer */}
      <footer
        style={{
          position: "absolute",
          bottom: 10,
          zIndex: 10,
          color: "rgba(255,255,255,0.8)",
          fontSize: "0.9rem",
          textAlign: "center",
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(6px)",
          borderRadius: "12px",
          padding: "8px 20px",
        }}
      >
        Made with ❤️ by <b>Priyanshu Dhasmana</b> & ChatGPT :D —{" "}
        <a
          href="https://priyanshudhasmana.netlify.app"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#fff", textDecoration: "underline", marginLeft: 4 }}
        >
          Visit my portfolio
        </a>
      </footer>
    </div>
  );
}

export default App;
