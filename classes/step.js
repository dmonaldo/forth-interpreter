class Step {
    constructor(step, method) {
        this._name = step;

        if (method)
            this.execute = method;
    }

    // push number to stack
    functionWrapper(step) {
        // console.log("HOW")
        return (dictionary, s, nextStep) =>  {
            // console.log("FUCKING STACK ", s, step)
            s.push(step);
            nextStep();
        }
    }

    // execute the step
    execute(dictionary, stack, nextStep) {
        // console.log("EXECUTE STEP", this._name)
        // return function(dictionary, stack) {
            if (!isNaN(this._name)) {
                this.functionWrapper(parseInt(this._name))(dictionary, stack, nextStep);
            } else {
                // console.log("DIC", dictionary)
                let method = dictionary.find(this._name);
                if (method) {
                    method.execute(dictionary, stack, nextStep);
                } else {
                    console.log('Operation does not exist');
                }
            }
        // }
    }
}

module.exports = Step;