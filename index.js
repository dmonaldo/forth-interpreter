const readline = require('readline');
const Stack = require('./classes/stack').default;
const Dictionary = require('./classes/dictionary');

const line = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

Main = () => {
    let stack = new Stack();
    let dictionary = new Dictionary();

    line.prompt();

    line.on('line', (input) => {
        // if (input.length > 0)
        //     stack.push(...input.split(' '));
        console.log(input)
        line.prompt();
    });
    
    // listen for control-c
    line.on('SIGINT', () => {
        line.close();
    });
}

Main();