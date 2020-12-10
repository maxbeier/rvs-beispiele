import React, { useState } from 'react';
import { useStore } from './Store';

const Contact = ({ match }) => {
  const [{ heroes }] = useStore();
  const [isSend, setIsSend] = useState(false);
  const params = new URLSearchParams(window.location.search);
  const id = +params.get('hero');

  const save = (ev) => {
    ev.preventDefault();
    setIsSend(true);
  }

  if (isSend) {
    return <p className="alert alert-success">Anfrage verschickt.</p>;
  }

  return (
    <form className="form-group" onSubmit={save}>
      <label className="input-block">
        Hero
        <select className="input-block" defaultValue={id}>
          {heroes.map(hero =>
            <option key={hero.id} value={hero.id}>{hero.name}</option>
          )}
        </select>
      </label>

      <label className="input-block">
        Your Name
        <input name="name" type="text" className="input-block" autoFocus />
      </label>

      <label className="input-block">
        Additional Wishes
        <textarea name="text" className="input-block" />
      </label>

      <button>Book Hero Now</button>
    </form>
  );
};

export default Contact;
