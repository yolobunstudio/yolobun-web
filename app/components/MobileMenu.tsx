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
        type="button"
        onClick={onToggle}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="mobile-navigation"
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
          <nav id="mobile-navigation" aria-label="Mobile navigation" className="mobile-menu-links" onClick={(event) => event.stopPropagation()}>
            {(["home", "team", "about"] as const).map((id) => (
              <button key={id} type="button" className="nav-action" onClick={() => { onToggle(); goTo(id); }}>{id}</button>
            ))}
            <button type="button" className="nav-action" onClick={() => { onToggle(); onStoreOpen(); }}>store</button>
          </nav>
        </div>
      )}
    </>
  );
}
