import React, { PropTypes, Component } from 'react';

import EntrypointCard from './EntrypointCard';

import './EntrypointLists.scss';

export default class EntrypointLists extends Component {
  componentDidUpdate() {
    const hash = window.location.hash;
    window.location.hash = '';
    window.location.hash = hash;
  }

  render() {
    const { lists } = this.props;
    return (
      <div className="listWrapper">
        {
          lists.map(({ title, description, entrypoints }) =>
            <section
              key={title}
              id={title}
              name={title}
              className="section scrollspy entrypoint-tagList"
              ref={ref => $(document).ready(() => {
                $(ref).scrollSpy({ scrollOffset: 0 });
              })}
            >
              <a className="black-text" href={`#${title}`}>
                <h2 className="listTitle">{title}</h2>
                <span className="grey-text listSubtitle">{description}</span>
              </a>
              <div className="entrypointList">
                {entrypoints.map(entrypoint =>
                  <EntrypointCard
                    key={entrypoint.method + entrypoint.path}
                    method={entrypoint.method}
                    path={entrypoint.path}
                    operation={entrypoint.operation}
                  />)}
              </div>
            </section>
          )
        }
      </div>
    );
  }
}

EntrypointLists.propTypes = {
  lists: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    entrypoints: PropTypes.arrayOf(PropTypes.shape({
      method: PropTypes.string,
      path: PropTypes.string,
      operation: PropTypes.object,
    })),
  })),
};
