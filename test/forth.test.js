const Forth = require('../classes/forth');
let forth = new Forth();

/* OUTPUT */
test('.', () => {
    forth.processInput('1 2 .');
    expect(forth.stack.pop()).toEqual(1);
});

/* MATHEMATICAL OPERATIONS */
test('1 + 2', () => {
    forth.processInput('1 2 +');
    expect(forth.stack.pop()).toEqual(3);
});

test('12 - 7', () => {
    forth.processInput('12 7 -');
    expect(forth.stack.pop()).toEqual(5);
});

test('9 * 4', () => {
    forth.processInput('9 4 *');
    expect(forth.stack.pop()).toEqual(36);
});

test('8 / 2', () => {
    forth.processInput('8 2 /');
    expect(forth.stack.pop()).toEqual(4);
});

/* DEFINITIONS */
test('add increment definition to dictionary', () => {
    forth.processInput(': increment 1 +;');
    let found = forth.dictionary.find('increment');
    expect(found).toBeTruthy();
});

test('run increment to find the meaning of life', () => {
    forth.processInput('41 increment');
    expect(forth.stack.pop()).toEqual(42);
});

test('add definition with spaces around ;', () => {
    forth.processInput(': incrementMore 1 + ; 41 incrementMore');
    expect(forth.stack.pop()).toEqual(42);
});

test(`nested definitions`, () => {
    forth.processInput(': piMult 3.14 *;');
    forth.processInput(': run 2 piMult;');
    forth.processInput('run');
    expect(forth.stack.pop()).toEqual(6);
});

/* CONDITIONALS */
test('if definition', () => {
    forth.processInput(': ifDef if 42 else 69 then ; -1 ifDef');
    expect(forth.stack.pop()).toEqual(42);
});

test(`if statement: true`, () => {
    forth.processInput(': singleIf if 13 else 7 then;');
    forth.processInput('-1 singleIf');
    expect(forth.stack.pop()).toEqual(13);
});

test(`if statement: false`, () => {
    forth.processInput('0 singleIf');
    expect(forth.stack.pop()).toEqual(7);
});

test(`nested if statement: true true`, () => {
    forth.processInput(': nestedIf if if 1 else 2 then else if 3 else 4 then then;');
    forth.processInput('-1 -1 nestedIf');
    expect(forth.stack.pop()).toEqual(1);
});

test(`nested if statement: true false`, () => {
    forth.processInput('0 -1 nestedIf');
    expect(forth.stack.pop()).toEqual(2);
});

test(`nested if statement: false true`, () => {
    forth.processInput('-1 0 nestedIf');
    expect(forth.stack.pop()).toEqual(3);
});

test(`nested if statement: false false`, () => {
    forth.processInput('0 0 nestedIf');
    expect(forth.stack.pop()).toEqual(4);
});