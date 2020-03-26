const Dictionary = require('../classes/dictionary');
let dictionary = new Dictionary();

afterEach(() => {
    // reset dictionary
    dictionary._dictionary = [];
});

test('create new dictinoary', () => {
    expect(dictionary._dictionary).toEqual(expect.arrayContaining([]));
});

test('add . method to dictionary', () => {
    let methodName = '.';
    let method = function(stack) {return stack.pop()};
    dictionary.add(methodName, method);
    expect(dictionary._dictionary).toEqual([[methodName, method]]);
});

test('find . method in dictionary', () => {
    let methodName = '.';
    let method = function(stack) {return stack.pop()};
    dictionary.add(methodName, method);
    let methodFound = dictionary.find(methodName);
    expect(methodFound).toEqual(method);
});

test('find notFound method in dictionary', () => {
    let methodFound = dictionary.find('notFound');
    expect(methodFound).toEqual(null);
});