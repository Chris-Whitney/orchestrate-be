const { fetchVenues, postVenue, deleteVenue, fetchSingleVenue, patchSingleVenue} = require('../Models/venues.model');


exports.getVenues = (req, res, next) => {
    fetchVenues().then((venues) => {
        res.status(200).send({ venues })
    }).catch(err => {
        next(err)
    })
};

exports.saveVenue = (req, res, next) => {
    postVenue(req.body).then((venue) => {
        res.status(201).send({ venue })
    }).catch(err => {
        next(err)
    })
};

exports.removeVenue = (req, res, next) => {
    deleteVenue(req.body).then(() => {
        res.status(204).send({})
    }).catch(err => {
        next(err)
    })
}
exports.getSingleVenue = (req, res, next) => {
    fetchSingleVenue(req.params).then((venue) => {
        res.status(200).send({ venue })
    }).catch(err => {
        next(err)
    })
};

exports.amendSingleVenue = (req, res, next) => {
    patchSingleVenue(req.params, req.body).then((patch) => {
        res.status(200).send({patch})
    })
}