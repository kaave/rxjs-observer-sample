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
    const message = 'WELCOMETONAGOYAJS#4 2018/02/25!';
    Observable.easing({ type: 'ease-out-expo', durationMSec: 20000, end: message.length - 1 })
      .map(value => Math.floor(value))
      .distinct()
      .subscribe(index => {
        main.innerText = message[index];
      });
  }
}

const main = new Main();
Observable.fromEvent(window, 'DOMContentLoaded').subscribe(main.onDOMContentLoaded);
