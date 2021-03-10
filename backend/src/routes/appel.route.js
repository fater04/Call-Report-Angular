const express = require('express');
const router = express.Router();
const appelController = require('../controllers/appel.controller');
const validate = require('../controllers/verification.controller');
const auth = require('../controllers/authJwt.controller');
const versionApi = '/api/v1/appel/';

router.get(`${versionApi}all/:id`, appelController.findAll);
router.get(`${versionApi}:id`, appelController.findOne);
router.delete(`${versionApi}:id`,  appelController.delete);
router.put(`${versionApi}:id`,  appelController.update);
router.post(`${versionApi}:id`,   appelController.create);

module.exports = router;
