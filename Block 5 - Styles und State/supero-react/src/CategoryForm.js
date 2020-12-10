import React from 'react';
import { withRouter } from 'react-router-dom';
import { useStore } from './Store';

const emptyCategory = { name: '' };

const CategoryForm = ({ history, match }) => {
  const [{ categories }, dispatch] = useStore();
  const id = +match.params.id || undefined;
  const category = categories.find(t => t.id === id) || emptyCategory;

  const save = (ev) => {
    ev.preventDefault();
    const type = id ? 'EDIT_CATEGORY' : 'ADD_CATEGORY';
    const category = { id, ...emptyCategory };
    [...new FormData(ev.target)].forEach(([key, value]) => { category[key] = value; });
    dispatch({ type, category });
    history.push('/categories');
  }

  return (
    <div>
      {id
        ? <h1>Edit {category.name}</h1>
        : <h1>Create a Category</h1>
      }
      <form className="form-group" onSubmit={save}>
        <label className="form-group">Name
          <input name="name" type="text" className="input-block" defaultValue={category.name} autoFocus />
        </label>
        <button>Save</button>
      </form>
    </div>
  );
};

export default withRouter(CategoryForm);
