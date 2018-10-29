import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Header from '../Header';
import MasterPasswordForm from '../MasterPasswordForm';

import Board from '../../pages/Board';
import AddList from '../../pages/AddList';
import EditList from '../../pages/EditList';
import List from '../../pages/List';
import AddItem from '../../pages/AddItem';
import Item from '../../pages/Item';

import styles from './App.css';

export default function App() {
  return (
    <div className={styles.app}>
      <Header />

      <main>
        <Switch>
          <Route path="/" exact component={Board} />
          <Route path="/lists/add" exact component={AddList} />
          <Route path="/lists/:listId" exact component={List} />
          <Route path="/lists/:listId/edit" exact component={EditList} />
          <Route path="/lists/:listId/add" exact component={AddItem} />
          <Route path="/lists/:listId/:itemId" exact component={Item} />
        </Switch>
      </main>

      <MasterPasswordForm />
    </div>
  );
}
