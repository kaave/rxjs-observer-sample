/* eslint import/first: off */
import './common/initializer';
import { format } from 'date-fns';
import * as Rx from 'rxjs';
import 'rxjs-easing-observer/add/easing';
import 'rxjs-easing-observer/add/bouncing';
import 'rxjs-easing-observer/add/sequencer';

const { Observable } = Rx;

class Main {
  constructor() {
    this.onDOMContentLoaded = this.onDOMContentLoaded.bind(this);
  }

  onDOMContentLoaded() {
    this.subscribe();
  }

  subscribe() {
    const main = document.querySelector('main');
    const message = 'WELCOMETONAGOYAJS#4 2018/02/25!WELCOMETONAGOYAJS#4 2018/02/25!';
    Observable.sequencer({
      bpm: 136,
      pattern: `
x---x---x--x--x-
x-x-x-x-xx-x----
x---x---x--x--x-
x-x-x-x-x--x-xxx
`,
    })
      .map((_, index) => index)
      .subscribe(index => {
        if (message[index]) {
          main.innerText = message[index];
        }
      });
  }
}

const main = new Main();
Observable.fromEvent(window, 'DOMContentLoaded').subscribe(main.onDOMContentLoaded);
