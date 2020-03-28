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

    compileDefinition(dictionary) {
        let compiledDefinition = [];
        console.log("STEPS: ", this._steps)
        for (let i in this._steps) {
            compiledDefinition.push(this._steps[i].execute(dictionary));
        }
        console.log(compiledDefinition)
        return compiledDefinition;
    }
}

module.exports = Definition;