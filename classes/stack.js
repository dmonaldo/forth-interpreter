class Stack {
    constructor() {
        this._stack = [];
        return this;
    }

    push(word) {
        // push to stack
        this._stack.push(word);
    }

    pop() {
        // pop from stack
        return this._stack.pop();
    }
}

module.exports = Stack;