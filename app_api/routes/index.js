const express = require("express");
const router = express.Router();

const tripsController = require("../controllers/trips");

router
    .route("/trips")
    .get(tripsController.tripsList)
    .post(authenticateJWT, tripsController.tripsAddTrip);
// .delete(tripsController.tripsDeleteTrip);

router
    .route("/trips/:tripCode")
    .get(tripsController.tripsFindCode)
    .put(authenticateJWT, tripsController.tripsUpdateTrip)
    .delete(tripsController.tripsDeleteTrip);

module.exports = router;