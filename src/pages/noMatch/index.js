import React, { Component } from 'react';
import style from './index.module.less'

class NoMatch extends Component {
  render() {
    return (
      <div className={style.noFound}>
        404 Not Found !!!
      </div>
    );
  }
}

export default NoMatch;
