const jwt = require('jsonwebtoken');
const fs = require('fs');
const Sauce = require('../models/sauce');

exports.createSauce = (req, res, next) => {
    const data = JSON.parse(req.body.sauce)

    const file = 'http://localhost:3000/' + req.file.path

    const sauce = new Sauce({
        name: data.name,
        manufacturer: data.manufacturer,
        description: data.description,
        imageUrl: file,
        mainPepper: data.mainPepper,
        heat: data.heat,
        userId: data.userId
    });


    sauce.save()
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

exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({
        _id: req.params.id
    }).then(
        (sauce) => {
            res.status(200).json(sauce);
        }
    ).catch(
        (error) => {
            res.status(404).json(error);
        }
    );
};

exports.modifySauce = (req, res, next) => {

    let data = req.body.sauce

    if (req.body.sauce) {

        data = JSON.parse(req.body.sauce)
        data.imageUrl = 'http://localhost:3000/' + req.file.path
    }

    Sauce.updateOne({ _id: req.params.id }, data).then(
        () => {
            res.status(201).json({
                message: 'Sauce updated successfully!'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json(error);
        }
    );
};

exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id }).then(
        (sauce) => {
            if (!sauce) {
                return res.status(404).json({
                    error: new Error('Objet non trouvé !')
                });
            }
            if (sauce.userId !== req.auth.userId) {
                return res.status(401).json({
                    error: new Error('Requête non autorisée !')
                });
            }
            Sauce.deleteOne({ _id: req.params.id }).then(
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

exports.getAllSauces = (req, res, next) => {
    Sauce.find({}).then(
        (sauces) => {
            console.log(req.body);
            res.status(200).json(sauces);
        }
    ).catch(
        (error) => {
            res.status(400).json(error);
        }
    );
};

exports.userLikes = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id})
        .then(sauce => {
            const userId = req.body.userId
            const like = req.body.like

            if (like === 1) {
                sauce.usersLiked.push(userId)
            } else if (like === 0) {
                const userLikedIndex = sauce.usersLiked.indexOf(userId)

                if (userLikedIndex >= 0) {
                    sauce.usersLiked.splice(userLikedIndex, 1)
                }
                else {
                    const userDislikedIndex = sauce.usersDisliked.indexOf(userId)
                    
                    sauce.usersDisliked.splice(userDislikedIndex, 1)
                }
            }
            else {
                sauce.usersDisliked.push(userId)
            }
            sauce.save().then(savedDoc => {
                res.status(200).json({message: 1});
            }).catch (
                (error) => {
                    res.status(400).json(error);
                }
            );
        }) 
} 

