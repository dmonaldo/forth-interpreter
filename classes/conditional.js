class Conditional {
    constructor(pContext, pStructure) {
        this._parentContext = pContext;
        this._parentStructure = pStructure;
        this._check = []; // if branch
        this._hook = []; // else branch
    }

    execute() {
        return (dictionary, stack) => {
            // stack.print()
            // console.log("STASCK: ", stack.pop())
            if (stack.pop() === -1) {
                // console.log("TRUE ", this._check[0])
                console.log("TRUE")
                // console.log("what ", this._check[0].execute(dictionary)(dictionary, stack))

                // return this._check[0].execute(dictionary)(dictionary, stack);
                return this._check[0].execute(dictionary, stack, this._check.splice(1));
            } else {
                console.log("FALSE")
                return this._hook[0].execute(dictionary)(dictionary, stack);
                // return this._hook[0].execute(dictionary, stack, this._check.splice(1));
            }
        }
    }

    // executeSteps(steps, ) {

    // }

    // nextStep(remainingSteps) {
    //     if ()
    // }


}

module.exports = Conditional;