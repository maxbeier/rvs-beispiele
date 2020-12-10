import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from './Store';

function HeroCard ({ hero, onRemove, className }) {
  const [{ categories }] = useStore();
  const catByID = categories.reduce((obj, cat) => (obj[cat.id] = cat.name, obj), {}); // eslint-disable-line no-sequences

  return (
    <div className={className}>
      <Link to={`/heroes/${hero.id}`}>
        <img className="image-top" src={`/images/${hero.pic}`} alt="Card" />
      </Link>
      <div className="card-body">
        <h4 className="card-title">
          <Link to={`/heroes/${hero.id}`}>{hero.name}</Link> {hero.price} €
        </h4>
        <p>
          {hero.categories.map(catID =>
            <Link key={catID} to={`/categories/${catID}`}>
              <span className="badge secondary">{catByID[catID]}</span>
            </Link>
          )}
        </p>
        <p className="card-text">
          {hero.description}
        </p>
        <div className="hero-actions row flex-edges flex-middle">
          {onRemove &&
            <button className="btn-danger" onClick={onRemove}>Delete</button>
          }
          <Link to={`/heroes/edit/${hero.id}`} className="paper-btn btn-warning">Edit</Link>
          <Link to={`/contact?hero=${hero.id}`} className="paper-btn btn-success">Book</Link>
        </div>
      </div>
    </div>
  );
}

export default HeroCard;
