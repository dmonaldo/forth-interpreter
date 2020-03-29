const _ = require('lodash');

class Conditional {
    constructor(pContext, pStructure) {
        this._parentContext = pContext;
        this._parentStructure = pStructure;
        this._check = []; // if branch
        this._hook = []; // else branch
    }

    execute(dictionary, stack, nextStep) {
        if (nextStep === undefined)
            nextStep = () => {}

        if (stack.pop() === -1) {
            // console.log("clone._check", clone._check)
            this.executeSteps(this._check, dictionary, stack, nextStep);
        } else {
            // console.log("clone._hook", clone._hook)
            this.executeSteps(this._hook, dictionary, stack, nextStep);
        }
    }

    executeSteps(steps, dictionary, stack, nextStep) {
        let recursiveExecuteSteps = (steps) => {
            if (steps.length > 0) {
                let step = steps.shift();
                step.execute(dictionary, stack, () => {
                    recursiveExecuteSteps(steps);
                });
            } else {
                nextStep();
            }
        }

        recursiveExecuteSteps(steps);
    }
}

module.exports = Conditional;