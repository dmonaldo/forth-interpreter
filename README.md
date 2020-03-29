# forth-interpreter

A [Forth](https://en.wikipedia.org/wiki/Forth_(programming_language)) interpreter implemented in Javascript.

## Installation

Clone this repo and run `npm install`

## Usage

```
npm start
```

```
npm test
```

Debug mode: pass `TRUE` into Forth constructor to turn on verbose debugging. ex: `let forth = new Forth(true);`

## Support
### Output
- `.` - pop from the top of the stack
- `.s` - print the stack

### Operations
- `+` - add two numbers
- `-` - subtract last num on stack from second to last num on stack
- `*` - multiply two numbers
- `/` - divide second to last stack num by last stack num on stack

### Definitions
- `:definitionName ...;` - define a new operation, ex: `:increment 1 +;`

### Conditionals
- `if then` - if statement
- `if else then` - if/else statement

## Roadmap
### Output
- `emit` - output num on top of stack as ascii characters

### Operations
- `mod` - modulus

### Stack Manipulation
- `dup` - duplicate top num on stack
- `drop` - drop top num from stack
- `swap` - swap the top two nums on the stack

### Conditionals
- `=` - boolean, -1 for true and 0 for false
- `<` - less than
- `>` - greater than
- `and` - and (bitwise)
- `or` - or (bitwise)
- `invert` - ! not (bitwise)
- `do loop` - for loop

TODO: reuse executeSteps for Definition, Steps and Conditional (by extending Definition?)

### Memory
- `variable` - store a variable in memory
- `constant` - store an immutable variable in memory

## Contributing

Pull requests are welcome. Please make sure tests pass before submitting a PR.

## License
[ISC](https://choosealicense.com/licenses/isc/)