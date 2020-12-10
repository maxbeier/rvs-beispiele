import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from './Store';
import HeroCard from './HeroCard';

const filters = {
  q: (obj, val) => obj.name.toLocaleLowerCase().includes(val),
  min: (obj, val) => obj.price >= val,
  max: (obj, val) => obj.price <= val,
};

const Search = () => {
  const [{ heroes, categories }] = useStore();
  const params = new URLSearchParams(window.location.search);
  const entries = [...params.entries()];
  const filteredHeroes = heroes.filter(h => entries.every(([key, val]) => filters[key](h, val)));
  const filteredCategories = categories.filter(c => filters.q(c, params.get('q')));

  return (
    <div className="row">
      {filteredHeroes.map(hero =>
        <div key={hero.id} className="xs-12 sm-6 md-4 lg-3 col">
          <HeroCard hero={hero} className="card" />
        </div>
      )}
      {filteredCategories.length > 0 &&
        <div className="xs-12 sm-6 md-4 lg-3 col">
          <div className="card" style={{ padding: '1rem' }}>
            <h3>Categories</h3>
            <ul className="search-result">
              {filteredCategories.map(category =>
                <li key={category.id}>
                  <Link to={`/categories/${category.id}`}>{category.name}</Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      }
    </div>
  );
};

export default Search;
