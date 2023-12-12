/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
};

// eslint-disable-next-line eggache/no-override-exports
module.exports.mongoose = {
  enable: true,
  package: 'egg-mongoose',
};

// eslint-disable-next-line eggache/no-override-exports
module.exports.validate = {
  enable: true,
  package: 'egg-validate',
};
