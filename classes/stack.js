class Stack {
    constructor() {
        this._stack = [];
    }

    // push to top of stack
    push(word) {
        this._stack.push(word);
    }

    // pop from top of stack
    pop() {
        if (this._stack.length > 0)
            return this._stack.pop();
        else
            console.log('Stack is empty');
            return null;
    }

    // print the stack
    print() {
        console.log(this._stack, " <- TOP");
    }
}

module.exports = Stack;