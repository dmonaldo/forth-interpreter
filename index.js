const readline = require('readline');

const line = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let stack = [];

line.prompt();

line.on('line', (input) => {
    if (input.length > 0)
        stack.push(...input.split(' '));
    console.log(stack)
    line.prompt();
});

// listen for control-c
line.on('SIGINT', () => {
    line.close();
});