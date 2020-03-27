const Forth = require('../classes/forth');
let forth = new Forth();

test('add increment definition to dictionary', () => {
    forth.processInput(':increment 1 +;');
    let found = forth.dictionary.find('increment');
    expect(found.length).toEqual(2);
});

test('run increment to find the meaning of life', () => {
    forth.processInput('41 increment');
    expect(forth.stack.pop()).toEqual(42);
});

test('add definition with spaces arond special words', () => {
    forth.processInput(': incrementMore 1 + ; 41 incrementMore');
    expect(forth.stack.pop()).toEqual(42);
});

test('- subtract 7 from 12', () => {
    forth.processInput('12 7 -');
    expect(forth.stack.pop()).toEqual(5);
});