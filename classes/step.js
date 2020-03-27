class Step {
    constructor(step) {
        this._step = step;
    }

    // push number to stack
    functionWrapper(step) {
        return (s) => s.push(step);
    }

    // execute the step
    execute(dictionary) {
        if (!isNaN(this._step)) {
            return this.functionWrapper(parseInt(this._step));
        } else {
            let method = dictionary.find(this._step);
            if (method) {
                return method;
            } else {
                console.log('Operation does not exist');
            }
        }
    }
}

module.exports = Step;