const Stack = require('../classes/stack');
let stack = new Stack();

afterEach(() => {
    // reset stack
    stack._stack = [];
});

test('create new stack', () => {
    expect(stack._stack).toEqual(expect.arrayContaining([]));
});

test('push 17 onto stack', () => {
    stack.push(17);
    expect(stack._stack).toEqual(expect.arrayContaining([17]));
});

test('pop 38 off stack', () => {
    stack.push(38);
    expect(stack._stack).toEqual(expect.arrayContaining([38]));
});

test('popping from an empty stack', () => {
    expect(() => {
        stack.pop()
    }).toThrow();
});