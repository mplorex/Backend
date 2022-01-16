const jwt = require('jsonwebtoken');
const fs = require('fs');
const Thing = require('../models/thing');

exports.createThing = (req, res, next) => {
    console.log(req.file)
    //not thing, sauce
    const data = JSON.parse(req.body.sauce)

    const file = 'http://localhost:3000/' + req.file.path

    const thing = new Thing({
        name: data.name,
        manufacturer: data.manufacturer,
        description: data.description,
        imageUrl: file,
        mainPepper: data.mainPepper,
        heat: data.heat,
        userId: data.userId
    });


    thing.save()
        .then(() => {
            res.status(201).json({
                message: 'Post saved successfully!'
            });
        }
        ).catch(
            (error) => {
                res.status(400).json(error);
            }
        );
};

exports.getOneThing = (req, res, next) => {
    Thing.findOne({
        _id: req.params.id
    }).then(
        (thing) => {
            res.status(200).json(thing);
        }
    ).catch(
        (error) => {
            res.status(404).json(error);
        }
    );
};

exports.modifyThing = (req, res, next) => {
    const thing = new Thing({
        name: req.body.name,
        manufacturer: req.body.manufacturer,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        mainPepper: req.body.mainPepper,
        heat: req.body.mainPepper
    });
    Thing.updateOne({ _id: req.params.id }, thing).then(
        () => {
            res.status(201).json({
                message: 'Thing updated successfully!'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json(error);
        }
    );
};

exports.deleteThing = (req, res, next) => {
    Thing.findOne({ _id: req.params.id }).then(
        (thing) => {
            if (!thing) {
                return res.status(404).json({
                    error: new Error('Objet non trouvé !')
                });
            }
            if (thing.userId !== req.auth.userId) {
                return res.status(401).json({
                    error: new Error('Requête non autorisée !')
                });
            }
            Thing.deleteOne({ _id: req.params.id }).then(
                () => {
                    res.status(200).json({
                        message: 'Deleted!'
                    });
                }
            ).catch(
                (error) => {
                    res.status(400).json(error);
                }
            );
        }
    );
};

exports.getAllStuff = (req, res, next) => {
    Thing.find({}).then(
        (things) => {
            console.log(req.body);
            res.status(200).json(things);
        }
    ).catch(
        (error) => {
            res.status(400).json(error);
        }
    );
};
