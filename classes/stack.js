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
            throw "Stack is empty"
    }

    // print top of stack
    print() {
        let top = this._stack[this._stack.length - 1];
        console.log(top);
    }
}

module.exports = Stack;