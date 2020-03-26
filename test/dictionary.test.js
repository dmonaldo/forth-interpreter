const Dictionary = require('../classes/dictionary');

test('create new dictinoary', () => {
    let dictionary = new Dictionary();
    expect(dictionary._dictionary).toEqual(expect.arrayContaining([]));
});

test('add . method to dictionary', () => {
    let dictionary = new Dictionary();
    let methodName = '.';
    let method = function(stack) {return stack.pop()};
    dictionary.add(methodName, method);
    expect(dictionary._dictionary).toEqual([[methodName, method]]);
});

test('find . method in dictionary', () => {
    let dictionary = new Dictionary();
    let methodName = '.';
    let method = function(stack) {return stack.pop()};
    dictionary.add(methodName, method);
    let methodFound = dictionary.find(methodName);
    expect(methodFound).toEqual(method);
});

test('find notFound method in dictionary', () => {
    let dictionary = new Dictionary();
    let methodFound = dictionary.find('notFound');
    expect(methodFound).toEqual(null);
});