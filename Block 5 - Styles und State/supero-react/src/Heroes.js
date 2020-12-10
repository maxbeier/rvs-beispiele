import React from 'react';
import { useStore } from './Store';
import HeroCard from './HeroCard';

const Heroes = () => {
  const [{ heroes }, dispatch] = useStore();
  const remove = id => () => dispatch({ type: 'REMOVE_HERO', id });

  return (
    <div>
      <div className="row">
        {heroes.map(hero =>
          <div key={hero.id} className="xs-12 sm-6 md-4 lg-3 col">
            <HeroCard hero={hero} onRemove={remove(hero.id)} className="card" />
          </div>
        )}
      </div>
    </div>
  );
}

export default Heroes;
