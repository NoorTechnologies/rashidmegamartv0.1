import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Rashid Mega Mart — Grocery Kits and Daily Essentials";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "54px 64px",
          background: "linear-gradient(135deg, #FFFCF5 0%, #F3E8D5 100%)",
          color: "#202124",
          fontFamily: "Arial, sans-serif",
          position: "relative",
        }}
      >
        <div style={{ position: "absolute", right: -80, top: -130, width: 470, height: 470, borderRadius: 240, background: "#E8EEDB", opacity: 0.85 }} />
        <div style={{ position: "absolute", right: 50, bottom: 50, width: 340, height: 340, borderRadius: 180, background: "#F1DFC2", opacity: 0.75 }} />
        <div style={{ display: "flex", alignItems: "center", gap: 22, zIndex: 1 }}>
          <div style={{ width: 82, height: 82, borderRadius: 24, background: "#800020", display: "flex", alignItems: "center", justifyContent: "center", color: "#F7C928", fontSize: 48, fontWeight: 900 }}>R</div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 48, fontWeight: 900, color: "#800020", lineHeight: 1.05 }}>Rashid</div>
            <div style={{ fontSize: 42, fontWeight: 900, color: "#168447", lineHeight: 1.1 }}>Mega Mart</div>
          </div>
          <div style={{ marginLeft: "auto", background: "#800020", color: "white", borderRadius: 24, padding: "18px 28px", fontSize: 18, fontWeight: 800, letterSpacing: 1 }}>SMART SHOPPING • BETTER LIVING</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", zIndex: 1 }}>
          <div style={{ display: "flex", flexDirection: "column", maxWidth: 610 }}>
            <div style={{ fontSize: 64, fontWeight: 900, color: "#800020", lineHeight: 1.08 }}>Your One-Stop</div>
            <div style={{ fontSize: 57, fontWeight: 900, color: "#168447", lineHeight: 1.12 }}>Grocery Destination</div>
            <div style={{ marginTop: 24, fontSize: 26, fontWeight: 700 }}>Buy Fresh  •  Save More  •  Live Better</div>
            <div style={{ display: "flex", gap: 14, marginTop: 30 }}>
              {["Premium Quality", "Best Prices", "Daily Essentials"].map((label) => (
                <div key={label} style={{ background: "#FFFEFA", border: "2px solid #E7DAC4", borderRadius: 16, padding: "13px 18px", fontSize: 17, fontWeight: 800 }}>{label}</div>
              ))}
            </div>
          </div>
          <div style={{ width: 390, height: 340, borderRadius: 34, background: "#800020", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", boxShadow: "0 22px 50px rgba(70,20,20,.18)", transform: "rotate(3deg)" }}>
            <div style={{ display: "flex", gap: 12, fontSize: 76 }}>🍎 🍋 🥬</div>
            <div style={{ marginTop: 20, width: 290, height: 112, borderRadius: "18px 18px 48px 48px", background: "#F7C928", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 30, fontWeight: 900, color: "#800020" }}>GROCERY KITS</div>
            <div style={{ marginTop: 16, color: "#FFF4E4", fontSize: 19, fontWeight: 800, letterSpacing: 2 }}>FRESH • VALUE • TRUST</div>
          </div>
        </div>
        <div style={{ zIndex: 1, background: "#168447", color: "white", borderRadius: 16, padding: "15px 24px", display: "flex", justifyContent: "center", fontSize: 19, fontWeight: 800, letterSpacing: 1.2 }}>QUALITY PRODUCTS  •  GREAT VALUE  •  TRUSTED SERVICE</div>
      </div>
    ),
    { ...size },
  );
}
