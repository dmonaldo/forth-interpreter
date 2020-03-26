const Stack = require('./stack');
const Dictionary = require('./dictionary');

class Forth {
    constructor() {
        this.stack = new Stack();
        this.dictionary = new Dictionary();
    }

    processInput(input) {
        if (input.length > 0) {
            input = input.split(' ');

            // filter out extra spaces
            input = input.filter((w) => w !== '');
    
            console.log("INPUT: ", input)

            for (let i in input) {
                // push numbers to stack
                if (!isNaN(input[i])) {
                    this.stack.push(parseInt(input[i]));
                } else {
                    // perform operation
                    let method = this.dictionary.find(input[i]);
                    // console.log("METHOD: ", method);
                    if (method)
                        method(this.stack);
                    else
                        console.log('Method does not exist')
                }
            }
    
            console.log(this.stack._stack, " <- TOP");
        }
    }
}

module.exports = Forth;