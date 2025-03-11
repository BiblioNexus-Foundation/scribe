import React = require("react");

const CommonView: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.9)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-evenly",
        zIndex: 9999,
        textAlign: "center",
        padding: "20px",
      }}
    >
      <div>
        <p className="font-bold text-center text-5xl">
          <span className="" style={{ color: "white" }}>Welcome to </span>
          <span className="text-cyan-500">Scribe 2.0</span>
        </p>
        <p className="text-cyan-300 text-center mt-5 tracking-wide text-xl leading-6 font-normal">
          Scripture editing made simple
        </p>

      </div>
      <div style={{ display: "flex", gap: "20px", marginBottom: "40px" }}>
        <div
          style={{
            width: "200px",
            height: "150px",
            backgroundColor: "#222",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "10px",
            cursor: "pointer",
            transition: "transform 0.2s, background 0.3s",
            fontSize: "18px",
            fontWeight: "bold",
            border: "2px solid #fff",
            color: "white",
          }}
          onClick={onClose}
          onMouseOver={(e) => (e.currentTarget.style.background = "#06b6d4")}
          onMouseOut={(e) => (e.currentTarget.style.background = "#222")}
        >
          CONTINUE
        </div>
        <div
          style={{
            width: "200px",
            height: "150px",
            backgroundColor: "#222",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "10px",
            cursor: "pointer",
            transition: "transform 0.2s, background 0.3s",
            fontSize: "18px",
            fontWeight: "bold",
            border: "2px solid #fff",
            color: "white",
          }}
          onMouseOver={(e) => (e.currentTarget.style.background = "#06b6d4")}
          onMouseOut={(e) => (e.currentTarget.style.background = "#222")}
        >
          OPEN PROJECT
        </div>

        <div
          style={{
            width: "200px",
            height: "150px",
            backgroundColor: "#222",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "10px",
            cursor: "pointer",
            transition: "transform 0.2s, background 0.3s",
            fontSize: "18px",
            fontWeight: "bold",
            border: "2px solid #fff",
            color: "white",
          }}
          onMouseOver={(e) => (e.currentTarget.style.background = "#06b6d4")}
          onMouseOut={(e) => (e.currentTarget.style.background = "#222")}
        >
          NEW PROJECT
        </div>
      </div>
    </div>
  );
};

export default CommonView;
