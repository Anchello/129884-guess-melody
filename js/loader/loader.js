import {adaptServerData} from '../data/data-adapter';

const SERVER_URL = `https://es.dump.academy/guess-melody`;
const APP_ID = 22101985;
const DEFAULT_NAME = `Kek-pek`;

const checkStatus = (response) => {
  if (response.ok) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

const toJSON = (res) => res.json();

export default class Loader {
  static loadData() {
    return fetch(`${SERVER_URL}/questions`).then(checkStatus).then(toJSON).then(adaptServerData);
  }

  static loadResults() {
    return fetch(`${SERVER_URL}/stats/${APP_ID}-${DEFAULT_NAME}`).then(checkStatus).then(toJSON);
  }

  static saveResults(data) {
    const requestSettings = {
      body: JSON.stringify(data),
      headers: {
        'Content-Type': `application/json`
      },
      method: `POST`
    };
    return fetch(`${SERVER_URL}/stats/${APP_ID}-${DEFAULT_NAME}`, requestSettings).then(checkStatus);
  }
}
