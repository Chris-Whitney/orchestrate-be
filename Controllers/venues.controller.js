const { fetchVenues, postVenue, deleteVenue, fetchSingleVenue } = require('../Models/venues.model');


exports.getVenues = (req, res, next) => {
    fetchVenues().then((venues) => {
        res.status(200).send({ venues })
    })
};

exports.saveVenue = (req, res, next) => {
    postVenue(req.body).then((venue) => {
        res.status(201).send({ venue })
    })
};

exports.removeVenue = (req, res, next) => {
    deleteVenue(req.body).then(() => {
        res.status(204).send({})
    })
}
exports.getSingleVenue = (req, res, next) => {
    fetchSingleVenue(req.params).then((venue) => {
        res.status(200).send({ venue })
    })
}