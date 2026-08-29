import { useState } from 'react';
import './App.css';

const INITIAL_FRUITS = [
  { fruit: 'Apple', status: true },
  { fruit: 'Grapes', status: true },
  { fruit: 'PineApple', status: true },
];

const FRUIT_EMOJI = {
  apple: '🍎',
  grapes: '🍇',
  pineapple: '🍍',
  banana: '🍌',
  mango: '🥭',
  strawberry: '🍓',
  orange: '🍊',
  watermelon: '🍉',
  cherry: '🍒',
  peach: '🍑',
  pear: '🍐',
  lemon: '🍋',
};

function getEmoji(name) {
  const key = name.replace(/[^a-z]/gi, '').toLowerCase();
  return FRUIT_EMOJI[key] || '🍏';
}

function App() {
  const [fruits, setFruits] = useState(INITIAL_FRUITS);

  const toggleFruitStatus = (targetFruit, targetStatus) => {
    setFruits((prevFruits) =>
      prevFruits.map((item) =>
        item.fruit === targetFruit ? { ...item, status: targetStatus } : item
      )
    );
  };

  const activeFruits = fruits.filter((item) => item.status);
  const inactiveFruits = fruits.filter((item) => !item.status);

  return (
    <div className="page">
      <header className="page__header">
        <h1 className="page__title">
          <span className="page__title-icon">🍓</span> Fruit Management
        </h1>
        <p className="page__subtitle">
          Click a fruit to move it between <strong>In Stock</strong> and{' '}
          <strong>Out of Stock</strong>.
        </p>
      </header>

      <main className="board">
        <section className="panel panel--active">
          <div className="panel__head">
            <span className="panel__label">In Stock</span>
            <span className="panel__count panel__count--active">
              {activeFruits.length}
            </span>
          </div>

          <ul className="fruit-list">
            {activeFruits.map((item) => (
              <li
                key={item.fruit}
                className="fruit-card fruit-card--active"
                onClick={() => toggleFruitStatus(item.fruit, false)}
                title="Click to mark Out of Stock"
              >
                <span className="fruit-card__emoji">{getEmoji(item.fruit)}</span>
                <span className="fruit-card__name">{item.fruit}</span>
                <span className="fruit-card__badge fruit-card__badge--active">
                  Available
                </span>
              </li>
            ))}
            {activeFruits.length === 0 && (
              <li className="fruit-list__empty">No fruits in stock 🛒</li>
            )}
          </ul>
        </section>

        <section className="panel panel--inactive">
          <div className="panel__head">
            <span className="panel__label">Out of Stock</span>
            <span className="panel__count panel__count--inactive">
              {inactiveFruits.length}
            </span>
          </div>

          <ul className="fruit-list">
            {inactiveFruits.map((item) => (
              <li
                key={item.fruit}
                className="fruit-card fruit-card--inactive"
                onClick={() => toggleFruitStatus(item.fruit, true)}
                title="Click to mark In Stock"
              >
                <span className="fruit-card__emoji">{getEmoji(item.fruit)}</span>
                <span className="fruit-card__name">{item.fruit}</span>
                <span className="fruit-card__badge fruit-card__badge--inactive">
                  Restock
                </span>
              </li>
            ))}
            {inactiveFruits.length === 0 && (
              <li className="fruit-list__empty">Everything is in stock ✅</li>
            )}
          </ul>
        </section>
      </main>
    </div>
  );
}

export default App;
