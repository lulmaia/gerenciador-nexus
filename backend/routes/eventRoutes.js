const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const holidayController = require('../controllers/holidayController');

router.get('/events', eventController.getAllEvents);
router.post('/events', eventController.createEvent);
router.put('/events/:id', eventController.updateEvent);
router.delete('/events/:id', eventController.deleteEvent);

router.get('/holidays/:year', holidayController.getHolidays);

module.exports = router;