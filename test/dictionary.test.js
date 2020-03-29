const Dictionary = require('../classes/dictionary');
const Step = require('../classes/step');
let dictionary = new Dictionary();

afterEach(() => {
    // reset dictionary
    dictionary._dictionary = [];
});

test('create new dictinoary', () => {
    expect(dictionary._dictionary).toEqual(expect.arrayContaining([]));
});

test('add . definition to dictionary', () => {
    let definitionName = '.';
    let definition = new Step(definitionName, (d, stack) => {
        return stack.pop();
    });
    dictionary.add(definition);
    expect(dictionary._dictionary).toEqual(
        expect.arrayContaining([[definitionName, definition]])
    );
});

test('find . definition in dictionary', () => {
    let definitionName = '.';
    let definition = new Step(definitionName, (d, stack) => {
        return stack.pop();
    });
    dictionary.add(definition);
    let definitionFound = dictionary.find(definitionName);
    expect(definitionFound).toEqual(definition);
});

test('find notFound definition in dictionary', () => {
    let definitionFound = dictionary.find('notFound');
    expect(definitionFound).toEqual(null);
});

test('overwrite existing definition', () => {
    let definitionName = 'dupDef';
    let definition = new Step(definitionName, (d, stack) => {
        stack.push(stack.pop() + stack.pop());
    });
    dictionary.add(definition);
    dictionary.add(definition);
    expect(dictionary._dictionary).toEqual([[definitionName, definition]]);
});