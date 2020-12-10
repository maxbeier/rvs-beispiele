import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useStore } from './Store';

const Header = ({ history }) => {
  const [{ isLoggedIn }, dispatch] = useStore();

  const submit = (ev) => {
    ev.preventDefault();
    const fd = new FormData(ev.target);
    const query = [...fd.keys()]
      .filter(key => fd.get(key))
      .map(key => `${key}=${fd.get(key)}`)
      .join('&');
    history.push(`/search?${query}`);
  }

  const changeLoginState = () => dispatch({ type: isLoggedIn ? 'LOGOUT' : 'LOGIN' });

  return (
    <header>
      <h1><Link to="/">Supero</Link></h1>
      <nav>
        <form className="search" onSubmit={submit}>
          <input name="q" type="search" placeholder="Search …" autoComplete="off" />
          <div className="filter">
            <input name="min" placeholder="min €" autoComplete="off" />
            {'–'}
            <input name="max" placeholder="max €" autoComplete="off" />
          </div>
          <input type="submit" tabIndex="-1" />
        </form>
        <Link to="/heroes/edit" className="paper-btn">+ Add Hero</Link>
        {isLoggedIn &&
          <Link to="/categories" className="paper-btn">Show Categories</Link>
        }
        <button onClick={changeLoginState} className={`text-${isLoggedIn ? 'danger' : 'secondary'}`}>
          {isLoggedIn ? 'Logout' : 'Login'}
        </button>
      </nav>
    </header>
  );
};

export default withRouter(Header);
