import { createSlice } from "@reduxjs/toolkit";

const COUNTER_STATE = Object.freeze({
  ALPHA: "ALPHA",
  PULSE: "PULSE",
  NOVA: "NOVA",
});

const countSlice = createSlice({
  name: "count",
  initialState: [
    {
      id: 1,
      label: COUNTER_STATE.ALPHA,
      name: "Alpha",
      value: 12,
      accent: "#6366f1",
      bg: "#eef2ff",
      icon: "◈",
    },
    {
      id: 2,
      label: COUNTER_STATE.PULSE,
      name: "Pulse",
      value: 8,
      accent: "#ec4899",
      bg: "#fdf2f8",
      icon: "⬢",
    },
    {
      id: 3,
      label: COUNTER_STATE.NOVA,
      name: "Nova",
      value: 24,
      accent: "#06b6d4",
      bg: "#ecfeff",
      icon: "✦",
    },
  ],
  reducers: {
    
    increment: (state, action) => {
      const counter = state.find((c) => c.label === action.payload);
      if (counter) {
        counter.value += 1;
      }
    },
    decrement: (state, action) => {
      const counter = state.find((c) => c.label === action.payload);
      if (counter) {
        counter.value -= 1;
      }
    },
  },
});

export const { increment, decrement } = countSlice.actions;
export default countSlice.reducer;
