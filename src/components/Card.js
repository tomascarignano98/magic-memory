import './Card.css';

function Card({ card, handleChoice, flipped, isDisabled }) {
  function handleClick() {
    if (!isDisabled && !flipped) handleChoice(card);
  }

  return (
    <div className="card">
      <div className={flipped ? 'flipped' : ''}>
        <img className="card__front" src={card.src} alt={card.alt} />
        <img
          className="card__back"
          src="/img/cover.png"
          alt="card cover"
          onClick={handleClick}
        />
      </div>
    </div>
  );
}

export default Card;
