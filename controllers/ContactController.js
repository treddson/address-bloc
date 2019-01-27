const Contact = require("../db/models/").Contact;

module.exports = class ContactController {
    constructor(){
        this.contacts = [];
        this.addContactQuestions = [
            {
                type: "input",
                name: "name",
                email: "email",
                message: "Contact's name - ",
                validate(val) {
                    return val !== "";
                }
            },
            {
                type: "input",
                name: "phone",
                email: "email",
                message: "Contact's phone number - ",
                validate(val){
                    return val !== "";
                }
            }
        ];
        this.searchQuestions = [
            {
                type: "input",
                name: "name",
                message: "Name of contact to search - ",
                validate(val) {
                    return val !== "";
                }
            }
        ];
    }
    addContact(name, phone, email) {
        return Contact.create({name, phone, email});
    }
    iterativeSearch(contacts, target) {
        for (const contact of contacts) {
            if(contact.name.toLowerCase() === target.toLowerCase()) {
                return contact;
          }
       }
       return null;
    }
    binarySearch(contacts, target) {
        let min = 0;
        let max = contacts.length - 1;
        let mid;

        while(min <= max) {
            mid = Math.floor((min + max) / 2);
            let currentContact = contacts[mid];

            if (currentContact.name > target) {
                max = mid - 1;
            } else if(currentContact.name < target) {
                min = mid - 1;
            } else {
                return contacts[mid];
            }
        }
        return null;
    }
    getContacts() {
        return Contact.findAll()
    }
}