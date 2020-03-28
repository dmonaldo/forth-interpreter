const readline = require('readline');
const Forth = require('./classes/forth');

const line = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// set to true for verbose debugging
const DEBUG = true;

Main = () => {
    let forth = new Forth(DEBUG);

    // begin command prompt
    line.prompt();

    // listen for new input from command prompt
    line.on('line', (input) => {
        forth.processInput(input);
        line.prompt();
    });
    
    // listen for control-c
    line.on('SIGINT', () => {
        line.close();
    });
}

Main();