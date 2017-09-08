import 'babel-polyfill'; // アプリ内で1度だけ読み込む エントリーポイントのてっぺん推奨
import $ from 'jquery';
import touchEvents from 'jquery-touch-events';
import anime from 'animejs';

import notice from 'libraries-frontend-framelunch/js/notice';
import state from 'libraries-frontend-framelunch/js/state';
import subscribeEvents from './_events';
import flLogoImageCode from '../assets/fl-logo.svg';
import loremTxt from '../assets/loremipsum.txt';

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
    anime({
      targets: '#test-img',
      translateX: [
        { value: 100, duration: 1200 },
        { value: 0, duration: 800 },
      ],
      rotate: '1turn',
      backgroundColor: [
        { value: `hsl(${Math.floor(Math.random() * 360)}, 90%, 70%)`, dulation: 500 },
        { value: `hsl(${Math.floor(Math.random() * 360)}, 90%, 70%)`, dulation: 500 },
        { value: `hsl(${Math.floor(Math.random() * 360)}, 90%, 70%)`, dulation: 500 },
        { value: `hsl(${Math.floor(Math.random() * 360)}, 90%, 70%)`, dulation: 500 },
      ],
      duration: 2000,
      loop: false,
    });

    const svgSection = document.createElement('div');
    svgSection.classList.add('svg-section');
    svgSection.innerHTML = flLogoImageCode;
    document.body.appendChild(svgSection);
    svgSection.style.width = '300px';
    svgSection.style.marginLeft = '300px';
    svgSection.style.transition = 'all 500ms ease-in-out';
    const flSvg = svgSection.firstChild;
    flSvg.style.transition = 'all 500ms ease-in-out';
    flSvg.setAttribute('stroke', '#000');
    setInterval(() => {
      flSvg.style.fill = `#${Math.floor(Math.random() * 255 * 255 * 255).toString(16).padStart(6, '0')}`;
      svgSection.style.transform = new Date().getMilliseconds() >= 500 ?
        `scale(${Math.random() * 3 + 1}, 0.03)` : // eslint-disable-line
        `scale(0.03, ${Math.random() * 10 + 1})`; // eslint-disable-line
    }, 500);
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
