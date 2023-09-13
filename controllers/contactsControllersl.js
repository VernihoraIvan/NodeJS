const {
  getContacts,
  addContact,
  removeContact,
} = require("../servisces/contactServices");

const getContactController = async (req, res) => {
  const result = await getContacts();
  res.json(result);
};

const addContactController = async (req, res) => {
  const result = await addContact(req.body);
  res.status(201).json(result);
};

const removeContactController = async (req, res) => {
  const { contactId } = req.params;
  const result = await removeContact(contactId);
  if (!result) {
    res.status(404).json({ message: "Not found" });
    return;
  }
  res.status(200).json({ message: "contact deleted" });
};

module.exports = {
  getContactController,
  addContactController,
  removeContactController,
};
