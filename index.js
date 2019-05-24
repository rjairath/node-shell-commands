#! /usr/bin/env node

const inquirer = require('inquirer');
const chalk = require('chalk');
const figlet = require('figlet');
const shell = require('shelljs');

//Have the script introduction here

const init = ()=>{
    console.log(
        chalk.green(
            figlet.textSync("NodeJS CLI",{
                font: "Standard",
                horizontalLayout: "default",
                verticalLayout: "default"
            })
        )
    )
};
const askQuestions = ()=>{
    questions = [
        {
            message: "enter the file name without extension",
            name: "fileName",
            type: "input"
        },
        {
            message: "enter the extension now",
            name: "extension",
            type: "list",
            choices: [".html", ".js", ".css", ".txt"],
            filter: (val)=>{
                return val.split(".")[1];
            }
        }
    ]
    return inquirer.prompt(questions);
};
const createFile = (file)=>{
    const filePath = `${process.cwd()}/${file}`;
    shell.touch(filePath);
    return filePath;
};
//Success msg
const success = (filePath)=>{
    console.log(chalk.green(`file created at ${filePath}`));
};
const run = async ()=>{
    init();
    const answers = await askQuestions();
    const {fileName, extension} = answers;//Object destructuring
    const file = `${fileName}.${extension}`;

    const filePath = createFile(file);
    success(filePath);
}

run();