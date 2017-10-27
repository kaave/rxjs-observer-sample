import 'babel-polyfill'; // アプリ内で1度だけ読み込む エントリーポイントのてっぺん推奨
import $ from 'jquery';
import touchEvents from 'jquery-touch-events';

import notice from 'libraries-frontend-framelunch/js/notice';
import state from 'libraries-frontend-framelunch/js/state';
import subscribeEvents from './_events';
import flLogoImageCode from '../assets/fl-logo.svg';

class Main {
  constructor() {
    this.setTouchEventsToJQuery();
    this.onDOMContentLoaded = this.onDOMContentLoaded.bind(this);
    this.onWindowResize = this.onWindowResize.bind(this);
    this.onScrollTop = this.onScrollTop.bind(this);
  }

  setTouchEventsToJQuery() {
    touchEvents($);
  }

  onDOMContentLoaded() {
  }

  onWindowResize($window) {
    console.log('onWindowResize:', $window.width(), $window.height());
  }

  onScrollTop(scrollTop) {
    console.log('scrollTop:', scrollTop);
  }
}

const main = new Main();
window.addEventListener('DOMContentLoaded', main.onDOMContentLoaded);
notice.listen('resize', main.onWindowResize);
notice.listen('scroll', main.onScrollTop);
subscribeEvents();

/*
 * 以下テスト用
 */
notice.listen('init', data => console.log(data));
notice.publish('init', [123]);
state.listen('add:a', v => console.log('add:a', v));
state.listen('add:c', v => console.log('add:c', v));
state.change('a/b/c', [5678]);
