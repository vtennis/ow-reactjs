import React from 'react'
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import Root from './Root';

import ForgotPassword from '../components/pages/password/forgot';
import ResetPassword from '../components/pages/password/reset';
import HomePage from '../components/pages/hero/homepage';
import MapsPage from '../components/pages/map/mapspage';
import SingleHeroPage from '../components/pages/hero/singleheropage';
import GeneralTipsPage from '../components/pages/tip/generaltipspage';
import HeroMatchupsPage from '../components/pages/matchup/heromatchupspage';
import MapRankingsPage from '../components/pages/map/maprankingspage';
import MatchupPage from '../components/pages/matchup/matchuppage';
import MatchupTipsPage from '../components/pages/matchup/matchuptipspage';
import AddTipsPage from '../components/pages/tip/addtipspage';

export const routes = (
  <Route path="/" component={Root} >
    <IndexRoute component={HomePage} />
    <Route path="/forgot" component={ForgotPassword} />
    <Route path="/reset" component={ResetPassword} />
    <Route path="/heroes" component={HomePage} />

    <Route path="/heroes/:heroKey" component={SingleHeroPage}>
      <IndexRoute component={GeneralTipsPage} />
      <Route path="/heroes/:heroKey/generaltips" component={GeneralTipsPage}/>
      <Route path="/heroes/:heroKey/matchups" component={HeroMatchupsPage}/>
      <Route path="/heroes/:heroKey/maprankings" component={MapRankingsPage}/>
      <Route path="/heroes/:heroKey/:tipType" component={AddTipsPage}/>
    </Route>

    <Route path="/matchups/:heroKey/:matchupHeroKey" component={MatchupPage}>
      <IndexRoute component={MatchupTipsPage} />
    </Route>
    <Route path="/maps" component={MapsPage} />
  </Route>
);

export default class Application extends React.Component {
  render () {
    return (
      <Provider store={ this.props.store }>
        <Router history={ this.props.history }>
          {routes}
        </Router>
      </Provider>
    )
  }
}
//add this when pushing to prod  onUpdate={() => this.handlePageView()}
