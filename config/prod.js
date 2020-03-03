const HOST = 'https://app.distinctclinic.com';
const IMG_HOST = 'https://file-storage.distinctclinic.com/distinct-wxmp/static/img/';

module.exports = {
  env: {
    NODE_ENV: '"production"'
  },
  defineConstants: {
    HOST: HOST,
    IMG_HOST: IMG_HOST
  },
  mini: { },
  h5: {}
}
