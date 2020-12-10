const reducer = (state, action) => {
  const index = (state.index || state.heroes.length) + 1;

  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isLoggedIn: true,
      };

    case 'LOGOUT':
      return {
        ...state,
        isLoggedIn: false,
      };

    case 'ADD_HERO':
      return {
        ...state,
        index,
        heroes: [...state.heroes, { ...action.hero, id: index }],
      };

    case 'EDIT_HERO':
      return {
        ...state,
        heroes: state.heroes.map(t => t.id !== action.hero.id ? t : action.hero),
      };

    case 'REMOVE_HERO':
      return {
        ...state,
        heroes: state.heroes.filter(t => t.id !== action.id),
      };

    case 'ADD_CATEGORY':
      return {
        ...state,
        index,
        categories: [...state.categories, { ...action.category, id: index }],
      };

    case 'EDIT_CATEGORY':
      return {
        ...state,
        categories: state.categories.map(t => t.id !== action.category.id ? t : action.category),
      };

    case 'REMOVE_CATEGORY':
      return {
        ...state,
        categories: state.categories.filter(t => t.id !== action.id),
      };

    default:
      return state;
  }
};

export default reducer;
