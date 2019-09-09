const redis = require("async-redis");
let cache;
if (process.env.REDIS_HOST) {
  cache = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_HOST);
} else {
  cache = redis.createClient();
}


module.exports = cache;