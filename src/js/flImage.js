/* eslint import/first: off */
import './common/initializer';
import { format } from 'date-fns';
import * as Rx from 'rxjs';
import 'rxjs-easing-observer/add/easing';
import 'rxjs-easing-observer/add/bouncing';
import 'rxjs-easing-observer/add/sequencer';

import getImageObserver from './modules/getImages';

const { Observable } = Rx;

class Main {
  constructor() {
    this.onDOMContentLoaded = this.onDOMContentLoaded.bind(this);
  }

  onDOMContentLoaded() {
    const imageObserver = getImageObserver();
    const main = document.querySelector('.Main');

    imageObserver.subscribe(data => {
      this.elements = data.map((imageUrl, i) => {
        const imageElement = document.createElement('div');
        imageElement.className = 'Image';
        imageElement.style.backgroundImage = `url(${imageUrl})`;
        imageElement.setAttribute('hidden', '');
        imageElement.setAttribute('data-id', i.toString());
        main.appendChild(imageElement);
        return imageElement;
      });
      this.subscribe();
    });
  }

  subscribe() {
    let lastIndex = -1;
    Observable.sequencer({
      bpm: 91,
      pattern: 'x--xx---|xx-xx---|x--xx---|xx-xx---',
      /** ヨレっぷりをプログラミング */
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
        this.elements[index].removeAttribute('hidden');
        if (this.elements[lastIndex]) {
          (el => setTimeout(() => el.setAttribute('hidden', ''), 200))(this.elements[lastIndex]);
        }
        lastIndex = index;
      });
  }
}

const main = new Main();
Observable.fromEvent(window, 'DOMContentLoaded').subscribe(main.onDOMContentLoaded);
