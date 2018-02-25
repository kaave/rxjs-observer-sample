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
      bpm: 91,
      pattern: 'x--xx---|xx-xx---|x--xx---|xx-xx---',
      quantize(index: number, msec: number) {
        const beatIndex = index % 16 + 1;
        switch (beatIndex) {
          case 4:
            return msec * 0.4;
          case 5:
            return msec * 0.3;
          case 12:
            return msec * 0.2;
          default:
            return 0;
        }
      },
    })
      .map((_, index) => index)
      .subscribe(index => {
        console.log(new Date().getTime(), index);
        if (message[index]) {
          main.innerText = message[index];
        }
      });
  }
}

const main = new Main();
Observable.fromEvent(window, 'DOMContentLoaded').subscribe(main.onDOMContentLoaded);
