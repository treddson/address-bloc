const inquirer = require('inquirer');
const log = console.log;
const MenuController = require('./controllers/MenuController');
const menu = new MenuController();

menu.clear();
menu.main();