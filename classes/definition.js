class Definition {
    constructor(definitionName) {
        this._name = definitionName;
        this._steps = [];
    }


    addStep(step) {
        // if (!isNaN(step)) {
        //     this.steps.push(step);
        //     compiledDefinition.push(functionWrapper(parseInt(this.definition.steps[j])));
        // } else {
        //     let method = this.dictionary.find(this.definition.steps[j]);
        //     if (method) {
        //         compiledDefinition.push(method);
        //     } else {
        //         console.log('Operation does not exist');
        //     }
        // }
        this._steps.push(step);
    }

    compileDefinition(dictionary) {
        let functionWrapper = (step) => (s) => s.push(step);

        let compiledDefinition = [];
        for (let j in this._steps) {
            if (!isNaN(this._steps[j])) {
                compiledDefinition.push(functionWrapper(parseInt(this._steps[j])));
            } else {
                let method = dictionary.find(this._steps[j]);
                if (method) {
                    compiledDefinition.push(method);
                } else {
                    console.log('Operation does not exist');
                }
            }
        }
        return compiledDefinition;
    }
}

module.exports = Definition;