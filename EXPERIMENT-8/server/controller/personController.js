
import Person  from '../models/personModel.js';
export const getPeople = async (req, res) => {
  try {
    const people = await Person.find();
    res.json(people);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const addPerson = async (req, res) => {
  try {
    const person = await Person.create(req.body);
    res.json(person);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deletePerson = async (req, res) => {
  try {
    await Person.findByIdAndDelete(req.params.id);
    res.json({ message: "Person deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
