const { Reservation, Estate } = require('../models');

exports.createReservation = async (req, res) => {
  try {
    const { owner, possibleClient, estate } = req.body;
    const reservation = await Reservation.find({ $and: [{ possibleClient }, { estate }] });
    if (reservation.length) {
      return res.status(400).json({ error: 'Reservation already exists' });
    }
    let newReservation = new Reservation({ owner, possibleClient, estate });
    await newReservation.save();
    newReservation = await Reservation.populate(newReservation, [
      { path: 'estate', model: 'estate', populate: { path: 'user', model: 'user' } },
      {
        path: 'owner',
        model: 'user',
        select: ['firstName', 'lastName', '_id'],
      },
      {
        path: 'possibleClient',
        model: 'user',
        select: ['firstName', 'lastName', '_id'],
      },
    ]);
    res.json(newReservation);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

exports.getOwnReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find({
      $or: [{ owner: req.user.id }, { possibleClient: req.user.id }],
    })
      .populate('owner possibleClient', '_id firstName lastName')
      .populate({ path: 'estate', model: 'estate', populate: { path: 'user', model: 'user' } });
    res.json(reservations);
  } catch (error) {
    res.status(500).send('Server Error');
  }
};

exports.updateReservation = async (req, res) => {
  try {
    const { reservationID, status } = req.body;
    const reservation = await Reservation.findOneAndUpdate(
      { _id: reservationID },
      { $set: { status } },
      { new: true },
    )
      .populate('owner possibleClient', '_id firstName lastName')
      .populate({ path: 'estate', model: 'estate', populate: { path: 'user', model: 'user' } });
    if (status === 'accepted') {
      await Estate.findOneAndUpdate({ _id: reservation.estate._id }, { $set: { visible: false } });
    }
    res.json(reservation);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

exports.deleteReservation = async (req, res) => {
  try {
    let reservation = await Reservation.findOne({ _id: req.params.reservationID });
    reservation = {
      reservation:
        reservation.status === 'pending'
          ? await Reservation.findOneAndRemove({ _id: req.params.reservationID })
          : null,
      status:
        reservation.status === 'pending'
          ? 'Successfully deleted'
          : 'Not an appropriate status to delete the renter',
    };
    res.json(reservation);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};
