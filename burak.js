#!/usr/bin/env node
"use strict";

// Clear Terminal
process.stdout.write("\u001b[3J\u001b[2J\u001b[1J\u001b[3J");
console.clear();

const config          =   require("./burak.json");

const terminalImage   =   require('terminal-image');
const chalk           =   require('chalk');
const got             =   require('got');
const ww              =   require('word-wrap');

const inquirer        =   require('inquirer');
const open            =   require('open');

function openSocialSelector() {
  inquirer.prompt([
    {
      type: 'list',
      message: 'For other things...',
      name: 'link',
      choices: [
        { name: chalk.bold.hex('#888888')(`💻  GitHub`), value: 'https://github.com/BurakBugraAkar' },
        { name: chalk.bold.hex('#c80000')(`❤️  Npm`), value: 'https://www.npmjs.com/~burakbugraakar' },
        { name: chalk.bold.hex('#f7678f')(`📩  Send Mail`), value: 'mailto: burakbugraakar@gmail.com' },
        { name: chalk.bold.hex('#ffffff')(`📉  Website`), value: 'https://volumtracker.com' },
        { name: chalk.bold.hex('#fdd641')('👋  Nope. Bye.'), value: false }
      ]
    }
  ])
  .then((result) => {
    if (result.link) {
      open(result.link);
      openSocialSelector();
    } else {
      process.exit();
    }
  })
  .catch(() => {});
}

console.log("")
got(config.avatar, { responseType: 'buffer' })
  .then((image) => terminalImage.buffer(image.body, { width: '26%' }))
  .then((image) => image.split("\n").forEach((line) => console.log("  " + line)))
  .then(() => {
    console.log(ww(eval(`chalk\`${config.title}\``), { width: 200, trim: true }))
  })
  .then(() => {
    console.log("\n")
    openSocialSelector();
  })
  .catch((e) => console.log(e));