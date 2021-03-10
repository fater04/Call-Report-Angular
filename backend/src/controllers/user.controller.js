const db = require("../models/sequelize");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
var authJwt = require("./authJwt.controller");
const User = db.user;
const Device = db.device;
const Attribut = db.attribut_device;
const userController = {};

userController.checkDuplicatePseudoOrEmail = async (req, res, next) => {
    await User.findOne({
        where: {
            pseudo: req.body.pseudo
        }
    }).then(user => {
        if (user) {
            res.status(400).send({
                message: "Failed! Username is already in use!"
            });
            return;
        }

        User.findOne({
            where: {
                email: req.body.email
            }
        }).then(user => {
            if (user) {
                res.status(400).send({
                    message: "Failed! Email is already in use!"
                });
                return;
            }

            next();
        });
    });
};

userController.signup = async (req, res) => {
    await User.create({
        pseudo: req.body.pseudo,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        role: req.body.role ? req.body.role : 'user'
    }).then(user => {
        res.status(200).send(user);
    }).catch(err => {
        res.status(500).send({message: err.message});
    });
};

userController.signin = async (req, res) => {
    await User.findOne({
        where: {
            pseudo: req.body.pseudo
        }
    }).then(user => {
        if (!user) {
            return res.status(404).send({message: "User Not found."});
        }
        var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) {
            return res.status(401).send({accessToken: null, message: "Invalid Password!"});
        }
        var token = jwt.sign({id: user.id}, authJwt.secret, {
            expiresIn: 86400 // 24 hours
        });

        res.status(200).send({
            id: user.id,
            pseudo: user.pseudo,
            email: user.email,
            role: user.role,
            accessToken: token
        });
    })
        .catch(err => {
            res.status(500).send({message: err.message});
        });
};

userController.findAll =  (req, res) => {
    User.findAll({
        attributes: {exclude: ['password']}
    }).then(data => {
        res.status(200).send(data);
    })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users."
            });
        });
};

userController.findOne = async (req, res) => {
    const id = req.params.id;
    await User.findByPk(id)
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users."
            });
        });
};

userController.delete = async (req, res) => {
    const id = req.params.id;

    await User.destroy({
        where: {id: id}
    })
        .then(num => {
            if (num == 1) {
                res.status(200).send({
                    message: "User was deleted successfully!"
                });
            } else {
                res.status(204).send({
                    message: `Cannot delete user with id=${id}. `
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Users with id=" + id
            });
        });
};

userController.update = async (req, res) => {
    const id = req.params.id;

    await User.update(req.body, {
        where: {id: id}
    }).then(num => {
        if (num == 1) {
            res.status(200).send({
                message: "User was updated successfully."
            });
        } else {
            res.status(304).send({
                message: `Cannot update User with id=${id}. `
            });
        }
    })
        .catch(err => {
            res.status(500).send({
                message: "Error updating User with id=" + id
            });
        });
};

userController.upload_avatar = async (req, res) => {
    const id = req.body.id;
    const data = {
        id: req.body.id,
        avatar: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    }
    await User.update(data, {
        where: {id: id}
    }).then(num => {
        if (num == 1) {
            res.status(200).send({
                message: "User avatar  successfully upload."
            });
        } else {
            res.status(304).send({
                message: `Cannot upload User avatar `
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: "Error uploading avatar "
        });
    });
};

userController.create = async (req, res) => {
    await User.create({
        nomcomplet:req.body.nomcomplet,
        pseudo: req.body.pseudo,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        role: req.body.role ? req.body.role : 'user'
    }).then(user => {
        res.status(200).send(user);
    }).catch(err => {
        res.status(500).send({message: err.message});
    });
};

userController.findAllWithUser = async (req, res) => {
    await User.findAll({
        include: [{
            model: Device,
            attributes: ['phone', 'code', 'createdAt', 'updatedAt'],
            include: [{
                model: Attribut,
                as: 'attribut',
                attributes: ['marque', 'modele', 'reseau', 'pays', 'connection', 'batterie', 'signal', 'wifi', 'latitude', 'longitude', 'updatedAt']
            }]
        }],
        attributes: {exclude: ['password', 'userId']}
    }).then(data => {
        res.status(200).send(data);
    })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving device."
            });
        });
};


module.exports = userController;
