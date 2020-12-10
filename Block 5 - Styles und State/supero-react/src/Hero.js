import React from 'react';
import { withRouter } from 'react-router-dom';
import { useStore } from './Store';
import HeroCard from './HeroCard';

const Hero = ({ history, match }) => {
  const [{ heroes }, dispatch] = useStore();
  const hero = heroes.find(t => t.id === +match.params.id);
  const remove = () => {
    dispatch({ type: 'REMOVE_HERO', id: hero.id });
    history.push('/');
  };

  return <HeroCard hero={hero} onRemove={remove} />;
};

export default withRouter(Hero);
