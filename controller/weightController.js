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
    let weightEntries = await WeightEntry.find({ user: _id }).sort({ date: 1 });

    // Add the id of each weight entry to the response.
    weightEntries = weightEntries.map((entry) => ({
      id: entry._id,
      date: entry.date,
      weight: entry.weight,
    }));

    res.json(weightEntries);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}

async function deleteWeightEntry(req, res) {
  const { _id } = req.user;
  const { id } = req.params;

  try {
    const weightEntry = await WeightEntry.findOne({ _id: id, user: _id });

    if (!weightEntry) {
      return res.status(404).send('Weight entry not found');
    }

    await weightEntry.deleteOne();
    res.status(200).send('Weight entry deleted');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}

module.exports = {
  addWeightEntry,
  getAllWeightEntries,
  deleteWeightEntry,
};
