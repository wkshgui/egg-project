const Redis = require('ioredis');
const redis = new Redis(6379, '127.0.0.1', {password: 'root'});

redis.on("error", err => {
    if(err) {
        console.log('Redis连接失败');
        redis.quit();
    }
});

redis.on("ready", () => {
    console.log("Redis连接成功");
});

module.exports.redis = redis;