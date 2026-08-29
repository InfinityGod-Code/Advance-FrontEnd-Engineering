# 🍓 Fruit Management

<table>
  <tr>
    <td><strong>Difficulty</strong></td><td>Easy</td>
    <td><strong>Max Score</strong></td><td>50</td>
    <td><strong>Success Rate</strong></td><td>92%</td>
  </tr>
</table>

> **Topic:** React State Management · Lists & Conditional Rendering
> **Stack:** React 19 + Vite
> **Files to edit:** `src/App.jsx`

---

## 📋 Problem Statement

You are building the front-end for a small fruit inventory dashboard. The store
keeps track of its fruits using a single list of objects. Each fruit has a
`name` and a boolean `status` indicating whether it is currently **In Stock**
(`true`) or **Out of Stock** (`false`).

Your task is to render two clearly separated panels:

1. **In Stock** — every fruit whose `status` is `true`.
2. **Out of Stock** — every fruit whose `status` is `false`.

Clicking a fruit should **toggle** its availability: an in-stock fruit moves to
the out-of-stock panel, and vice-versa. The move must update the underlying
state so the UI re-renders correctly.

---

## 🧾 Component Specification

Your solution must live in `App.jsx` and export a default React component
`App`.

### Initial Data

The component must initialize its state from the following array (exact
values — do **not** change the data):

```js
const INITIAL_FRUITS = [
  { fruit: 'Apple',     status: true },
  { fruit: 'Grapes',    status: true },
  { fruit: 'PineApple', status: true },
];
```

### State & Behavior

| Requirement | Description |
| --- | --- |
| State | Maintain the fruits in a single `useState` array. |
| Derive lists | Render **In Stock** from items where `status === true` and **Out of Stock** from items where `status === false`. |
| Toggle | Clicking a fruit calls a handler (e.g. `toggleFruitStatus`) that flips that fruit's `status` immutably (use `map`, never mutate). |
| Re-render | After a click, the fruit must disappear from its current panel and appear in the other one. |

### Rendering Rules

- A fruit that is **In Stock** is shown in the "In Stock" panel.
- A fruit that is **Out of Stock** is shown in the "Out of Stock" panel.
- Each fruit must be uniquely keyed (use the fruit `name` as the React `key`).

---

## 🔧 Reference Implementation (Logic)

The expected behavior can be expressed as:

```jsx
function App() {
  const [fruits, setFruits] = useState(INITIAL_FRUITS);

  const toggleFruitStatus = (targetFruit, targetStatus) => {
    setFruits((prevFruits) =>
      prevFruits.map((item) =>
        item.fruit === targetFruit
          ? { ...item, status: targetStatus }
          : item
      )
    );
  };

  // In Stock  = fruits.filter(f => f.status)
  // Out of Stock = fruits.filter(f => !f.status)
  // Clicking an in-stock fruit  => toggleFruitStatus(name, false)
  // Clicking an out-of-stock fruit => toggleFruitStatus(name, true)
}
```

> The visual styling is up to you — make it clean, responsive, and pleasant.
> The grading focuses on **correct state updates and rendering logic**.

---

## ✅ Sample Interaction

**Initial render**

```
In Stock:        Out of Stock:
- Apple          (empty)
- Grapes
- PineApple
```

**User clicks `Grapes`**

```
In Stock:        Out of Stock:
- Apple          - Grapes
- PineApple
```

**User clicks `Grapes` again**

```
In Stock:        Out of Stock:
- Apple          (empty)
- Grapes
- PineApple
```

---

## 📏 Constraints

- Use **React hooks only** (`useState` is sufficient).
- Do **not** mutate the original state array directly.
- Preserve the initial fruit names and their initial `status`.
- Do not add extra libraries; the project already ships with React 19 + Vite.

---

## 🚀 How to Run

```bash
cd solution
npm install
npm run dev
```

Then open the printed local URL in your browser. Click fruits to verify the
toggle works.

---

## 💡 Hints

- `Array.prototype.filter` is perfect for splitting the list into two views.
- `Array.prototype.map` lets you return a **new** array with one item changed —
  this is the correct way to update state in React.
- Use the fruit `name` as the `key` prop on each `<li>`/element to keep React's
  reconciliation correct.
