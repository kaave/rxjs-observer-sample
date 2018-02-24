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
    Observable.bouncing({ height: 500, gravity: 0.9 })
      .map((_, index) => index)
      .subscribe(index => {
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
