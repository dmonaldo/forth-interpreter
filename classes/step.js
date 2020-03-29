class Step {
    constructor(step, method) {
        this._name = step;

        if (method)
            this.execute = method;
    }

    // push number to stack
    functionWrapper(step) {
        return (dictionary, s, nextStep) =>  {
            s.push(step);
            nextStep();
        }
    }

    // execute the step
    execute(dictionary, stack, nextStep) {
        // TODO: Use this execute method in forth Class
        if (!isNaN(this._name)) {
            this.functionWrapper(parseInt(this._name))(dictionary, stack, nextStep);
        } else {
            let method = dictionary.find(this._name);

            if (method) {
                method.execute(dictionary, stack, nextStep);
            } else {
                console.log('Operation does not exist');
            }
        }
    }

    executeSteps(steps, dictionary, stack, nextStep) {
        let recursiveExecuteSteps = (steps) => {
            if (steps.length > 0) {
                let step = steps.shift();
                step.execute(dictionary, stack, () => recursiveExecuteSteps(steps));
            } else {
                nextStep();
            }
        }

        recursiveExecuteSteps(steps);
    }
}

module.exports = Step;