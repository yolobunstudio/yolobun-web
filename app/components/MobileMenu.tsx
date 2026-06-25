"use client";

type Props = {
  open: boolean;
  onToggle: () => void;
  goTo: (id: string) => void;
  onStoreOpen: () => void;
};

export default function MobileMenu({ open, onToggle, goTo, onStoreOpen }: Props) {
  return (
    <>
      <button
        className="mobile-menu-btn"
        onClick={onToggle}
        aria-label="Menu"
        style={{
          position: "fixed", top: 18, right: 18, zIndex: 200,
          background: "none", border: "none", cursor: "pointer",
          display: "flex", flexDirection: "column", gap: 5, padding: 6,
        }}
      >
        <span style={{ display: "block", width: 22, height: 1.5, background: "rgba(255,255,255,0.15)", borderRadius: 1, transition: "transform 200ms, opacity 200ms", transform: open ? "translateY(6.5px) rotate(45deg)" : "none" }} />
        <span style={{ display: "block", width: 22, height: 1.5, background: "rgba(255,255,255,0.15)", borderRadius: 1, transition: "opacity 200ms", opacity: open ? 0 : 1 }} />
        <span style={{ display: "block", width: 22, height: 1.5, background: "rgba(255,255,255,0.15)", borderRadius: 1, transition: "transform 200ms, opacity 200ms", transform: open ? "translateY(-6.5px) rotate(-45deg)" : "none" }} />
      </button>

      {open && (
        <div
          className="mobile-menu-overlay"
          style={{
            position: "fixed", inset: 0, zIndex: 150,
            background: "rgba(18,18,18,0.97)",
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            gap: 40,
          }}
          onClick={onToggle}
        >
          {(["home", "team", "about"] as const).map((id) => (
            <a key={id} onClick={() => { onToggle(); goTo(id); }} style={{ color: "rgba(255,255,255,0.6)", fontSize: 13, letterSpacing: "0.3em", textTransform: "uppercase", cursor: "pointer", textDecoration: "none" }}>{id}</a>
          ))}
          <a onClick={() => { onToggle(); onStoreOpen(); }} style={{ color: "rgba(255,255,255,0.6)", fontSize: 13, letterSpacing: "0.3em", textTransform: "uppercase", cursor: "pointer", textDecoration: "none" }}>store</a>
        </div>
      )}
    </>
  );
}
