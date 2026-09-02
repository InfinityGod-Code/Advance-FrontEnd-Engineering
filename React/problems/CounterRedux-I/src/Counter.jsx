import {useSelector,useDispatch} from 'react-redux'
import {increment,decrement} from './count_redux'

function Counter() {
    const count = useSelector((state) => state.count)     
    const dispatch = useDispatch()

  return (
    <div style={s.page}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@500;700;800&family=JetBrains+Mono:wght@700&display=swap');`}</style>

      <div style={s.shell}>
        <div style={s.header}>
          <div style={s.headerLeft}>
            <div style={s.logo}>◈</div>
            <div>
              <h1 style={s.title}>Counter Dashboard</h1>
              <p style={s.subtitle}>Manage your counts with precision — beautiful, minimal & fast</p>
            </div>
          </div>
          <div style={s.headerRight}>
            <span style={s.liveDot} />
            <span style={s.liveText}>Live sync</span>
            <span style={s.totalPill}>Total <b style={{ color: "#111827" }}>44</b></span>
          </div>
        </div>

        <div style={s.grid}>
          {count.map((c) => (
            <div key={c.id} style={{ ...s.card, borderTop: `4px solid ${c.accent}` }}>
              <div style={s.cardTop}>
                <div style={{ ...s.iconBox, background: c.bg, color: c.accent, border: `1px solid ${c.accent}18` }}>{c.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={s.cardLabel}>{c.label}</div>
                  <div style={s.cardName}>{c.name}</div>
                </div>
                <span style={{ ...s.badge, background: `${c.accent}14`, color: c.accent, border: `1px solid ${c.accent}22` }}>Active</span>
              </div>

              <div style={s.valueWrap}>
                <div style={{ ...s.value, color: c.accent }}>{String(c.value).padStart(2, "0")}</div>
                <div style={s.valueSub}>current value</div>
              </div>

              <div style={s.divider} />

              <div style={s.actions}>
                <button onClick={() => dispatch(decrement(c.label))} type="button" style={s.btnDec} aria-label="Decrement">
                  <span style={s.btnIcon}>−</span> Decrement
                </button>
                <button onClick={() => dispatch(increment(c.label))} type="button" style={{ ...s.btnInc, background: c.accent, boxShadow: `0 8px 20px ${c.accent}40` }} aria-label="Increment">
                  <span style={s.btnIconInc}>+</span> Increment
                </button>
              </div>

              <button type="button" style={s.btnRedo} aria-label="Redo">
                <span style={s.redoIcon}>↻</span> Redo
              </button>
            </div>
          ))}
        </div>

        
      </div>
    </div>
  )
}

const s = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg,#f8fafc 0%,#eef2ff 45%,#fdf2f8 100%)",
    display: "flex",
    justifyContent: "center",
    padding: "36px 16px",
    boxSizing: "border-box",
  },
  shell: {
    width: "100%",
    maxWidth: 1080,
  },
  header: {
    background: "#ffffff",
    borderRadius: 20,
    padding: "18px 22px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 16,
    boxShadow: "0 4px 24px rgba(15,23,42,0.06), 0 1px 3px rgba(15,23,42,0.08)",
    border: "1px solid #e2e8f0",
    marginBottom: 22,
  },
  headerLeft: { display: "flex", alignItems: "center", gap: 14 },
  logo: {
    width: 44,
    height: 44,
    borderRadius: 12,
    background: "#111827",
    color: "#fff",
    display: "grid",
    placeItems: "center",
    fontSize: 18,
    fontWeight: 800,
  },
  title: {
    margin: 0,
    fontFamily: "Inter,sans-serif",
    fontSize: 18,
    fontWeight: 800,
    color: "#0f172a",
    letterSpacing: "-0.02em",
    lineHeight: 1,
  },
  subtitle: {
    margin: "4px 0 0",
    fontFamily: "Inter,sans-serif",
    fontSize: 12.5,
    color: "#64748b",
    fontWeight: 500,
  },
  headerRight: { display: "flex", alignItems: "center", gap: 10 },
  liveDot: { width: 8, height: 8, borderRadius: 999, background: "#10b981", boxShadow: "0 0 0 4px #10b98122" },
  liveText: { fontFamily: "Inter,sans-serif", fontSize: 12, fontWeight: 700, color: "#334155" },
  totalPill: {
    marginLeft: 6,
    background: "#f1f5f9",
    border: "1px solid #e2e8f0",
    borderRadius: 999,
    padding: "6px 12px",
    fontFamily: "Inter,sans-serif",
    fontSize: 12,
    color: "#64748b",
    fontWeight: 600,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px,1fr))",
    gap: 18,
  },
  card: {
    background: "#ffffff",
    borderRadius: 20,
    padding: "22px 20px 18px",
    boxShadow: "0 8px 30px rgba(15,23,42,0.07), 0 1px 4px rgba(15,23,42,0.06)",
    border: "1px solid #e2e8f0",
    display: "flex",
    flexDirection: "column",
    gap: 14,
  },
  cardTop: { display: "flex", alignItems: "center", gap: 12 },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    display: "grid",
    placeItems: "center",
    fontSize: 16,
    fontWeight: 800,
  },
  cardLabel: { fontFamily: "Inter,sans-serif", fontSize: 10, fontWeight: 800, letterSpacing: "0.08em", color: "#94a3b8", textTransform: "uppercase" },
  cardName: { fontFamily: "Inter,sans-serif", fontSize: 15, fontWeight: 800, color: "#0f172a", marginTop: 1 },
  badge: { fontFamily: "Inter,sans-serif", fontSize: 10, fontWeight: 800, padding: "5px 9px", borderRadius: 999, letterSpacing: "0.04em" },
  valueWrap: { textAlign: "center", padding: "6px 0 2px" },
  value: { fontFamily: "JetBrains Mono,monospace", fontSize: 54, fontWeight: 700, lineHeight: 1, letterSpacing: "-0.04em" },
  valueSub: { fontFamily: "Inter,sans-serif", fontSize: 11, color: "#94a3b8", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", marginTop: 6 },
  divider: { height: 1, background: "#f1f5f9", margin: "2px 0" },
  actions: { display: "flex", gap: 10 },
  btnDec: {
    flex: 1,
    height: 42,
    borderRadius: 12,
    border: "1.5px solid #e2e8f0",
    background: "#fff",
    color: "#334155",
    fontFamily: "Inter,sans-serif",
    fontSize: 13,
    fontWeight: 700,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  btnInc: {
    flex: 1,
    height: 42,
    borderRadius: 12,
    border: "none",
    color: "#fff",
    fontFamily: "Inter,sans-serif",
    fontSize: 13,
    fontWeight: 700,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  btnIcon: { fontSize: 16, fontWeight: 700, lineHeight: 1 },
  btnIconInc: { width: 18, height: 18, borderRadius: 999, background: "rgba(255,255,255,0.22)", display: "grid", placeItems: "center", fontSize: 13 },
  btnRedo: {
    height: 40,
    borderRadius: 12,
    border: "1px dashed #cbd5e1",
    background: "#f8fafc",
    color: "#475569",
    fontFamily: "Inter,sans-serif",
    fontSize: 13,
    fontWeight: 700,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
  },
  redoIcon: { fontSize: 14 },
}

export default Counter
