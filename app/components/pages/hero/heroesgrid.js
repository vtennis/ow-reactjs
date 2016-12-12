import React from 'react';

import Loader from '../../loader';
import changeCase from 'change-case';


import {
  Component
} from 'react';

import {
  Link
} from 'react-router';

import {
  generateSpriteStyle
} from '../../../utils/sprites';

import {
  HERO_TYPES
} from '../../../constants/types';

class HeroesGrid extends Component {
  static defaultProps = {
    colClass: 'col-xs-4 os-col-sm-1'
  };

  render () {
    const {
      heroes,
      colClass
    } = this.props;

    return (
      <div className="os-heroes-grid row">
        {
          heroes.map(hero => {
            const {
              id,
              name,
              portrait,
              class: type
            } = hero;

          return (
            <div
              className={colClass}
              key={hero.id}
            >
              <div className="os-thumb-container">
                <Link to={`/heroes/${id}`}>
                  <div className="os-thumb-photo">
                    <img
                      width="98"
                      height="138"
                      className="os-thumbnail"
                      src={ portrait }
                    />
                  {/*`${RIOT_HERO_ICONS_URL}/${full}`*/}
                  </div>
                  <div className="os-thumb-name">
                    <span>{changeCase.upper(name)}</span>
                  </div>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default HeroesGrid;
