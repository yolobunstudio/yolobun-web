"use client";

import { useState } from "react";

const STORE_PASSWORD = "yolobun";

type Props = {
  onClose: () => void;
};

export default function StoreOverlay({ onClose }: Props) {
  const [unlocked, setUnlocked] = useState(false);
  const [pwInput, setPwInput] = useState("");
  const [pwError, setPwError] = useState(false);

  const submitPw = (e: React.FormEvent) => {
    e.preventDefault();
    if (pwInput.trim().toLowerCase() === STORE_PASSWORD) {
      setUnlocked(true);
      setPwError(false);
    } else {
      setPwError(true);
    }
  };

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 90, background: "#000", color: "#fff", overflowY: "auto", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "96px 24px", fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
      <button onClick={onClose} style={{ position: "absolute", top: 18, left: 24, background: "transparent", border: "none", color: "rgba(255,255,255,0.45)", fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase", cursor: "pointer" }}>← back</button>
      <h2 style={{ margin: "0 0 40px", fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>The Store</h2>

      {!unlocked ? (
        <div style={{ width: "100%", maxWidth: 380, textAlign: "center", animation: pwError ? "shake 400ms" : undefined }}>
          <div style={{ margin: "0 auto 28px", width: 56, position: "relative" }}>
            <div style={{ width: 34, height: 24, margin: "0 auto -2px", border: "3px solid rgba(255,255,255,0.35)", borderBottom: "none", borderRadius: "18px 18px 0 0" }} />
            <div style={{ width: 56, height: 46, borderRadius: 12, border: "1px solid rgba(255,255,255,0.2)", background: "#111", display: "grid", placeItems: "center" }}>
              <div style={{ width: 6, height: 6, borderRadius: 999, background: "rgba(255,255,255,0.5)" }} />
            </div>
          </div>
          <p style={{ margin: "0 0 10px", fontSize: "clamp(26px, 5vw, 40px)", fontWeight: 500, lineHeight: 1.1 }}>members only</p>
          <p style={{ margin: "0 0 28px", fontSize: 15, lineHeight: 1.6, color: "rgba(255,255,255,0.45)" }}>merch drops are locked for now. got the password?</p>
          <form onSubmit={submitPw} style={{ display: "flex", gap: 8, justifyContent: "center" }}>
            <input
              type="password"
              value={pwInput}
              onChange={(e) => { setPwInput(e.target.value); setPwError(false); }}
              placeholder="enter password"
              autoComplete="off"
              style={{ flex: 1, minWidth: 0, height: 46, padding: "0 16px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.15)", background: "#0c0c0c", color: "#fff", fontSize: 14, fontFamily: "inherit", outline: "none" }}
            />
            <button type="submit" style={{ height: 46, padding: "0 22px", borderRadius: 10, border: "none", background: "#fff", color: "#000", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }}>unlock</button>
          </form>
          <p style={{ margin: "16px 0 0", minHeight: 18, fontSize: 12, color: pwError ? "rgba(255,120,120,0.9)" : "transparent" }}>nope — that&apos;s not it. try again.</p>
        </div>
      ) : (
        <div style={{ maxWidth: 420, textAlign: "center" }}>
          <p style={{ margin: "0 0 12px", fontSize: "clamp(26px, 5vw, 40px)", fontWeight: 500, lineHeight: 1.1, color: "#fff" }}>you&apos;re in.</p>
          <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: "rgba(255,255,255,0.45)" }}>the shop is being built. first drop coming soon — you&apos;ll be the first to know.</p>
        </div>
      )}
    </div>
  );
}
