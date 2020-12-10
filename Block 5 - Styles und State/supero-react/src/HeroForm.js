import React from 'react';
import { withRouter } from 'react-router-dom';
import { useStore } from './Store';

const emptyHero = { name: '', pic: '', categories: [] };

const HeroForm = ({ history, match }) => {
  const [{ heroes, categories }, dispatch] = useStore();
  const id = +match.params.id || undefined;
  const hero = heroes.find(t => t.id === id) || emptyHero;

  const save = (ev) => {
    ev.preventDefault();
    const type = id ? 'EDIT_HERO' : 'ADD_HERO';
    const hero = { id, categories: [] };
    const fd = [...new FormData(ev.target)];
    fd.forEach(([key, value]) => {
      key === 'categories'
        ? hero.categories.push(+value)
        : hero[key] = value;
    });
    hero.price = +hero.price; // meh
    dispatch({ type, hero });
    history.push('/');
  }

  return (
    <div>
      {id
        ? <h1>Edit {hero.name}</h1>
        : <h1>Create a Hero</h1>
      }
      <form className="form-group" onSubmit={save}>
        <label className="form-group">Name
          <input name="name" type="text" className="input-block" defaultValue={hero.name} autoFocus />
        </label>

        <label className="form-group">Price
          <input name="price" type="text" className="input-block" defaultValue={hero.price} />
        </label>

        <label className="form-group">Picture
          <input name="pic" type="text" className="input-block" defaultValue={hero.pic} />
        </label>

        {categories.map(category =>
          <label key={category.id} className="paper-check">
            <input type="checkbox" name="categories" value={category.id} defaultChecked={hero.categories.includes(category.id)} />
            {' '}
            <span>{category.name}</span>
          </label>
        )}

        <button>Save</button>
      </form>
    </div>
  );
};

export default withRouter(HeroForm);
