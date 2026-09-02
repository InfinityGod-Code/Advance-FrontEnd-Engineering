# 🛒 Cart Management

<table>
  <tr>
    <td><strong>Difficulty</strong></td><td>Easy-Medium</td>
    <td><strong>Max Score</strong></td><td>75</td>
    <td><strong>Success Rate</strong></td><td>85%</td>
  </tr>
</table>

> **Topic:** React State Management · Lists, Cart Logic & Derived State
> **Stack:** React 19 + Vite
> **Files to edit:** `src/App.jsx`

---

## 📋 Problem Statement

You are building the front-end for a small e-commerce **Cart Manager**. The page shows a list of **available products** and a **shopping cart** sidebar. Users can add products to the cart, adjust quantities, remove items, and see the cart total update instantly.

Your task is to implement the full cart logic in `App.jsx` using **React state only** — no external state library.

You must render two clearly separated sections:

1. **Products** — grid of available items, each with *Add to Cart* button.
2. **Cart** — list of items currently in the cart with quantity controls (`+` / `−`), *Remove* button, item count and grand total.

---

## 🧾 Component Specification

Your solution must live in `src/App.jsx` and export a default React component `App`.

### Initial Data

The component must initialize product data from the following array (exact values — do **not** change):

```js
const INITIAL_PRODUCTS = [
  { id: 1, name: 'Apple',  price: 30, icon: '🍎' },
  { id: 2, name: 'Banana', price: 12, icon: '🍌' },
  { id: 3, name: 'Orange', price: 20, icon: '🍊' },
  { id: 4, name: 'Mango',  price: 45, icon: '🥭' },
];
```

Cart starts **empty**: `[]`. Each cart item shape must be:

```js
{ id, name, price, icon, qty } // qty: number >= 1
```

### State & Behavior

| Requirement | Description |
| --- | --- |
| State | Maintain cart in a single `useState([])` array. Products list is static. |
| Add to Cart | Clicking **Add to Cart** on a product: if item already in cart → `qty += 1`; otherwise push `{...product, qty: 1}`. Must be **immutable** (`map` / spread). |
| Increment | `+` button in cart → `qty += 1` for that `id`. |
| Decrement | `−` button → `qty -= 1`; if `qty` becomes `0`, **remove** item from cart. |
| Remove | *Remove* button deletes the item regardless of qty. |
| Clear Cart | Optional bonus: *Clear Cart* button empties entire cart. |
| Derived values | `totalItems = cart.reduce((s, i) => s + i.qty, 0)` and `totalPrice = cart.reduce((s, i) => s + i.price * i.qty, 0)` must be displayed and update on every change. |

### Rendering Rules

- **Products grid:** Each product card shows `icon`, `name`, `price` (format `₹{price}`), and an **Add to Cart** button. Disable or show `In Cart (qty)` if already added — your choice, but logic must remain correct.
- **Cart panel:** If empty, show placeholder text `"Your cart is empty"`. Otherwise render each cart item with `name`, `price × qty = subtotal`, `qty` controls and `Remove`.
- **Header stats:** Always visible — `Items: {totalItems}` and `Total: ₹{totalPrice}`.
- Each product/cart row must be uniquely keyed by `id`.
- Empty cart must not show total as `NaN` — show `₹0`.

---

## 🔧 Reference Implementation (Logic)

```jsx
function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart(prev => {
      const ex = prev.find(i => i.id === product.id)
      return ex
        ? prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i)
        : [...prev, { ...product, qty: 1 }]
    })
  }

  const increment = (id) => {
    setCart(prev => prev.map(i => i.id === id ? { ...i, qty: i.qty + 1 } : i))
  }

  const decrement = (id) => {
    setCart(prev => {
      const item = prev.find(i => i.id === id)
      if (item.qty === 1) return prev.filter(i => i.id !== id)
      return prev.map(i => i.id === id ? { ...i, qty: i.qty - 1 } : i)
    })
  }

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(i => i.id !== id))
  }

  const totalItems = cart.reduce((s, i) => s + i.qty, 0)
  const totalPrice = cart.reduce((s, i) => s + i.price * i.qty, 0)
}
```

> Styling is up to you — make it clean, responsive and pleasant (grid + sidebar works well). Grading focuses on **correct state updates, immutability, and derived totals**.

---

## ✅ Sample Interaction

**Initial render**

```
Products:                Cart:
[Apple  ₹30 Add]         Your cart is empty
[Banana ₹12 Add]         Items: 0  Total: ₹0
[Orange ₹20 Add]
[Mango  ₹45 Add]
```

**User clicks `Add to Cart` on Apple, then Banana, then Apple again**

```
Cart:
Apple  ₹30 × 2 = ₹60  [−] 2 [+] [Remove]
Banana ₹12 × 1 = ₹12  [−] 1 [+] [Remove]
Items: 3  Total: ₹72
```

**User clicks `−` on Banana (qty 1 → 0)**

```
Cart:
Apple  ₹30 × 2 = ₹60
Items: 2  Total: ₹60
```

---

## 📏 Constraints

- Use **React hooks only** (`useState` is sufficient). Do not use Redux or external stores.
- Do **not** mutate the cart array or objects directly — always return a **new array** with `map`/`filter`/spread.
- Preserve `INITIAL_PRODUCTS` ids, names and prices exactly.
- Prices are integers; total must be computed via `reduce`, not hardcoded.
- Do not add extra libraries; project ships with React 19 + Vite.

---

## 🚀 How to Run

```bash
cd solution
npm install
npm run dev
```

Then open the printed local URL. Verify:
1. Clicking **Add to Cart** adds or bumps `qty`.
2. `+` / `−` correctly update `qty` and remove at `0`.
3. `Remove` deletes the row.
4. Header `Items` and `Total` update instantly and show `0` when empty.

---

## 💡 Hints

- `Array.prototype.find` checks existence; `map` updates one item immutably; `filter` removes it.
- Keep cart shape minimal: `{id, name, price, icon, qty}` — derive `subtotal` as `price * qty` at render time.
- Start with `const [cart, setCart] = useState([])` and build handlers one by one; test Add → Increment → Decrement → Remove flow.
- For layout, a 2-column grid (`products` left, `cart` sticky right) with cards and a header pill for totals looks great.
