const path = require("path");
const fs = require("fs").promises;

const contactsPath = path.join("db", "contacts.json");

async function listContacts() {
  const result = await fs.readFile(contactsPath);
  const contacts = JSON.parse(result);
  console.log(contacts)
  return contacts;
}

async function getContactById(contactId) {
  const contacts = await fs.readFile(contactsPath);
  const contact = JSON.parse(contacts).find((el) => el.id == contactId);
  console.log(contact)
  return contact;
}

async function removeContact(contactId) {
  const contacts = await fs.readFile(contactsPath);
  const newContacts = JSON.parse(contacts).filter((el) => el.id != contactId);
  await fs.writeFile(contactsPath, JSON.stringify(newContacts));
  console.log(newContacts);
}

async function addContact(name, email, phone) {
  const contacts = await fs.readFile(contactsPath);
  const id = new Date().getTime()+"";
  const newContacts = [{ id, name, email, phone },...JSON.parse(contacts)];
  await fs.writeFile(contactsPath, JSON.stringify(newContacts));
  console.log("File successfully created..");
  console.log(newContacts)

}
module.exports={listContacts,getContactById,removeContact,addContact}
