'use strict';
const {check, validationResult} = require('express-validator');
const multer = require('multer');
const validate = {};

validate.checkUserId = [
    check('id').isNumeric(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(422).json({errors: errors.array()});
        next();
    },
];
validate.checkId = [
    check('id')
        .exists().withMessage('id require').bail()
        .isNumeric().withMessage('id is a numeric value').bail(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(422).json({errors: errors.array()});
        next();
    },
];
validate.checkCode = [
    check('code')
        .exists().withMessage('Code require').bail(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(422).json({errors: errors.array()});
        next();
    },
];
validate.checkAddUser = [
    check('nomcomplet').optional()
        .isLength({min: 4, max: 30}).withMessage('le nom  doit contenir au moins 4 caractères'),
    check('pseudo')
        .exists().withMessage('le pseudo est obligatoire ').bail()
        .isLength({min: 5, max: 30}).withMessage('le pseudo  doit contenir au moins 5 caractères'),
    check('email')
        .exists().withMessage('l\'adresse mail est obligatoire ').bail()
        .isEmail().withMessage('entrer une adresse email correct !'),
    check('phone').optional()
        .isMobilePhone('any').withMessage('entrer un numero de telephone valide!'),
    check('role').optional()
        .isIn(['user', 'admin', 'super-admin', 'User', 'Admin', 'Super-Admin', 'Super-admin']).withMessage('le role est incorrect'),
    check('avatar').optional()
        .isLength({min: 5, max: 150}).withMessage('chaine de caractere invalid'),
    check('status').optional()
        .isNumeric().withMessage('status incorrect'),
    check('password')
        .exists().withMessage('le mot de passe est obligatoire ')
        .bail()
        .isAlphanumeric().withMessage('le mot de passe doit contenir des lettres et des chiffres')
        .bail()
        .isLength({min: 6}).withMessage('le mot de passe doit contenir au moins 6 caracteres '),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(422).json({errors: errors.array()});
        next();
    },
];
validate.checkUpdateUser = [
    check('id').isNumeric().withMessage('id incorrect'),
    check('nomcomplet').optional()
        .isLength({min: 4, max: 30}).withMessage('le nom  doit contenir au moins 4 caractères'),
    check('pseudo')
        .optional()
        .isLength({min: 5, max: 30}).withMessage('le prenom  doit contenir au moins 5 caractères'),
    check('email')
        .optional()
        .isEmail().withMessage('entrer une adresse email correct !'),
    check('phone').optional()
        .isMobilePhone('any').withMessage('entrer un numero de telephone valide!'),
    check('role').optional()
        .isIn(['user', 'admin', 'super-admin', 'User', 'Admin', 'Super-Admin', 'Super-admin']).withMessage('le role est incorrect'),
    check('password')
        .optional()
        .isAlphanumeric().withMessage('le mot de passe doit contenir des lettres et des chiffres')
        .bail()
        .isLength({min: 6}).withMessage('le mot de passe doit contenir au moins 6 caracteres '),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(422).json({errors: errors.array()});
        next();
    },
];

//uplload file
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images');
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        callback(null, Date.now() + name);
    }
});
validate.multer = multer({storage: storage}).single('avatar');


module.exports = validate;
