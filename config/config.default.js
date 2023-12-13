/* eslint valid-jsdoc: "off" */

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1702386800370_2721';

  // add your middleware config here
  config.middleware = ['errorHandler'];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.mongoose = {
    client: {
      url: 'mongodb://127.0.0.1/express_video',
      options: {},
      pulgins: [],
    },
  };

  config.security = {
    csrf: {
      enable: false,
    },
  };

  config.jwt = {
    secret: 'wk',
    expiresIn: '1d'
  }

  return {
    ...config,
    ...userConfig,
  };
};
