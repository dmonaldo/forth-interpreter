class Step {
    constructor(step) {
        this._step = step;
    }

    // push number to stack
    functionWrapper(step) {
        console.log("HOW")
        return (dictionary, s) =>  {
            console.log("FUCKING STACK ", s, step)
            s.push(step);
        }
    }

    // execute the step
    execute(dictionary) {
        // return function(dictionary, stack) {
            if (!isNaN(this._step)) {
                return this.functionWrapper(parseInt(this._step));
            } else {
                console.log("DIC", dictionary)
                let method = dictionary.find(this._step);
                if (method) {
                    return method;
                } else {
                    console.log('Operation does not exist');
                }
            }
        // }
    }
}

module.exports = Step;