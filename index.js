const Forth = require('./classes/forth');
const readline = require('readline');
const line = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// set to true for verbose debugging
const DEBUG = process.argv[2] == 'debug' ? true : false;

// font colors
const CYAN = '\x1b[36m';
const MAGENTA = '\x1b[35m';
const RESET = '\x1b[0m';

Main = () => {
    let forth = new Forth(DEBUG);

    console.log(CYAN, 'Welcome to the Forth interpreter\n', RESET);

    // begin command prompt
    line.prompt();

    // listen for new input from command prompt
    line.on('line', (input) => {
        forth.processInput(input);
        line.prompt();
    });
    
    // listen for control-c to exit
    line.on('SIGINT', () => {
        console.log(MAGENTA, 'exiting... may the forth be with you\n', RESET);
        line.close()
    });
}

Main();