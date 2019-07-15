import {settingsStorage} from 'settings';
import {me} from 'companion';
import * as messaging from 'messaging';

const KEY_BACKGROUND = 'bgColor';
const KEY_FOREGROUND = 'fgColor';
const KEY_SHOW_BATTERY = 'showBattery';
const KEY_DIM_BATTERY = 'dimBattery';

settingsStorage.onchange = (evt) => {
  console.log('settings onchange', JSON.stringify(evt));
  sendValue(evt.key, evt.newValue);
}

const sendValue = (key, val) => {
  console.info(key, val);
  if (val !== null) {
    sendSettingData({
      key: key,
      value: JSON.parse(val)
    });
  }
}

const updateAll = () => {
  sendValue(KEY_BACKGROUND, settingsStorage.getItem(KEY_BACKGROUND));
  sendValue(KEY_FOREGROUND, settingsStorage.getItem(KEY_FOREGROUND));
  sendValue(KEY_SHOW_BATTERY, settingsStorage.getItem(KEY_SHOW_BATTERY));
  sendValue(KEY_DIM_BATTERY, settingsStorage.getItem(KEY_DIM_BATTERY));
}

const sendSettingData = (data) => {
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    messaging.peerSocket.send(data);
  } else {
    console.log('no peerSocket connection');
  }
}

// Defaults
// console.log(settingsStorage.getItem(KEY_BACKGROUND));
// if (!settingsStorage.getItem(KEY_BACKGROUND)) {
//   console.info(`Setting default for ${KEY_BACKGROUND}`);
//   settingsStorage.setItem(KEY_BACKGROUND, JSON.stringify('#000000'));
// }
// console.log(settingsStorage.getItem(KEY_FOREGROUND));
// if (!settingsStorage.getItem(KEY_FOREGROUND)) {
//   console.info(`Setting default for ${KEY_FOREGROUND}`);
//   settingsStorage.setItem(KEY_FOREGROUND, JSON.stringify('#FFFFFF'));
// }
// console.log(settingsStorage.getItem(KEY_SHOW_BATTERY));
// if (!settingsStorage.getItem(KEY_SHOW_BATTERY)) {
//   console.info(`Setting default for ${KEY_SHOW_BATTERY}`);
//   settingsStorage.setItem(KEY_SHOW_BATTERY, true);
// }
// console.log(settingsStorage.getItem(KEY_DIM_BATTERY));
// if (!settingsStorage.getItem(KEY_DIM_BATTERY)) {
//   console.info(`Setting default for ${KEY_DIM_BATTERY}`);
//   settingsStorage.setItem(KEY_DIM_BATTERY, true);
// }

if (me.launchReasons.settingsChanged) {
  console.log('settings changed without companion');
  updateAll();
}

// messaging.peerSocket.onmessage = (evt) => {
//   console.info(JSON.stringify(evt));
//   switch (evt.data.key) {
//     case 'INIT':
//       if (messaging.peerSocket.readyState == messaging.peerSocket.OPEN) {
//         console.info('calling update');
//         updateAll();
//       } else {
//         console.info('setting listener');
//         messaging.peerSocket.onopen = updateAll;        
//       }
//   }
// }