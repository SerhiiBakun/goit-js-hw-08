import Vimeo from '@vimeo/player';
import throttle from 'lodash.throttle';
import { save, load } from './storage.js';

const vimeoPlayer = document.querySelector('#vimeo-player');
const player = new Vimeo(vimeoPlayer);
const TIME_KEY = 'videoplayer-current-time';
const startTime = load(TIME_KEY);

player.on('timeupdate', throttle(getTime, 1000));

if (startTime) {
  player
    .setCurrentTime(startTime.seconds)
    .then(function (seconds) {})
    .catch(function (error) {
      switch (error.name) {
        case 'RangeError':
          break;
        default:
          break;
      }
    });
}

function getTime(data) {
  save(TIME_KEY, data);
}
