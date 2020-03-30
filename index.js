const Forth = require('./classes/forth');
const readline = require('readline');
const line = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// set to true for verbose debugging
const DEBUG = process.argv[2] == 'debug' ? true : false;

Main = () => {
    let forth = new Forth(DEBUG);

    // begin command prompt
    line.prompt();

    // listen for new input from command prompt
    line.on('line', (input) => {
        forth.processInput(input);
        line.prompt();
    });
    
    // listen for control-c to exit
    line.on('SIGINT', () => line.close());
}

Main();