# 🔢 Counter Redux Dashboard

<table>
  <tr>
    <td><strong>Difficulty</strong></td><td>Medium</td>
    <td><strong>Max Score</strong></td><td>100</td>
    <td><strong>Success Rate</strong></td><td>88%</td>
  </tr>
</table>

> **Topic:** React · Redux Toolkit · Global State Management
> **Stack:** React 19 + Redux Toolkit + Vite
> **Files to edit:** `src/count_redux.js`, `src/Counter.jsx` (UI already provided, wire logic only)

---

## 📋 Problem Statement

You are building a **Counter Dashboard** powered by **Redux Toolkit**. The dashboard displays **three independent counters** — **Alpha**, **Pulse**, and **Nova** — each with its own value and visual theme. Users can **increment** or **decrement** any counter individually. All counters live in a single Redux slice and the UI reads from the Redux store — no local `useState` for counts.

Your job is to:

1. Define the Redux slice correctly so the initial state renders on load.
2. Implement `increment`/`decrement` reducers that update the correct counter by its `label`.
3. Wire the dashboard UI in `Counter.jsx` to `useSelector`/`useDispatch` so buttons reflect and mutate the store.

> The beautiful dashboard UI (cards, gradients, icons) is already built — you only implement the **state logic + wiring**.

---

## 🧾 Component & Store Specification

### Initial State

The slice `count` must initialize as an **array of 3 objects** (exact values — do **not** change):

```js
const COUNTER_STATE = Object.freeze({
  ALPHA: "ALPHA",
  PULSE: "PULSE",
  NOVA:  "NOVA",
});

const initialState = [
  { id: 1, label: COUNTER_STATE.ALPHA, name: "Alpha", value: 12, accent: "#6366f1", bg: "#eef2ff", icon: "◈" },
  { id: 2, label: COUNTER_STATE.PULSE, name: "Pulse", value:  8, accent: "#ec4899", bg: "#fdf2f8", icon: "⬢" },
  { id: 3, label: COUNTER_STATE.NOVA,  name: "Nova",  value: 24, accent: "#06b6d4", bg: "#ecfeff", icon: "✦" },
];
```

Slice name must be `"count"` and be registered as:

```js
// src/store.js
import countReducer from './count_redux'
configureStore({ reducer: { count: countReducer } })
```

Root state shape is therefore `{ count: [...] }`.

### Reducers

| Action | Payload | Description |
| --- | --- | --- |
| `increment` | `label: string` (one of `COUNTER_STATE` values) | Find counter where `c.label === payload` and `c.value += 1` |
| `decrement` | `label: string` | Find counter where `c.label === payload` and `c.value -= 1` |

> Use Immer mutation inside `createSlice` — e.g. `const counter = state.find(...)` then `counter.value += 1`. Guard against missing counter.

Export: `export const { increment, decrement } = countSlice.actions`

### Counter.jsx — Wiring

```jsx
import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement } from './count_redux'

function Counter() {
  const count = useSelector((state) => state.count) // ← array of 3
  const dispatch = useDispatch()
  // count.map(c => (
  //   <div key={c.id}>
  //     <span>{c.value}</span>
  //     <button onClick={() => dispatch(decrement(c.label))}>Decrement</button>
  //     <button onClick={() => dispatch(increment(c.label))}>Increment</button>
  //     <button>Redo</button> // UI only, no logic required
  //   </div>
  // ))
}
```

**UI requirements (already styled):**
- 3 cards in a responsive grid (`gridTemplateColumns: repeat(auto-fit, minmax(300px,1fr))`)
- Each card shows `icon`, `label`, `name`, padded `value` (`String(c.value).padStart(2,"0")`), Increment/Decrement buttons and a **Redo** button (decorative — no dispatch needed)
- Header shows title `Counter Dashboard` and a Total pill
- Full-screen gradient background: `linear-gradient(135deg,#f8fafc 0%,#eef2ff 45%,#fdf2f8 100%)`

---

## 🔧 Reference Implementation (Logic)

```js
// src/count_redux.js
import { createSlice } from '@reduxjs/toolkit'

const countSlice = createSlice({
  name: 'count',
  initialState: [ /* 3 objects above */ ],
  reducers: {
    increment: (state, action) => {
      const counter = state.find(c => c.label === action.payload)
      if (counter) counter.value += 1
    },
    decrement: (state, action) => {
      const counter = state.find(c => c.label === action.payload)
      if (counter) counter.value -= 1
    },
  },
})
```

```jsx
// src/Counter.jsx
const count = useSelector(state => state.count)
// on Increment: dispatch(increment(c.label))
// on Decrement: dispatch(decrement(c.label))
```

> Do **not** use local state for counts. Do **not** mutate state outside Immer. Selector must be `state.count`, not `state`.

---

## ✅ Sample Interaction

**Initial render**

```
Counter Dashboard
Alpha  12  [Decrement] [Increment] [Redo]
Pulse  08  [Decrement] [Increment] [Redo]
Nova   24  [Decrement] [Increment] [Redo]
Total: 44
```

**User clicks `Increment` on Pulse**

```
Pulse  09   Total: 45
```

**User clicks `Decrement` on Alpha twice**

```
Alpha  10   Total: 43
```

---

## 📏 Constraints

- Use **Redux Toolkit only** (`createSlice`, `configureStore`). Do not use `useState` for counter values.
- `initialState` must be the exact 3-element array above with `COUNTER_STATE` enum.
- Reducers must be pure and handle missing `label` gracefully.
- `Counter.jsx` must read via `useSelector(state => state.count)` and dispatch with `c.label` as payload.
- Do not add extra libraries; project ships with `react 19`, `@reduxjs/toolkit`, `react-redux`, `vite`.
- Keep all UI inside `src/Counter.jsx` only — do not modify `App.jsx`/`store.js` wiring beyond required selector fix.

---

## 🚀 How to Run

```bash
cd solution
npm install
npm run dev
```

Then open the printed local URL. Verify:
1. Three counters render with 12 / 08 / 24.
2. Increment/Decrement updates the correct card and re-renders instantly.
3. No console error `count.map is not a function` (selector is correct).

---

## 💡 Hints

- Array state → `state.find` + Immer mutation, not `state.value`.
- Common bug: `useSelector(state => state)` returns `{count:[...]}` — you need `state.count`.
- Full-screen background is constrained by `#root{width:1126px}` — use `width:100vw; margin-left:calc(50% - 50vw)` breakout in `Counter.jsx` if needed.
- Redo button is **UI-only** for this stage — style it with dashed border, no reducer needed.
