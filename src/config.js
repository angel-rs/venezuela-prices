import * as packageJSON from '../package.json';

const Config = {
  version: `v${packageJSON.version}`,
  proxy: 'https://cors-anywhere.herokuapp.com/',
}

export { Config };
