import $ from 'jquery';

import notice from 'libraries-frontend-framelunch/js/notice';

const $window = $(window);

export function subscribeOnScrollEvent({ intervalMSec } = { intervalMSec: 300 }) {
  let lastTopPosition = 0;

  $window.on('scroll', () => {
    const top = $window.scrollTop();
    lastTopPosition = top;
    if (top !== 0) {
      notice.publish('scroll', [top]);
    } else {
      setTimeout(() => {
        if (lastTopPosition === 0) {
          notice.publish('scroll', [lastTopPosition]);
        }
      }, intervalMSec);
    }
  });
  notice.publish('scroll', [$window.scrollTop()]);
}

export function subscribeOnResizeEvent({ intervalMSec } = { intervalMSec: 300 }) {
  let timerID;

  $window.on('resize', () => {
    clearTimeout(timerID);
    timerID = setTimeout(() => notice.publish('resize', [$window]), intervalMSec);
  });
  notice.publish('resize', [$window]);
}

export default function subscriveEvents() {
  subscribeOnScrollEvent();
  subscribeOnResizeEvent();
}
