const inquirer = require('inquirer');
const log = console.log
const date = new Date();
const ContactController = require("./ContactController");

module.exports = class MenuController {
    constructor() {
        this.mainMenuQuestions = [
            {
                type: 'list',
                name: 'mainMenuChoice',
                message: 'Please choose from an option below: ',
                choices: [
                    'Add new contact',
                    'Get date',
                    'View all contacts',
                    'Search for a contact',
                    'Exit'
                ]
            }
        ]
        this.book = new ContactController();
    }

    main() {
        console.log(`Welcome to AddressBloc!`);
        inquirer.prompt(this.mainMenuQuestions).then((response) => {
          switch(response.mainMenuChoice){
            case "Add new contact":
              this.addContact();
              break;
            case "Get date":
              this.getDate();
              break;
            case "View all contacts":
              this.getContacts();
              break;
            case "Search for a contact":
              this.search();
              break;
            case "Exit":
              this.exit();
            default:
              console.log("Invalid input");
              this.main();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }

    clear() {
        log('\x1Bc');
    }
    addContact() {
        this.clear();
        inquirer.prompt(this.book.addContactQuestions).then((answers) => {
            this.book.addContact(answers.name, answers.phone, answers.email).then((contact) => {
              console.log("Contact added successfully!");
              this.main();
            }).catch((err) => {
              console.log(err);
              this.main();
            });
          });
    }
    getDate() {
        this.clear();
        log(`Today is ${date}`);
        this.main();
    }
    getContacts() {
        this.clear();
        this.book.getContacts().then(contacts => {
            for (const contact of contacts) {
                console.log(`
                  name: ${contact.name}
                  phone number: ${contact.phone}
                  email: ${contact.email}   
                ______________`
              );
           }
           this.main();
        }).catch(err => {
            console.log(err);
            this.main();
        });

    }
    exit() {
        log('Thanks for using AddresBloc!');
        process.exit();
    }
    getContactCount() {
        return this.contacts.length;
    }
    remindMe() {
        return `Learning is a life-long pursuit`
    }
    search(){
        inquirer.prompt(this.book.searchQuestions)
        .then((target) => {
         this.book.search(target.name)
         .then((contact) => {
            if(contact === null){
              this.clear();
              console.log("contact not found");
              this.search();
            } else {
              this.showContact(contact);
           }
  
          });
       })
       .catch((err) => {
         console.log(err);
         this.main();
       });
      }
      showContact(contact){
        this._printContact(contact);
      }
      _printContact(contact){
        console.log(`
          name: ${contact.name}
          phone number: ${contact.phone}
          email: ${contact.email}
          ---------------`
        );
      }
}