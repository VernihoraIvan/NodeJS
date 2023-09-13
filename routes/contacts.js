const express = require("express");
const {
  getContactController,
  addContactController,
  removeContactController,
} = require("../controllers/contactsControllersl");
const validateBody = require("../middlewares/validateBody");
const addContactSchema = require("../schemas/contactsSchema");
const checkIsValidId = require("../middlewares/isValidId");

const router = express.Router();

router.get("/", getContactController);

router.post("/", validateBody(addContactSchema), addContactController);

router.delete("/:contactId", checkIsValidId, removeContactController);

router.put("/:contactId");

module.exports = router;
