const express = require('express');
const router = express.Router();
const { getTrends, searchPlaces } = require('../controllers/trendsController');

router.post('/', getTrends);
router.get('/places', searchPlaces);

module.exports = router;
// This file defines the routes for the trends API.
// It uses the Express router to handle POST requests for getting trends