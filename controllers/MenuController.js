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
                    'Exit',
                    'Get date'
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
            this.book.addContact(answers.name, answers.phone).then((contact) => {
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
}