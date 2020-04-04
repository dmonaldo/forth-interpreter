const Stack = require('./stack');
const Dictionary = require('./dictionary');
const Definition = require('./definition');

class Forth {
    constructor(debug = false) {
        this.stack = new Stack();
        this.dictionary = new Dictionary();
        this.definition;
        this.debug = debug;
        this.immediate = true; // immediate mode

        // don't need hidden flag, javascript is single-threaded
        
    }

    // parse a string of space delimited words
    processInput(input) {
        if (input.length == 0)
            return;

        // split and filter out extra spaces
        input = input.split(' ').filter((w) => w !== '');

        for (let i = 0; i < input.length; i++) {
            // push numbers to stack
            if (!isNaN(input[i]) && !this.definition) {
                this.stack.push(parseInt(input[i]));
            } else {
                // begin new definition
                if (input[i] === ':') {
                    // next word is the definition name
                    let definitionName = input[++i];
                    this.startDefinition(definitionName);
                }
                // compile and end new definition
                else if (input[i] === ';') {
                    this.endDefinition();
                }
                // add steps to a definition in progress
                else if (this.definition) {
                    // end definition if word ends in ';'
                    if (input[i][input[i].length-1] === ';') {
                        let word = input[i].substring(0, input[i].length-1);
                        this.definition.addStep(word);
                        this.endDefinition();
                    } else {
                        this.definition.addStep(input[i]);
                    }
                }
                // perform operation
                else {
                    try {
                        this.performOperation(input[i]);
                    } catch(e) {
                        console.log(e)
                        return;
                    }
                }
            }
        }

        if (this.debug) {
            console.log(`STACK: [${this.stack._stack}] <- TOP`)
            let definitions = this.dictionary._dictionary.reduce((o, def) => o += `${def[0]} `, '');
            console.log(`DEFINITIONS: ${definitions}`)
        }
    }

    // execute the definition
    performOperation(word) {
        let definition = this.dictionary.find(word);

        if (definition)
            definition.execute(this.dictionary, this.stack);
        else
            throw 'Operation does not exist';
    }

    // start a new definition
    startDefinition(definitionName) {
        this.definition = new Definition(definitionName);
    }

    // add completed definition to the dictionary
    endDefinition() {
        this.dictionary.add(this.definition);
        this.definition = null;
    }
}

module.exports = Forth;