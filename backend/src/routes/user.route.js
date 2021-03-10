const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const validate = require('../controllers/verification.controller');
const auth = require('../controllers/authJwt.controller');
const versionApi = '/api/v1/user/';

router.post(`${versionApi}auth/signup`, [validate.checkAddUser, userController.checkDuplicatePseudoOrEmail], userController.signup);
router.post(`${versionApi}auth/signin`, userController.signin);
router.get(`${versionApi}`, auth.verifyToken, userController.findAll);
router.get(`${versionApi}:id`, userController.findOne);
router.delete(`${versionApi}:id`, userController.delete);
router.put(`${versionApi}:id`, userController.update);
router.post(`${versionApi}`, userController.create);
router.post(`${versionApi}avatar`, [validate.multer], userController.upload_avatar);
router.get(`${versionApi}device/all`, userController.findAllWithUser);
module.exports = router;
