import React from 'react';
import { useStore } from './Store';
import HeroCard from './HeroCard';

const Category = ({ match }) => {
  const [{ categories, heroes }, dispatch] = useStore();
  const category = categories.find(t => t.id === +match.params.id);
  const filteredHeroes = heroes.filter(t => t.categories.includes(category.id));
  const remove = id => () => dispatch({ type: 'REMOVE_HERO', id });

  return (
    <React.Fragment>
      <h1>{category.name}</h1>
      <div className="row">
        {filteredHeroes.map(hero =>
          <div key={hero.id} className="xs-12 sm-6 md-4 lg-3 col">
            <HeroCard hero={hero} onRemove={remove(hero.id)} className="card" />
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default Category;
