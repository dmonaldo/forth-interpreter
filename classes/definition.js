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

    addStep(step) {
        // console.log("STEP: ", step)
        switch(step) {
            case 'if':
                // console.log("CASE IF")
                this._currentStructure = new Conditional(this._currentContext, this._currentStructure);
                this._currentContext.push(this._currentStructure);
                this._currentContext = this._currentStructure._check;
                break;
            case 'else':
                // console.log("CASE ELSE")
                this._currentContext = this._currentStructure._hook;
                break;
            case 'then':
                // console.log("CASE THEN")
                this._currentContext = this._currentStructure._parentContext;
                this._currentStructure = this._currentStructure._parentStructure;
                break;
            default:
                // console.log("DEFAULT: ", step)
                this._currentContext.push(new Step(step));
                break;
        }
    }

    execute(dictionary, stack, nextStep) {
        if (nextStep === undefined)
            nextStep = () => {}
        let clone = _.cloneDeep(this); // deep-copy obj to prevent overwriting definition
        this.executeSteps(clone._steps, dictionary, stack, nextStep);
    }

    executeSteps(steps, dictionary, stack, nextStep) {
        let recursiveExecuteSteps = (steps) => {
            // console.log("STEPS ", this._steps[0].execute)
            if (steps.length > 0) {
                let step = steps.shift();
                // console.log("EXECUTING STEP ", step)
                // console.log("ALL STEPS", steps)
                step.execute(dictionary, stack, () => {
                    // console.log("CHECKING", steps)
                    recursiveExecuteSteps(steps);
                });
            } else {
                nextStep();
            }
        }

        recursiveExecuteSteps(steps);
    }
}

module.exports = Definition;