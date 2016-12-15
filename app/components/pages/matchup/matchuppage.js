import Ad from 'react-google-publisher-tag';
import React from 'react';
import changeCase from 'change-case';

import { take, uniqBy, toArray, slice } from 'lodash';
import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import Loader from '../../loader';
import Typeahead from '../../typeahead';
import TabsNav from '../../tabsnav';
import HeroFooter from '../hero/herofooter';

import { fetchCounterTipsIfNeeded } from '../../../actions/api';
import { adDimensions } from '../../../constants/ads';

class MatchupPage extends Component {

  componentWillMount () {
    const {
      dispatch
    } = this.props;
  };
  componentWillUnmount () {

  }
  render () {
    const {
      children,
      heroesMap,
      heroesArray,
      isFetchingHeroes,
      params: {
        heroKey: _heroKey,
        matchupHeroKey: _matchupHeroKey
      },
    } = this.props;
    
    const heroKey = changeCase.lower(_heroKey);
    const matchupHeroKey = changeCase.lower(_matchupHeroKey);

    if (isFetchingHeroes && !heroesMap) {
      return <Loader />;
    }
    
    return (
      <div className="os-body row">
        <div className="os-content container">
          <Ad
            className="os-ad os-ad-top"
            dimensions={adDimensions.BEFORE_RECT}
            path={'/22280732/ChampionSelect_728x90_HP_BTF1'}
          />
          <div className="os-matchup row">
            <div className="col-lg-12">
              <div className="os-matchup-top">
                <div className="col-lg-4">
                  <div className="os-hero-left-search">
                    <Typeahead
                      constructLink={(id) => `/heroes/${id.toLowerCase()}`}
                      inputGroupClass="input-group"
                      placeholder={"Search for a matchup"}
                      miniTag="left"
                    />
                  </div>
                  <div className="os-hero-left-profile">
                    <div className="os-profile-mask">
                      <Link to={`/heroes/${heroKey}`}>
                        <img
                          width="72"
                          height="124"
                          className="os-hero-profile-icon"
                          src= {heroesMap[heroKey].portrait}
                        />
                        <div className="os-hero-profile-type">
                          <img width="16" height="17" src={`/images/${heroesMap[heroKey].type}.png`}/>
                        </div>
                        <h5 className="os-hero-profile-name">{changeCase.upper(heroesMap[heroKey].name)}</h5>
                      </Link>
                    </div>
                  </div>
                </div>
                
                <div className="col-lg-4">
                  <Link to={`/matchups/${matchupHeroKey}/${heroKey}`}>
                    <div className="os-matchup-vs-img">
                    </div>
                  </Link>
                </div>

                <div className="col-lg-4">
                  <div className="os-hero-right-profile">
                    <div className="os-profile-mask">
                      <Link to={`/heroes/${matchupHeroKey}`}>
                        <img
                          width="72"
                          height="124"
                          className="os-hero-profile-icon"
                          src= {heroesMap[matchupHeroKey].portrait}
                        />
                        <div className="os-hero-profile-type">
                          <img width="16" height="17" src={`/images/${heroesMap[matchupHeroKey].type}.png`}/>
                        </div>
                        <h5 className="os-hero-profile-name">{changeCase.upper(heroesMap[matchupHeroKey].name)}</h5>
                      </Link>
                    </div>
                  </div>
                  <div className="os-hero-right-search">
                    <Typeahead
                      constructLink={(id) => `/heroes/${id.toLowerCase()}`}
                      inputGroupClass="input-group"
                      placeholder={"Search for a matchup"}
                      miniTag="left"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-12">
              <div className="os-matchup-body">
                <div className="row">
                  <div className="col-lg-12">
                    <Link to={`/heroes/${heroKey}/matchups`}>
                      <i className="fa fa-long-arrow-left" aria-hidden="true"/> back to Hero Matchups
                    </Link>
                  </div>
                </div>
                <div className="row">
                  {children}
                </div>
              </div>
            </div>
          </div>
          <Ad
            className="os-ad os-ad-bottom"
            dimensions={adDimensions.AFTER_SQUARE}
            path={'/22280732/ChampionSelect_728x90_HP_BTF1'}
          />
        </div>
        <div className="os-hero-footer">
          {!isFetchingHeroes && heroesArray ?
              <HeroFooter
                heroes={heroesArray}
              /> : <Loader /> }
        </div>
      </div>
    );
  }
}

function mapStateToProps (state) {
  const {
    riot: {
      heroes: {
        _array: heroesArray,
        _map: heroesMap,
        isFetching: isFetchingHeroes
      }
    }
  } = state;

  return {
    heroesArray,
    heroesMap,
    isFetchingHeroes
  };
}

export default connect(mapStateToProps)(MatchupPage);
