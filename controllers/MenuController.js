const inquirer = require('inquirer');
const log = console.log
const d = new Date();

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
        ];
        this.contacts = [];
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
        log('addContact called');
        this.main();
    }
    getDate() {
        this.clear();
        log(`Today is ${d}`);
        this.main();
    }
    exit() {
        log('Thanks for using AddresBloc!');
        process.exit();
    }
}