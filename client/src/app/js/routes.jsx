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
import InvitesShow from './components/invites/show';
import LandingPage from './components/shared/landingpage';
import ReminderPage from './components/shared/reminderpage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={LandingPage} />
    <Route path="parties/my" component={PartiesIndex} />
    <Route path="parties/new" component={PartiesNew} />
    <Route path="parties/:id/show" component={PartiesShow} />
    <Route path="parties/:id" component={PartiesShow} />
    <Route path="p/:id" component={PartiesShow} />
    <Route path="invites/:id/show" component={InvitesShow} />
    <Route path="invites/:id" component={InvitesShow} />
    <Route path="i/:id" component={InvitesShow} />
    <Route path="profile" component={UsersEdit} />
    <Route path="users/new" component={UsersNew} />
    <Route path="reminder" component={ReminderPage} />
    <Route path="reminderLanding" component={LandingPage} />
    <Route path="*" component={LandingPage}  />
  </Route>
);
