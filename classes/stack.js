class Stack {
    constructor() {
        this._stack = [];
        return this;
    }

    // push to stack
    push(word) {
        this._stack.push(word);
    }

    // pop from stack
    pop() {
        return this._stack.pop();
    }

    // print top of stack
    print() {
        let top = this._stack[this._stack.length - 1];
        console.log(top);
    }
}

module.exports = Stack;