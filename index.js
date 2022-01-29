#!/usr/bin/env node

import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import gradient from "gradient-string";
import figlet from "figlet";
import inquirer from "inquirer";
import { createSpinner } from "nanospinner";

let playerName;

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

async function welcome() {
  const rainbowTitle = chalkAnimation.rainbow("How Well Do You Know Eswatini?");
  await sleep();
  rainbowTitle.stop();
  console.log(`
    ${chalk.bgBlue("HOW TO PLAY")}
    I am a process on your computer.
    If you get any question wrong i will be ${chalk.bgRed("killed")}
    So get all the questions right...
  `);
}

async function askName() {
  const answers = await inquirer.prompt({
    name: "player_name",
    type: "input",
    message: "What is your name?",
    default() {
      return "Lihle Fakudze";
    },
  });
  playerName = answers.player_name;
}

async function question1() {
  const answers = await inquirer.prompt({
    name: "question_1",
    type: "list",
    message: "Eswatini is located this continent\n",
    choices: ["Asia", "America", "Europe", "Africa"],
  });

  return handlerAnswer(answers.question_1 == "Africa");
}

async function question2() {
  const answers = await inquirer.prompt({
    name: "question_2",
    type: "list",
    message: "In this year Eswatini gained independence\n",
    choices: ["1997", "1985", "1986", "2003"],
  });

  return handlerAnswer(answers.question_2 == "1986");
}

async function question3() {
  const answers = await inquirer.prompt({
    name: "question_3",
    type: "list",
    message: "He is the best programmer in Eswatini\n",
    choices: [
      "Seluleko Mhoni",
      "Mkhulisi Fakudze",
      "Melusi Gumbi",
      "Lihle Fakudze",
    ],
  });

  return handlerAnswer(answers.question_3 == "Lihle Fakudze");
}

async function question4() {
  const answers = await inquirer.prompt({
    name: "question_4",
    type: "list",
    message: "This is the number of regions in Eswatini\n",
    choices: ["4", "5", "6", "7"],
  });

  return handlerAnswer(answers.question_4 == "4");
}

async function question5() {
  const answers = await inquirer.prompt({
    name: "question_5",
    type: "list",
    message: "Eswatini is best know for\n",
    choices: ["Maize Meal", "Weed", "Sugar", "Quite Place"],
  });

  return handlerAnswer(answers.question_5 == "Sugar");
}

async function handlerAnswer(isCorrect) {
  const spinner = createSpinner("Checking answer...").start();
  await sleep();

  if (isCorrect) {
    spinner.success({ text: `Halala ${playerName}. Maciniso lawo!` });
  } else {
    spinner.error({ text: `💀💀💀 Game over, you lose ${playerName}` });
    process.exit(1);
  }
}

function winner() {
  console.clear();
  const msg = `Congrats , ${playerName} \n E1, 000, 000`;
  figlet(msg, (err, data) => {
    console.log(gradient.pastel.multiline(data));
  });
}

await welcome();
await askName();
await question1();
await question2();
await question3();
await question4();
await question5();
await winner();
