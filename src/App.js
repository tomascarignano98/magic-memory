import { useState, useEffect } from 'react';

import './App.css';
import Card from './components/Card';

const cardImages = [
  { src: '/img/helmet-1.png', alt: 'helmet card', matched: false },
  { src: '/img/potion-1.png', alt: 'potion card', matched: false },
  { src: '/img/ring-1.png', alt: 'ring card', matched: false },
  { src: '/img/scroll-1.png', alt: 'scroll card', matched: false },
  { src: '/img/shield-1.png', alt: 'shield card', matched: false },
  { src: '/img/sword-1.png', alt: 'sword card', matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);

  function startGame() {
    // Shuffle cards
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5) // sort randomly
      .map((card) => ({ ...card, id: Math.random() })); // add id for key prop

    setCards(shuffledCards);
    resetChoices();
    setTurns(0);
  }

  // Handle choice
  function handleChoice(card) {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  }

  // Compare cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      // Disable rest of the cards
      setIsDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) =>
          prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return {
                ...card,
                matched: true,
              };
            } else return card;
          })
        );
      }

      const id = setTimeout(resetChoices, 1000);
      return () => clearTimeout(id);
    }
  }, [choiceOne, choiceTwo]);

  // Start game automatically
  useEffect(startGame, []);

  function resetChoices() {
    setChoiceOne(null);
    setChoiceTwo(null);

    // Increase turns
    setTurns((prevTurns) => prevTurns + 1);

    // Enable back the cards
    setIsDisabled(false);
  }

  return (
    <main className="App">
      <h1>Magic Match</h1>
      <button onClick={startGame}>New Game</button>
      <section className="card-grid">
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={
              card === choiceOne || card === choiceTwo || card.matched
            }
            isDisabled={isDisabled}
          />
        ))}
      </section>
      <p>Turns: {turns}</p>
      {cards.every((card) => card.matched === true) && <p>Game Over!</p>}
    </main>
  );
}

export default App;
