import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import UsersIndex from './components/users/index';
import UsersShow from './components/users/show';
import UsersEdit from './components/users/edit';
import UsersNew from './components/users/new';
import PartiesIndex from './components/parties/index';
import PartiesShow from './components/parties/show';
import PartiesNew from './components/parties/new';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={PartiesIndex} />
    <Route path="parties/all" component={PartiesIndex} />
    <Route path="parties/my" component={PartiesIndex} />
    <Route path="parties/:id/show" component={PartiesShow} />
    <Route path="parties/new" component={PartiesNew} />
    <Route path="users/:username/show" component={UsersShow} />
    <Route path="users/all" component={UsersIndex} />
    <Route path="profile" component={UsersEdit} />
    <Route path="users/new" component={UsersNew} />
  </Route>
);
