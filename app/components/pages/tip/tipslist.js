import React from 'react';
import changeCase from 'change-case';
import classNames from 'classnames';
import moment from 'moment';

import {
  Component,
  PropTypes
} from 'react';

import {
  connect
} from 'react-redux';

import {
  Link
} from 'react-router';

import {
  invalidateCounterTips,
  voteCounterTip
} from '../../../actions/all';

import {
  RIOT_HERO_ICONS_URL
} from '../../../constants/urls';

class TipsList extends Component {
  static defaultProps: {
    shouldHideMeta: false
  }

  render () {
    const {
      herosMap,
      counterTips,
      shouldHideMeta
    } = this.props;

    if (!localStorage.getItem('counterTipVotes')) localStorage.setItem('counterTipVotes', JSON.stringify({}));
    const votes =  JSON.parse(localStorage.getItem('counterTipVotes'));

    if (counterTips.length === 0) {
      return (
        <div className="os-counter-tips-list">
          <div className="alert alert-warning">Be the first to submit a counter tip!</div>
        </div>
      );
    }

    return (
      <div className="os-counter-tips-list">
        {counterTips.map(counterTip => {
          const {
            heroKey: heroKey,
            commentTree: {
              _id: id,
              author: {
                name: authorName
              },
              content,
              createdAt,
              score: {
                upvotes,
                downvotes,
                total: scoreTotal
              },
            },
            matchupHeroKey: matchupHeroKey
          } = counterTip;

          const name = authorName ? authorName : 'anonymous';
          const formattedCreatedAt = moment(parseInt(createdAt)).fromNow();

          const downvoteClass = classNames({
            'fa fa-fw fa-caret-down': true,
            'os-counter-tip-caret': true,
            'os-counter-tip-caret-non-active': !votes[id],
            'os-counter-tip-caret-active': votes[id] === 'downvote',
            'os-counter-tip-vote-alt': true,
            'os-counter-tip-vote-non-active-alt': !votes[id],
            'os-counter-tip-vote-active-alt': votes[id] === 'downvote'
          });

          const upvoteClass = classNames({
            'fa fa-fw fa-caret-up': true,
            'os-counter-tip-caret': true,
            'os-counter-tip-caret-non-active': !votes[id],
            'os-counter-tip-caret-active': votes[id] === 'upvote',
            'os-counter-tip-vote-alt': true,
            'os-counter-tip-vote-non-active-alt': !votes[id],
            'os-counter-tip-vote-active-alt': votes[id] === 'downvote'
          });

          const contentElement = (
            <div>
              <p
                className="os-counter-tip-text"
                dangerouslySetInnerHTML={{
                  __html: content
                }}
              ></p>
              <div className="os-counter-tip-footer clearfix">
                {/* <span className="os-counter-tip-metadata">{formattedCreatedAt} by <a href="javascript:;">{name}</a></span> */}
                <span className="os-counter-tip-metadata">by <span className="os-counter-tip-author">{name}</span></span>
                {shouldHideMeta ? null
                  : <span className="os-counter-tip-score">
                    <i
                      className={upvoteClass}
                      onClick={this.handleVote.bind(null, id, 'upvote')}
                    ></i><span className={`jq-counter-tip-${id}`}>{scoreTotal}</span><i
                      className={downvoteClass}
                      onClick={this.handleVote.bind(null, id, 'downvote')}
                    ></i>
                  </span>
                }
              </div>
            </div>
          );

          return (
            <div
              className="os-counter-tip"
              key={id}
            >
              {shouldHideMeta ? null :
                <Link
                  to={linkTo}
                >
                    <ul className="list-unstyled list-inline">
                      <li className="list-inline-item">
                        <img
                          className="os-counter-tip-icon img-rounded"
                          src="{`${RIOT_HERO_ICONS_URL}/${fullImageHero}`}"
                        />
                      </li>
                      <li className="list-inline-item">
                        {matchupHeroIcon}
                      </li>
                    </ul>
                </Link>
              }
              {shouldHideMeta ?
                <div className="os-counter-tip-score-alt">
                  <div className="os-counter-tip-vote-alt os-counter-tip-upvote-alt">
                    <i
                      className={upvoteClass}
                      onClick={this.handleVote.bind(null, id, 'upvote')}
                    ></i>
                  </div>
                  {/* <span className={`jq-counter-tip-${id} hidden-xs-up`}></span> */}
                  <p className={`os-counter-tip-total-alt jq-counter-tip-${id}`}>{scoreTotal}</p>
                  <div className="os-counter-tip-vote-alt os-counter-tip-downvote-alt">
                    <i
                      className={downvoteClass}
                      onClick={this.handleVote.bind(null, id, 'downvote')}
                    ></i>
                  </div>
                </div>
              : null}
              {shouldHideMeta ?
                <div className="os-counter-tip-content">
                  {contentElement}
                </div>
              : contentElement}
            </div>
          );
        })}
      </div>
    );
  }

  handleVote = (id, downOrUp) => {
    const {
      dispatch,
      shouldHideMeta
    } = this.props;

    const votes = JSON.parse(localStorage.getItem('counterTipVotes'));

    if (!votes[id]) {
      dispatch(voteCounterTip(id, downOrUp));

      const selector = `.jq-counter-tip-${id}`;
      const score = parseInt($(selector).text());

      if (shouldHideMeta) {
        if (downOrUp === 'downvote') {
          $(selector).text(score - 1)

          $(selector).next().find('i').addClass('os-counter-tip-vote-active-alt');
        } else if (downOrUp === 'upvote') {
          $(selector).text(score + 1)

          $(selector).prev().find('i').addClass('os-counter-tip-vote-active-alt');
        }

        $(selector).prev().find('i').removeClass('os-counter-tip-vote-non-active-alt');
        $(selector).next().find('i').removeClass('os-counter-tip-vote-non-active-alt');
      } else {
        if (downOrUp === 'downvote') {
          $(selector).text(score - 1);
          $(selector).next().addClass('os-counter-tip-caret-active');
        } else if (downOrUp === 'upvote') {
          $(selector).text(score + 1);
          $(selector).prev().addClass('os-counter-tip-caret-active');
        }

        $(selector).prev().removeClass('os-counter-tip-caret-non-active');
        $(selector).next().removeClass('os-counter-tip-caret-non-active');
      }

      votes[id] = downOrUp;
      localStorage.setItem('counterTipVotes', JSON.stringify(votes));
    }
  };
}

export default connect()(TipsList);
