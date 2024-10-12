const express = require('express');



const authenticate = require('../middlewares/authenticate.js');
const getAllRooms = require('../controllers/getAllRooms.js');
const getStudio = require('../controllers/getStudioData.js');
const getAllUsers = require('../controllers/users/getAllUsers.js');
const getOwnProfile = require('../controllers/users/getOwnProfile.js');
const register = require('../controllers/auth/register.js');
const login = require('../controllers/auth/login.js');
const { getAllBookings } = require('../controllers/booking/getAllBooking.js');
const { createBooking } = require('../controllers/booking/creatBooking.js');
const { getUserBookings } = require('../controllers/booking/getUserBookings.js');
const { deleteBooking } = require('../controllers/booking/deleteOneBooking.js');


const router = express.Router();



router.get('/rooms', getAllRooms);
router.get('/studio', getStudio);
router.get('/users', getAllUsers);
router.get('/profile', authenticate,  getOwnProfile);
router.post('/register', register)
router.post('/login', login)
router.get('/bookings', getAllBookings)
router.post('/new-booking', authenticate, createBooking)
router.get('/own-bookings' , authenticate, getUserBookings )
router.delete('/delete-booking/:id', authenticate, deleteBooking);

module.exports = router;