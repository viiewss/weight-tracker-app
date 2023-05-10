const WeightEntry = require('../models/WeightEntry');

// Add a weight entry for the current user
async function addWeightEntry(req, res) {
  const { weight, date } = req.body;
  const { _id } = req.user;

  try {
    const newWeightEntry = new WeightEntry({
      weight,
      date,
      user: _id,
    });

    await newWeightEntry.save();

    res.status(201).send('Weight entry created');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}

// Get all weight entries for the current user
async function getAllWeightEntries(req, res) {
  const { _id } = req.user;

  try {
    const weightEntries = await WeightEntry.find({ user: _id }).sort({
      date: 1,
    });

    res.json(weightEntries);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}

module.exports = {
  addWeightEntry,
  getAllWeightEntries,
};
