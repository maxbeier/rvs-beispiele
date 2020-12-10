import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { StateProvider } from './Store';
import ProtectedRoute from './ProtectedRoute';
import Header from './Header';
import Footer from './Footer';
import Search from './Search';
import Imprint from './Imprint';
import Contact from './Contact';
import Heroes from './Heroes';
import HeroForm from './HeroForm';
import CategoryForm from './CategoryForm';
import Hero from './Hero';
import Categories from './Categories';
import Category from './Category';
import initialState from './initialState';
import reducer from './reducer';

const App = () => (
  <StateProvider initialState={initialState} reducer={reducer}>
    <Router>
      <Header />

      <main>
        <Switch>
          <Route exact path="/" component={Heroes} />
          <Route path="/heroes/edit/:id?" component={HeroForm} />
          <Route path="/heroes/:id" component={Hero} />

          <ProtectedRoute exact path="/categories" component={Categories} />
          <ProtectedRoute path="/categories/edit/:id?" component={CategoryForm} />
          <Route path="/categories/:id" component={Category} />

          <Route path="/search" component={Search} />
          <Route path="/imprint" component={Imprint} />
          <Route path="/contact" component={Contact} />
        </Switch>
      </main>

      <Footer />
    </Router>
  </StateProvider>
);

export default App;
