import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from './Store';

const Categories = () => {
  const [{ categories, heroes }, dispatch] = useStore();
  const remove = id => () => {
    heroes
      .filter(hero => hero.categories.includes(id))
      .forEach(hero => dispatch({
        type: 'EDIT_HERO',
        hero: {
          ...hero,
          categories: hero.categories.filter(catid => catid !== id),
        }
      }));
    dispatch({ type: 'REMOVE_CATEGORY', id });
  };
  const getNumberOfItems = cat => heroes.filter(t => t.categories.includes(cat.id)).length;

  return (
    <div>
      <div className="row flex-edges flex-middle">
        <h1>Categories</h1>
        <Link to="/categories/edit" className="paper-btn">+ Add Category</Link>
      </div>
      <table className="table-hover">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>∑ Heroes</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {categories.map(category =>
            <tr key={category.id}>
              <td>{category.id}</td>
              <td>
                <Link to={`/categories/${category.id}`}>{category.name}</Link>
              </td>
              <td>{getNumberOfItems(category)}</td>
              <td>
                <Link to={`/categories/edit/${category.id}`} className="paper-btn btn-secondary">Edit</Link>
              </td>
              <td>
                <button className="text-danger" onClick={remove(category.id)}>Delete</button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Categories;
