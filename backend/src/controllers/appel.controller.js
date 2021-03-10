const db = require("../models/sequelize");
const Appel = db.appel;
const appelController = {};


appelController.findAll = async (req, res) => {
    const id = req.params.id;
    await Appel.findAll({
        attributes: {exclude: ['UserId']},
        where: {userId: id},
    }).then(data => {
        res.status(200).send(data);
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving Appel."
        });
    });
};

appelController.findOne = async (req, res) => {
    const id = req.params.id;
    await Appel.findOne({
        where: {id: id},
        attributes: {exclude: ['UserId']}
    }).then(data => {
        res.status(200).send(data);
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving appels."
        });
    });
};

appelController.update = async (req, res) => {
    const id = req.params.id;
    await Appel.update(req.body, {
        where: {id: id}
    }).then(num => {
        if (num == 1) {
            res.status(200).send({
                message: "Appel was updated successfully."
            });
        } else {
            res.status(304).send({
                message: `Cannot update Appel with id=${id}. `
            });
        }
    })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Appel with id=" + id
            });
        });
};


appelController.create = async (req, res) => {
    const id = req.params.id;
    await Appel.create({
        UserId: id,
        nom:req.body.nom,
        prenom:req.body.prenom,
        telephone:req.body.telephone,
        institution:req.body.institution,
        identite:req.body.identite,
        question:req.body.questions,
        action:req.body.action,
        remarque:req.body.remarque,
        suivi:req.body.suivi,
        suggestion:req.body.suggestion,
    }).then(appel => {
        res.status(200).send(appel);
    }).catch(err => {
        res.status(500).send({message: err.message});
    });
};

appelController.delete = async (req, res) => {
    const id = req.params.id;
    await Appel.destroy({
        where: {id: id}
    })
        .then(num => {
            if (num == 1) {
                res.status(200).send({
                    message: "Appel was deleted successfully!"
                });
            } else {

                res.status(204).send({
                    message: "Cannot delete appel with id=" + id
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete appel with id=" + id
            });
        });
};

module.exports = appelController;
