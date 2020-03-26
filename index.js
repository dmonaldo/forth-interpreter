const readline = require('readline');
const Stack = require('./classes/stack');
const Dictionary = require('./classes/dictionary');
const 

const line = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

Main = () => {
    var stack = new Stack();
    var dictionary = new Dictionary();

    // begin command prompt
    line.prompt();

    // listen for new input from command prompt
    line.on('line', (input) => {
        processline(input);
        line.prompt();
    });
    
    // listen for control-c
    line.on('SIGINT', () => {
        line.close();
    });

    processline = (input) => {
        if (input.length > 0) {
            input = input.split(' ');

            // filter out extra spaces
            input = input.filter((w) => w !== '');
    
            console.log("INPUT: ", input)

            for (i in input) {
                // push numbers to stack
                if (!isNaN(input[i])) {
                    stack.push(parseInt(input[i]));
                } else {
                    // perform operation
                    let method = dictionary.find(input[i]);
                    // console.log("METHOD: ", method);
                    if (method)
                        method(stack);
                    else
                        console.log('Method does not exist')
                }
            }
    
            console.log(stack._stack, " <- TOP");
        }
    }
}



Main();