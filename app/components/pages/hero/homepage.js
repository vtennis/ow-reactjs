import Ad from 'react-google-publisher-tag';
import React from 'react';
import changeCase from 'change-case';

import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Loader from '../../loader';
import Typeahead from '../../typeahead';
import HeroesGrid from './heroesgrid';
import TabsNav from '../../tabsnav';

import { HERO_TYPES } from '../../../constants/types';
import { adDimensions } from '../../../constants/ads';

class HomePage extends Component {

  constructor (props) {
    super(props);
  }

  componentWillMount () {
    const {
      dispatch
    } = this.props;

  };
  componentWillUnmount () {

  }
  render () {
    const {
      heroes,
      isFetchingHeroes,
      params:{
        heroType: _heroType
      }
    } = this.props;
      
    const heroType = _heroType?changeCase.lower(_heroType):'';
    return (
      <div className="os-content container">
        <Ad
          className="os-ad os-ad-top"
          dimensions={adDimensions.BEFORE_RECT}
          path={'/22280732/ChampionSelect_728x90_HP_BTF1'}
        />
        <div className="os-heroes row">
          <div className="col-lg-12">
            <div className="os-content-top os-heroes-top">
              <p className="os-white os-font-size-18"> Search for a hero to find counterpicks, general counters, hero synergy, and more!</p>
              <div className="os-search-wrapper col-lg-8 col-xs-12 col-lg-offset-2">
                <Typeahead
                  constructLink={(id) => `/hero/${id.toLowerCase()}`}
                  inputGroupClass="input-group"
                  placeholder={"Search for a Hero"}
                />
              </div>
            </div>
          </div>
          <div className="col-lg-12">
            <div className="os-content-body os-heroes-body">
              <p className="hidden-xs-down os-font-size-18"> Choose a hero below to find counterpicks, general counters, hero synergy, and more!</p>
              <div>
                <TabsNav
                  activeType={heroType}
                  tabs={HERO_TYPES.map(type => {
                    return {
                      label: changeCase.upper(type.title),
                      link: type.link,
                      name: type.name
                    };
                  })}
                />
              </div>
              {!isFetchingHeroes && heroes ?
                <HeroesGrid
                  filter={heroType}
                  heroes={heroes}
                /> : <Loader /> } 
            </div>
          </div>
        </div>
        <Ad
          className="os-ad os-ad-bottom"
          dimensions={adDimensions.AFTER_SQUARE}
          path={'/22280732/ChampionSelect_728x90_HP_BTF1'}
        />
      </div>
    );
  }
}

function mapStateToProps (state) {
  const {
    hero: {
      heroes: {
        _array: heroesArray,
        isFetching: isFetchingHeroes
      }
    }
  } = state;
  
  return {
    heroes: heroesArray,
    isFetchingHeroes
  };
}

export default connect(mapStateToProps)(HomePage);
