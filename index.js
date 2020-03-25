const readline = require('readline');

const line = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

class Stack {
    constructor() {
        this.stack = [];
        return this;
    }

    push() {
        // push to stack
    }

    pop() {
        // pop from stack
    }
}

class Dictionary {
    constructor() {
        this.dictionary = [];
        return this;
    }

    add() {
        // add a word and definition to the dictionary
    }

    find() {
        // search the dictionary for a word
    }
}

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