const Stack = require('../classes/stack');

test('create new stack', () => {
    let stack = new Stack();
    expect(stack._stack).toEqual(expect.arrayContaining([]));
});

test('push 17 onto stack', () => {
    let stack = new Stack();
    stack.push(17);
    expect(stack._stack).toEqual(expect.arrayContaining([17]));
});

test('pop 38 off stack', () => {
    let stack = new Stack();
    stack.push(38);
    expect(stack._stack).toEqual(expect.arrayContaining([38]));
});