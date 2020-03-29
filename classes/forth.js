const Stack = require('./stack');
const Dictionary = require('./dictionary');
const Definition = require('./definition');

class Forth {
    constructor(debug = false) {
        this.stack = new Stack();
        this.dictionary = new Dictionary();
        this.definition;
        this.debug = debug;
    }

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
                if (input[i][0] === ':') {
                    if (input[i].length > 1) {
                        let definitionName = input[i].substring(1);
                        this.startDefinition(definitionName);
                    } else {
                        console.log('Undefined word');
                    }
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
                    this.performOperation(input[i]);
                }
            }
        }

        if (this.debug) {
            console.log('STACK: ', this.stack._stack, " <- TOP");
            this.dictionary._dictionary.forEach(item => {
                console.log(item[0])
            })
            // console.log('DICTIONARY: ', JSON.stringify(this.dictionary._dictionary))
        }
    }

    // performOperation(word) {
    //     let method = this.dictionary.find(word);

    //     if (method) {
    //         if (Array.isArray(method)) {
    //             for (let i in method)
    //                 method[i](this.dictionary, this.stack);
    //         } else {
    //             method(this.dictionary, this.stack);
    //         }
    //     } else {
    //         console.log('Operation does not exist');
    //     }
    // }

    performOperation(word) {
        let method = this.dictionary.find(word);

        if (method) {
            // if (typeof method == 'function') {
            //     // console.log("YEE")
            //     method(this.dictionary, this.stack);
            // } else {
                // console.log("HAW", method)
                method.execute(this.dictionary, this.stack);
            // }
        } else {
            console.log('Operation does not exist');
        }
    }

    // start a new definition
    startDefinition(definitionName) {
        this.definition = new Definition(definitionName);
    }

    // run(word) {
    //     let method = this.dictionary.find(word);
    //     console.log("METHOD FOUND: ", method)
    //     if (method) {
    //         // if (Array.isArray(method)) {
    //         //     for (let i in method)
    //         //         method[i](this.dictionary, this.stack);
    //         // } else {
    //             method.execute(this.dictionary, this.stack);
    //         // }
    //     } else {
    //         console.log('Operation does not exist');
    //     }
    // }

    // add completed definition to the dictionary
    endDefinition() {
        // let compiledDefinition = this.definition.compileDefinition(this.dictionary, this.stack);
        // let compiledDefinition = this.definition.compileDefinition();
        // console.log("compiledDefinition", compiledDefinition.execute)
        this.dictionary.add(this.definition);
        // this.run('t')
        this.definition = null;
    }
}

module.exports = Forth;