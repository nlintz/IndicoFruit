/**
 * Module dependencies
 */
var express = require('express');
var indexController = require('../controllers/index');
var fruitController = require('../controllers/fruit');
var alertController = require('../controllers/alert');
var lastUpdateController = require('../controllers/lastUpdate')

/**
 * the new Router exposed in express 4
 * the indexRouter handles all requests to the `/` path
 */
var indexRouter = express.Router();

/**
 * this accepts all request methods to the `/` path
 */
indexRouter.route('/')
  .all(indexController.index);

indexRouter.route('/fruit')
  .get(fruitController.index)

indexRouter.route('/fruit/:fruit_name')
  .get(fruitController.show)

indexRouter.route('/fruit/:fruit_name')
  .put(fruitController.update)

indexRouter.route('/last_update')
  .get(lastUpdateController.index)

indexRouter.route('/last_update')
  .put(lastUpdateController.update)

indexRouter.route('/alert')
  .get(alertController.index)

indexRouter.route('/alert')
  .post(alertController.create)

indexRouter.route('/alert')
  .delete(alertController.destroy)

exports.indexRouter = indexRouter;
