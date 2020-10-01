const express = require('express');
const {
  createReservation,
  getOwnReservations,
  deleteReservation,
  updateReservation,
} = require('../controllers');

const { authMiddleware } = require('../middlewares');
const router = express.Router();

router.post('/', authMiddleware, createReservation);

router.get('/me', authMiddleware, getOwnReservations);

router.put('/', authMiddleware, updateReservation);

router.delete('/:reservationID', authMiddleware, deleteReservation);

module.exports = router;
