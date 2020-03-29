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

    executeSteps(steps, dictionary, stack, nextStep) {
        let recursiveExecuteSteps = (steps) => {
            console.log("recursive STEPS ", steps)
            if (steps.length > 0) {
                let step = steps.shift();
                // console.log("EXECUTING STEP ", step)
                // console.log("ALL STEPS", steps)
                step.execute(dictionary, stack, () => {
                    console.log("CHECKING", steps)
                    recursiveExecuteSteps(steps);
                });
            } else {
                // steps[0].execute(dictionary, stack, nextStep());
                nextStep();
            }
        }

        recursiveExecuteSteps(steps);
    }
}

module.exports = Step;