const mongoose = require("mongoose");
const Trip = mongoose.model("trips");

// GET: /trips - lists all the trips
const tripsList = async (req, res) => {
    Trip
        .find({})
        .exec((err, trips) => {
            if (!trips) {
                return res
                    .status(404)
                    .json({ "message": "trip not found" });
            } else if (err) {
                return res
                    .status(404)
                    .json(err);
            } else {
                return res
                    .status(200)
                    .json(trips)
            }
        });
};

// GET: /trips/:tripCode - return a single trip
const tripsFindCode = async (req, res) => {
    Trip
        .find({ "code": req.params.tripCode })
        .exec((err, trips) => {
            if (!trips) {
                return res
                    .status(404)
                    .json({ "message": "trip not found" });
            } else if (err) {
                return res
                    .status(404)
                    .json(err);
            } else {
                return res
                    .status(200)
                    .json(trips)
            }
        });
};

// POST: /trips/:tripCode - add a single trip
const tripsAddTrip = async(req, res) => {
    const newTrip = new Trip({
        code: req.body.code,
        name: req.body.name,
        length: req.body.length,
        start: req.body.start,
        resort: req.body.resort,
        perPerson: req.body.perPerson,
        image: req.body.image,
        description: req.body.description
    });

    const q = await newTrip.save();

        if (!q)
        { // Database returned no data
            return res
                .status (400)
                /json(err);
        } else { // Return resulting updated trip
            return res
                .status(201)
                .json(q);
        
        }

        //Uncomment the following line to show results of operation on the console
        //console.log(q)
};

// PUT: /trips/:tripCode - update a single trip
const tripsUpdateTrip = async (req, res) => {
    //Uncomment for debugging
    console.log(req.params);
    console.log(req.body);

    const q = await Model
        .findOneAndUpdate(
            { 'code' : req.params.tripCode },
            {
                code: req.body.code,
                name: req.body.name,
                length: req.body.length,
                start: req.body.start,
                resort: req.body.resort,
                perPerson: req.body.perPerson,
                image: req.body.image,
                description: req.body.description
            }
        )
        .exec();

        if (!q)
        { // Database returned no data
            return res
                .status (400)
                /json(err);
        } else { // Return resulting updated trip
            return res
                .status(201)
                .json(q);
        
        }

        //Uncomment the following line to show results of operation on the console
        //console.log(q)
};

// DELETE: /trips/- delete a single trip
const tripsDeleteTrip = async (req, res) => {
    console.log(req.body);
    Trip
        .deleteOne({ code: req.params.tripCode }), (err) => {
            if (err) {
                return res.status(404).json(err);
            } else {
                return res.status(204).json({ message: 'Trip deleted successfully' });
            }
        };
};

module.exports = {
    tripsList,
    tripsFindCode,
    tripsAddTrip,
    tripsUpdateTrip,
    tripsDeleteTrip
};