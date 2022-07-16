const productRouter = require('./productRouter.js');

function route(app) {
  app.use('/products', productRouter);
}

module.exports = route;
