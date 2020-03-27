const Step = require('./step');
// const Conditional = require('./conditional');

class Definition {
    constructor(definitionName) {
        this._name = definitionName;
        this._steps = [];
    }

    addStep(step) {
        this._steps.push(step);
    }

    compileDefinition(dictionary) {
        let compiledDefinition = [];
        for (let i in this._steps) {
            let step = new Step(this._steps[i]);
            compiledDefinition.push(step.execute(dictionary));
        }
        return compiledDefinition;
    }
}

module.exports = Definition;