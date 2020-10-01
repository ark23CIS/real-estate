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
    console.error(err.message);
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
    console.error(err.message);
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
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.deleteReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findOneAndRemove({ _id: req.params.reservationID });
    res.json(reservation);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
