const productRouter = require('./productRouter.js');
const accountRouter = require('./accountRouter.js');

function route(app) {
  app.use('/products', productRouter);
  app.use('/account', accountRouter);
}

module.exports = route;
