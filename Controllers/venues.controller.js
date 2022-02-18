const {fetchVenues} = require('../Models/venues.model');

exports.getVenues = (req, res, next) => {
    fetchVenues().then((venues) => {
        res.status(200).send({venues})
    })
}