const _ = require('lodash');
const Step = require('./step');
const Conditional = require('./conditional');

class Definition {
    constructor(definitionName) {
        this._name = definitionName;
        this._steps = [];
        this._currentContext = this._steps;
        this._currentStructure = this;
    }

    // handle branching of steps and track context to nest steps
    addStep(step) {
        switch(step) {
            case 'if':
                this._currentStructure = new Conditional(this._currentContext, this._currentStructure);
                this._currentContext.push(this._currentStructure);
                this._currentContext = this._currentStructure._check;
                break;
            case 'else':
                this._currentContext = this._currentStructure._hook;
                break;
            case 'then':
                this._currentContext = this._currentStructure._parentContext;
                this._currentStructure = this._currentStructure._parentStructure;
                break;
            default:
                this._currentContext.push(new Step(step));
                break;
        }
    }

    // execute the definition
    execute(dictionary, stack, nextStep) {
        if (nextStep === undefined)
            nextStep = () => {}
        let clone = _.cloneDeep(this); // deep-copy obj to prevent overwriting definition
        new Step().executeSteps(clone._steps, dictionary, stack, nextStep);
    }
}

module.exports = Definition;