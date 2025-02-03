// export const configRedis = {
//   host: 'localhost', // Redis server host (or your container IP)
//   port: 6379, // Redis server port
// };

export const configRedis = {
  type: 'single',
  url: 'redis://localhost:6379',
};
