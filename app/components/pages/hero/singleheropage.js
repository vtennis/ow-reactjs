import Ad from 'react-google-publisher-tag';
import React from 'react';
import changeCase from 'change-case';

import { take, uniqBy, toArray, slice, findIndex } from 'lodash';
import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import Loader from '../../loader';
import Typeahead from '../../typeahead';
import TabsNav from '../../tabsnav';
import HeroFooter from './herofooter';

import { prepareAds } from '../../ads';
import { adDimensions } from '../../../constants/ads';

class SingleHeroPage extends Component {
  static defaultProps = {
    ads: [
      'div-gpt-ad-1468534690919-8',
      'div-gpt-ad-1468534690919-9'
    ]
  };

  componentWillMount () {
    const {
      ads,
      dispatch
    } = this.props;

    prepareAds(ads);
  };
  componentWillUnmount () {

  }

  render () {
    const {
      children,
      ads,
      heroesMap,
      heroesArray,
      isFetchingHeroes,
      params: {
        heroKey: _heroKey
      },
      location: {
        pathname: _activePath
      }
    } = this.props;
    
    const activePath = _activePath.split('/').pop();
    let _generaltips,_heromatchups,_maprankings, _fulltips = false;

    if(activePath == "matchups" ) _heromatchups = 'active';
    else if(activePath == "maprankings" ) _maprankings = 'active';
    else if(activePath.includes("for") || activePath.includes("against")) _fulltips = 'active';
    else _generaltips = "active";

    const heroKey = changeCase.lower(_heroKey);
    if (!isFetchingHeroes && heroesMap) {
      const {
        id,
        name,
        portrait
      } = heroesMap[heroKey];

      return (
        <div className="os-body row">
          <div className="os-content container">
            <Ad
              className="os-ad os-ad-top"
              dimensions={adDimensions.BEFORE_RECT}
              path={'/22280732/ChampionSelect_728x90_HP_BTF1'}
            />
            <div className="os-hero row">
              <div className="col-lg-12">
                <div className="os-hero-top">
                  <div className="col-lg-3">
                    <div className="os-hero-profile">
                      <div className="os-profile-mask">
                        <Link to={`/heroes/${heroKey}`}>
                          <img
                            width="72"
                            height="124"
                            className="os-hero-profile-icon"
                            src= {portrait}
                          />
                          {/* "https://s3.amazonaws.com/solomid-resources/overwatch/heroes/ana/hero-select-portrait.png" */}
                          <div className="os-hero-profile-type">
                            <img width="16" height="17" src="/images/offense.png"/>
                          </div>
                          <h5 className="os-hero-profile-name">{changeCase.upper(name)}</h5>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-9">
                    <div className="os-hero-search">
                      <Typeahead
                        constructLink={(id) => `/heroes/${id.toLowerCase()}/${activePath}`}
                        inputGroupClass="input-group"
                        placeholder={"Search for a matchup"}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-12">
                <div className="os-hero-body">
                  { _heromatchups || _maprankings || _generaltips ?
                  <div className="row">
                    <div className="center-text">
                      <ul className="os-hero-nav">
                        <li className={`os-hero-nav-item ${_generaltips}`}> 
                          <Link to={`/heroes/${id}/generaltips`}>GENERAL TIPS</Link> 
                        </li>
                        <li className={`os-hero-nav-item ${_heromatchups}`}> 
                          <Link to={`/heroes/${id}/matchups`}>HERO MATCHUPS</Link> 
                        </li>
                        <li className={`os-hero-nav-item ${_maprankings}`}> 
                          <Link to={`/heroes/${id}/maprankings`}>MAP RANKINGS</Link> 
                        </li>
                      </ul>
                    </div>
                  </div> : null
                  }

                  { _fulltips?
                  <div className="row">
                    <div className="col-lg-12">
                      <Link to={`/heroes/${id}/generaltips`}>
                        <i className="fa fa-long-arrow-left" aria-hidden="true"/> back to Hero Matchups
                      </Link>
                    </div>
                  </div> : null
                  }
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
    return <Loader />;
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

export default connect(mapStateToProps)(SingleHeroPage);
