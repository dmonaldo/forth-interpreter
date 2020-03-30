class Step {
    constructor(step, definition) {
        this._name = step;

        if (definition)
            this.execute = definition;
    }

    // function wrapper to push a number to top of stack
    wrapper(step) {
        return (dictionary, stack, nextStep) =>  {
            stack.push(step);
            nextStep();
        }
    }

    // execute the step
    execute(dictionary, stack, nextStep) {
        if (!isNaN(this._name)) {
            this.wrapper(parseInt(this._name))(dictionary, stack, nextStep);
        } else {
            let definition = dictionary.find(this._name);

            if (definition)
                definition.execute(dictionary, stack, nextStep);
            else
                console.log('Operation does not exist');
        }
    }

    // recursively execute an array of steps
    executeSteps(steps, dictionary, stack, nextStep) {
        let recursivelyExecuteSteps = (steps) => {
            if (steps.length > 0) {
                let step = steps.shift();
                step.execute(dictionary, stack, () => recursivelyExecuteSteps(steps));
            } else {
                nextStep();
            }
        }

        recursivelyExecuteSteps(steps);
    }
}

module.exports = Step;