const _ = require('lodash');
const Step = require('./step');

class Conditional {
    constructor(pContext, pStructure) {
        this._parentContext = pContext;
        this._parentStructure = pStructure;
        this._check = []; // if branch
        this._hook = []; // else branch
    }

    // execute the conditional
    execute(dictionary, stack, nextStep) {
        if (nextStep === undefined)
            nextStep = () => {}

        if (stack.pop() === -1)
            new Step().executeSteps(this._check, dictionary, stack, nextStep);
        else
            new Step().executeSteps(this._hook, dictionary, stack, nextStep);
    }
}

module.exports = Conditional;