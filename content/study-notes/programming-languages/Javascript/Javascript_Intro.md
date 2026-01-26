# JavaScript Introduction

## JavaScript in HTML
Internal JavaScript in HTML is the default scripting language in HTML.

In HTML, JavaScript code is inserted between `<script>` and `</script>` tags. Scripts can be placed in the `<body>`, in the `<head>`, or in both.

JavaScript can "display" data in different ways:
- Using `.innerHTML`: `document.getElementById("id").innerHTML` (the `id` attribute identifies the element; `innerHTML` sets the element’s HTML content)
- Using `document.write()`: using `document.write()` after an HTML document is loaded will delete all existing HTML. The `document.write()` method should only be used for testing.
- Using `window.alert()`: `window` is the global scope object in browsers (so specifying `window` is optional)
- Using `console.log()`: for debugging, call `console.log()` to print to the browser console

When JavaScript is used in HTML pages, JavaScript can react to EVENTS (things that happen to HTML elements, e.g. page load, button click, input field change). JavaScript lets you execute code when events are detected through event handler attributes (e.g. `onclick` on a `<button>`) or via event listeners (e.g. `document.querySelector("...").addEventListener("click", function () { ... })`).

## External JavaScript Files
External JavaScript files have the file extension `.js`.
To use an external script, put the name of the script file in the `src` (source) attribute of a `<script>` tag:
**External scripts can be referenced with a full URL(absolute) or with a path relative(same/specified folder) to the current web page.**
*Path relative(same folder) to the current web page.*
Syntax:
```html
<script src="myScript.js"></script>
```

*Path relative(specified folder) to the current web page.*
```html
<script src="/js/myScript.js"></script>
```

*External scripts can be referenced with a full URL(absolute)*
```html
<script src="https://www.xyz.com/js/myScript.js"></script>
```

Placing scripts in external files has some advantages:
- It separates HTML and code
- It makes HTML and JavaScript easier to read & maintain
- Cached JavaScript files can speed up page loads

## Syntax Notes
- Comment syntax: `// singleLine` and `/* multiLine */`
- Semicolons separate JavaScript statements. Multiple statements can be on one line when separated by semicolons.
- JavaScript ignores whitespace, but as a good practice put spaces around operators (`= + - * / % ++ --`).
- JavaScript statements can be grouped together in code blocks inside curly brackets `{ ... }`.
- JavaScript statements often start with a keyword to identify the JavaScript action to be performed (e.g. `do...while`, `if...else`, `var`, `function`, `debugger`, `for`, `return`, `break`).
- JavaScript is case sensitive.
- Hyphens are not allowed in JavaScript identifiers (they are reserved for subtraction). Underscore is allowed.
- Avoid code lines longer than 80 characters; if a statement does not fit on one line, the best place to break it is after an operator.

**References:**
- [Javascript Best Practices](https://www.w3schools.com/js/js_best_practices.asp)
- [Style Guide](https://www.w3schools.com/js/js_conventions.asp)
- [Common Mistakes](https://www.w3schools.com/js/js_mistakes.asp)
- [Cheatsheets](https://overapi.com/javascript)

## Declaring (Creating) JavaScript Variables
P.S JavaScript Identifiers are unique names, used to name & identify variables, functions, & labels. The first character must be a letter(A-Z or a-z), or an underscore (_), or a dollar sign ($).Subsequent characters may be letters, digits, underscores, or dollar signs. Numbers are not allowed as the first character.This way JavaScript can easily distinguish identifiers from numbers. Identifiers are case sensitive.

### The Concept of Data Types
Expressions in parentheses(x + y) are fully computed before the value is used in the rest of the expression.
JavaScript evaluates expressions from left to right. Different sequences can produce different results
When adding a number and a string, JavaScript will treat the number as a string. You can use single quotes’ inside a string, as long as they don't match the double quotes” surrounding the string. Also Backslash `\` Escape Character helps turns special character into exceptionable strings. `\\` prints backslash `\`
`\'` prints single quote `'`
`\"` prints double quote `"`
It's a good programming practice to declare all variables at the beginning of a script, You can declare many variables in one statement. Start the statement with var and separate the variables by comma.	A variable without a value will have the value of `undefined`, however the value can be something that has to be calculated or provided later, `const` variables must be assigned a value when they are declared. Empty value (`""`) has nothing to do with `undefined`.

### Re-Declaring JavaScript Variables
- Variables defined with `var` can be redeclared, reassigned, & **NOT** have block scope `{ }`.
- Variables defined with `let` cannot be Redeclared/ must be Declared before use/ & have Block Scope `{ }`.
- Variables defined with `const` cannot be redeclared, reassigned and have block scope `{ }`.
- Use of Lower Camel Case to join multiple words into a variable name starting with a lowercase letter: `myFirstName`, `myFirstCar`, `americanEagle`;
- Use `const` when you declare a new Array[], new object {},  new function()….const defines a constant reference to a value, because of this you can’t reassign const value, array, object, but you can change it.

JavaScript Arrays `[ ]` are written with square brackets. Array items are separated by commas. Array indexes are zero-based, which means the first item is `[0]`, second is `[1]`, and so on.
JavaScript objects are written with curly braces `{ }`.
Object properties are written as `name:value` pairs, separated by commas.

## Javascipt Syntax // Program Construct rules //
An expression is a combination of values, variables, and operators, which computes to a value. The computation is called an evaluation. Javascript Syntax defines two types of values.
Fixed Values are called literals. I.e Numbers & “Strings”. Variable values are called variables and are used to store data values I.e var, let, const. Variables are containers for storing data (values).
JavaScript uses an assignment operator ( = ) to assign fixed values to variables nameS.
JavaScript uses arithmetic operators ( + — * / =) to compute values.
JavaScript uses comparison operators (`===`, `!==`, `&&`, `||`) to compare values.

JavaScript Booleans represents one of two values: true or false.
Boolean() function can be used to find out if an (expression/variable= parameter/argument) is true or false.
Comparisons Operator == equal to, >greater than, <less than
Note: Everything with a value is true, without a value(null, undefined, empty string, minus 0, zero 0, false) is false.
Note: Boolean can be Objects Since they are created from Literals, They are defined as objects using the keyword new: new Boolean(). 
Creating new boolean objects slows down & complicates code execution.

### Comparison Operators
== equal to(in value)	=== equal value & equal type. Identity operator
!= not equal(value)	 !=== not equal value & type
> greater than 	>= greater than or equal to
< less than	<= less than or equal to
/*Used in conditional statements to compare values nd take action depending on the result*/
Comparing data of different types may give unexpected results.
When comparing a “string” with a number, JavaScript will convert the string to a number when doing the comparison. 
An empty string(“ “) converts to 0. A non-numeric string converts to NaN (not a number) which will always return false.

### Logical Operators
Note: Logical operators are used to determine the logic between variables or values. Logical operators are often used in conditional statements to add another layer of logic to our code.
✓&& and ✓ || or ✓ ! not
the and operator (&&)
the or operator (||)
the not operator, otherwise known as the bang operator (!)
1) When using the && operator, both conditions must evaluate to true for the entire condition to evaluate to true and execute. Otherwise, if either condition is false, the && condition will evaluate to false and the else block will not execute.
2) When using the || operator, only one of the conditions must evaluate to true for the overall statement to evaluate to true.
3) The ! not operator reverses, or negates, the value of a boolean:the ! operator will either take a true value and pass back false, or it will take a false value and pass back true.


Conditional(Ternary) Operator ?
We can use a ternary operator to simplify an if...else statement. 
if (condition) {
//  block of code to be executed if the condition is true;
} else {
  //  block of code to be executed if the condition is false;}

### ShorthandSyntax Using Ternary Operator
Two expressions follow the ? and are separated by a colon :
condition ? {block of code to be executed if the condition is true;} : {block of code to be executed if the condition is false;}

Also use it as a conditional operator that assigns a value to a variable based on some condition.
Syntax: variableName = (condition-true/false) ? value1:value2 

## Conditional Statements
Very often when you write code, you want to perform different actions for different decisions. These statements are used to perform different actions based on different conditions. A code block is a block of code to be executed between `{` and `}`.

### If Statement
Use the if statement to specify a block of JavaScript code to be executed if a condition is true.

```js
if (condition) {
  // block of code to be executed if the condition is true
}
```

### Else Statement
Use the else statement to specify a block of code to be executed if the condition is false.

```js
if (condition) {
  // block of code to be executed if the condition is true
} else {
  // block of code to be executed if the condition is false
}
```

### Else If Statement
Use the else if statement to specify a new condition if the first condition is false. The else if statement allows for more than two possible outcomes.

```js
if (condition1) {
  // block of code to be executed if condition1 is true
} else if (condition2) {
  // block of code to be executed if condition1 is false and condition2 is true
} else {
  // block of code to be executed if condition1 is false and condition2 is false
}
```

### Switch Statement
A switch statement provides an alternative syntax to else if that is easier to read and write. The switch statement is used to perform different actions based on different conditions. Use the switch statement to select one of many code blocks to be executed.

```js
switch (expression) {
  case expression:
    // code block
    break;
  case expression:
    // code block
    break;
  default:
    // code block
}
```
The switch expression(The switch keyword initiates the statement and is followed by ( ... ), which contains the value that each case will compare) & is evaluated once ☞The value of the expression is then compared with the values of each cases. ☞If there is a match, the associated block of code is executed. ☞If there is no match, the default code block is executed(The default keyword specifies the code to run if there is no case match). 
Note: When JavaScript reaches a break keyword, it breaks out of the switch block. This will stop the execution inside the switch block.
It is not necessary to break the last case in a switch block. The block breaks (ends) there anyway.
Switch cases use strict comparison (===). The values must be of the same type to match. A strict comparison can only be true if the operands are of the same type.

## Loop Statements
Loops are programming tools that repeat a block of code until a condition is met, Loops can execute a block of code a number of times. Loops are handy, if you want to run the same code over and over again, each time with a different value.  JavaScript supports different kinds of loops:
### for
Loops through a block of code a number of times.

Syntax:
```js
for (statement1; statement2; statement3) {
  // code block to be executed
}

for (let i = 0; i < 10; i++) {
  console.log(i);
}
```

- Statement1: executed once before the code block executes (initializes the loop variable). You can initialize many values in statement1 (separated by commas).
- Statement2: defines the condition for executing the code block. If statement2 returns true, the loop continues; if it returns false, the loop ends.
- Statement3: executed after each iteration (e.g. `i--`, `i++`).

### for...in
Loops through the properties (keys) of an object.

Syntax:
```js
const car = { type: "Fiat", model: "500x", color: "white" };
let automobile = "";

for (let x in car) {
  automobile += car[x] + " ";
}

// returns: Fiat 500x white
```

Note: If we used `automobile += car;` it would return something like: `type model color`.
The for in loop iterates over a person object☞Each iteration returns a key/property (x)☞The key/property is used to access the value of the key/property ☞The value of the key is variable[x]. 
/*The JavaScript for in statement can also loop over the properties of an Array, Do not use for in over an Array if the index order is important. The index order is implementation-dependent, and array values may not be accessed in the order you expect. It is better to use a for of loop, or Array.forEach() when the order is important.*/
### for...of
Loops through the values of an iterable. It lets you loop over iterable data structures such as arrays, strings, maps, NodeLists, and more.

Syntax:
```js
const cars = ["BMW", "Fiat", "Benz"];
let allCars = "";

for (let x of cars) {
  allCars += x + " ";
}

// returns: BMW Fiat Benz
```

Variable: for every iteration the value of the next item is assigned to the variable. Variable can be declared with `const`, `let`, or `var`.

### while
Loops through a block of code while a specified condition is true.

```js
while (condition) {
  // code block to be executed
}
```

### do...while
Loops through a block of code while a specified condition is true. The loop will always execute at least once, because the code block is executed before the condition is tested.

```js
do {
  // code block to be executed
} while (condition);
```


### Break statement
It’s used to jump out of a loop if a condition occurs(true). The break statement with a label reference can be used to jump out of any code block. Without a label ref can only be used to jump out of a loop or a switch condition.

### Continue statement
It’s used to break one iteration(in the loop), if a specified condition occurs, and continues with the next iteration in the loop. The continue statement (with or without a label reference) can only be used to skip one loop iteration.

### Javascript Data Types
string	Object
number	Date
boolean	Array
object	String
function	Number
There are 6 types of objects:	Boolean
null & undefined can not contain values.	And 2 data types that cannot contain values:
The typeof Operator: You can use the typeof operator to find the data type of a JavaScript variable.
The .constructor Property: The constructor property returns the constructor function for all JavaScript variables.
#### Check if the object is an array function
Syntax: function isArray(myArray) {
  return myArray.constructor === Array;}
#### Check if the object is a Date function
Syntax: function isDate(myDate) {
  return myDate.constructor === Date;}

Any variable can be emptied, by setting the value to undefined. The type will also be undefined. 
“ “ Empty values are not undefined, they have legal value & type.
null is nothing, something that doesn’t exist. However it’s data type is an object. You can empty an object by setting it to null.
#### Difference between Undefined & Null.	
typeof undefined: undefined	null === undefined: false
typeof null: object	null == undefined: true

### JavaScript Type Conversion
JavaScript variables can be converted to a new variable and another data type: By the use of a JavaScript function
.Number() convert strings/dates/boolean to numbers⌫ false 0 true 1
.parseFloat() Parses a string and returns a floating point number
.parseInt() Parses a string and returns an integer
.String() & toString()  converts numbers/dates/boolean to strings⌫returns “true” “false”
.toExponential() converts numbers to string written using Exponential notation
Automatically by JavaScript itself: When JavaScript tries to operate on a "wrong" data type, it will try to convert the value to a "right" type. However The result is not always what you expect. JavaScript automatically calls the variable's toString() function when you try to "output" an object or a variable.



## JavaScript Functions
A function is a reusable block of code that groups together a sequence of statements to perform a specific task.
Or block of JavaScript code designed to perform a particular task, & can be executed when "called" for.  A JavaScript program is a list of programming statements. In HTML, JavaScript programs are executed by the web browser. Javascript Statements are composed of Values, operators, Expressions, Keywords, & Comments. 
￼
Syntax function declaration:
function myFunction (parameter1, parameter2,) { line of code; }
Keyword  Identifier  (arg1, arg2 ) {execute line of code; }
One way to create a function is by using a function declaration. Just like how a variable declaration binds a value to a variable name, a function declaration binds a function to a name, or an identifier.

Note: To call myFunction, type the function_identifier followed by parenthesis () and it executes line of code.
Functions often compute a return value. The return value is "returned" back to the "caller" {return code;}. To pass back information from the function call, we use a return statement. To create a return statement, we use the return keyword preceded by the code that we wish to execute. If the line of code is omitted, undefined is returned instead. When a return statement is used in a function body, the execution of the function is stopped and the code that follows it will not be executed. 


### Helper functions
We can also use the return value of a function inside another function. These functions being called within another function are often referred to as helper functions. Since each function is carrying out a specific task, it makes our code easier to read and debug if necessary.

### Parameters and Arguments
Parameters allow functions to accept input(s) and perform a task using the input(s). We use parameters as placeholders for information that will be passed to the function when it is called.
The accepted real inputs/values passed into the function when it’s called are Arguments. Arguments can be passed to the function as values or variables. The variables are initialized with values before being used in the function call.


### Parameter Rules
JavaScript function definitions do not specify data types for parameters. JavaScript functions do not perform type checking on the passed arguments. JavaScript functions do not check the number of arguments received.


### Default parameters
Default parameters allow parameters to have a predetermined value in case there is no argument passed into the function or if the argument is undefined when called.


Note: Functions can be used the same way as you use variables, in all types of formulas, assignments, and calculations.


### Function expressions
Instead of using a variable(let, var, const) to store the return value of a function, you can use the function directly, as a variable value. Using function expression, we can assign a function to a variable name, with the function keyword. In a function expression, the function name is usually omitted. A function expression with no identifier name is called an Anonymous function. A function expression is often stored in a variable in order to refer to it. Below is a Image of Function Exp.

### Anonymous functions
Functions stored in variables do not need function names. They are always invoked (called) using the variable name.
￼


### Local variables
Variables declared with var, let and const are quite similar when declared inside a function.
They are called Local variables & have Function Scope, They can only be accessed from within the function { }& become LOCAL to the function, Since local variables are only recognized inside their functions{ }, variables with the same name can be used in different functions{ }. Each Function creates a new scope, Local variables are created when a function starts, and deleted when the function is completed.


### Scope
Scope determines the accessibility of variables, objects, and functions from different parts of the code. If you assign a value to a variable that has not been declared, it will automatically become a GLOBAL variable.

Arrow functions remove the need to type out the keyword function every time you need to create a function expression. Instead, you first include the parameters inside the ( ) and then add an arrow => that points to the function body surrounded in { } like this
The handling of this is also different in arrow functions compared to regular functions. In short, with arrow functions there are no binding of this. In regular functions the this keyword represented the object that called the function, which could be the window, the document, a button or whatever. With arrow functions, the this keyword always represents the object that defined the arrow function.

Syntax:
```js
const identifier = function (a, b) {
  return /* line of code */;
};

const identifier2 = function () {
  /* line of code */
};

const identifier3 = (a, b) => {
  /* line of code */
};

const identifier4 = () => {
  /* line of code */
};
```

Note: Functions that take only a single parameter do not need that parameter to be enclosed in parentheses(). However, if a function takes zero or multiple parameters, parentheses are required.
Note: A function body composed of a single-line block code does not need curly braces. Without the curly braces, whatever that line evaluates will be automatically returned. The contents of the block should immediately follow the arrow => and the return keyword can be removed. This is referred to as implicit return.

Note: JavaScript functions are executed in the sequence they are called. Not in the sequence they are defined.

## Asynchronous JavaScript

An asynchronous operation / (deferred computations) is one that allows the computer to “move on” to other tasks while waiting for the operation to complete. Asynchronous programming means that time-consuming operations don’t have to bring everything else in our programs to a halt. Functions running in parallel with other functions are called asynchronous. 
JavaScript is non-blocking: instead of stopping the execution of code while it waits, JavaScript uses an event-loop which allows it to efficiently execute other tasks while it awaits the completion of these asynchronous actions-(actions we can wait on while moving on to other tasks). Originally, JavaScript used promises & callback functions to handle Asynchronous actions, and upgraded to Async-Await. The problem with callbacks is that they encourage complexly nested code which quickly becomes difficult to read, debug, and scale. Below are three ways to handle an Asynchronous Actions
(https://www.codecademy.com/courses/learn-node-js/articles/javascript-for-node-js)
Synchronous code executes in the sequence it is written; statements wait until the ones before them have finished running before they get to run. Synchronous code is considered blocking because long running tasks block the execution of any other code until the synchronous operation has completed. Blocking can be useful in some situations (like reading important configuration data on startup before letting anything else run), but will make your application unresponsive if used for long running tasks like making HTTP calls or reading files from disk.

Asynchronous code works by starting a long running task, and letting it complete in the background while other code is still able to execute. Once the long running task has completed, the handler function (called a callback) is immediately executed with the result from the task. Asynchronous code is considered non-blocking because it does not prevent the rest of your code from executing while the asynchronous task occurs in the background.

### Below are three ways to handle an Asynchronous Actions

### Javascript use of Callbacks
A callback is a simple function that's passed as a value to another function, and will only be executed when the event happens. We can do this because JavaScript has first-class functions, which can be assigned to variables and passed around to other functions (called higher-order functions)
Note: A higher-order function is a function that either accepts functions as parameters, returns a function, or both! We call the functions that get passed in as parameters and invoked callback functions because they get called during the execution of the higher-order function.
Note: When we pass a callback function in as an argument to another function, we don’t invoke it i.e ✗ identifier() because that evaluates to the return value of calling the function itself. With callbacks, we pass in the function itself by typing the function name(identifier) without the parentheses. Anonymous functions(functions stored in variables) can be arguments too!

setTimeout(), setInterval() is a Node API (a comparable API is provided by web browsers) that uses callback functions to schedule tasks to be performed after a delay or after specified intervals.
setTimeout() and setInterval both use same parameters: a callback function and a delay in milliseconds.

Syntax: `setTimeout(callbackFunc, milliseconds);`

Example:
```js
console.log("This is the first line of code."); // first line

const usingSTO = () => {
  console.log("line of code");
}; // second line

setTimeout(usingSTO, 2999); // set a timeout for the async function

console.log("This is the last line of code"); // third line
```

This delay is performed asynchronously—the rest of our program won’t stop executing during the delay. Asynchronous JavaScript uses something called the event-loop. After time in milliseconds, the callbackFunc() is added to the line of code waiting to be run, Before it can run, any synchronous code from the program will run. Next, any code in front of it in the line will run.  IN THE EXAMPLE ABOVE SYNCHRONOUS CODE LINE 1 & 3 WILL RUN AND PRODUCE RESULTS FIRST, BEFORE ASYNC FUNCT IN LINE 2.

We can rewrite line 2 & setTimeout in a similar form:
```js
setTimeout(() => {
  console.log("line of code");
}, /* delay in milliseconds */);
```

Note: The setInterval() function will continue to execute until the clearInterval() function is called…Using the clearTimeout() function will prevent the function specified from being executed.

### JavaScript use of Promises
A promise is commonly defined as a proxy for a value that will eventually become available. Promises are objects that act as & represent the eventual outcome(result) of an Asynchronous operation—“I promise to do this while you keep doing what you’re doing & expect my result soon”.  A Promise object can be in one of three states. Let’s learn how to create promises.

Pending: The initial/default state of a promise— the operation has not completed yet.
We refer to a promise as settled if it is no longer pending— it is either fulfilled or rejected.
Fulfilled/Resolved: The operation has completed successfully and the promise now has a resolved value(result/outcome).. 
Rejected: The operation has failed and the promise has a reason for the failure. This reason is usually an Error of some kind.

The construction of the promise syntax: We create a promise variable (myFirstPromise is a higher-order function) using the new(a keyword) with a callback function(myExecFuncName) as parameter/argument which starts an asynchronous operation & dictates how the promise(myFirstPromise) should be settled. This callback function should be a function with two parameters (resolve, reject) based on their condition.


Example construction:
```js
const myExecFunc = (resolve, reject) => {
  // line of code based on conditions w.r.t resolve & reject
};

const myFirstPromise = new Promise(myExecFunc);

// Shorthand
const mySecondPromise = new Promise((resolve, reject) => {
  // executor function to express resolve & reject conditions
});
```

The resolve() function: if invoked will change promise status from pending to fulfilled 
The reject() function: if invoked changes promise status from pending to rejected. 

Promise objects come with an aptly named .then() method—> A Handler function that handles the outcomes of the promise object returned. It allows us to say, “I have a promise, when it resolves, then here’s what I want to happen…or when it’s rejected, do this…”
The .then(onFulfilled, onRejected)  Syntax is a higher-order function….it’s Arguments represent promise state HANDLERS. 
1. The first handler, is a success handler or called onFulfilled function, and it should contain the logic for the promise resolving.
2. The second handler, is a failure handler or called onRejected Function, and it should contain the logic for the promise rejecting.
3. To handle a promise that resolved, we invoke .then(onFulfilled) on the promise, passing in a success handler(onFulfilled) callback function/parameter. To create even more readable code, we can use a different promise function: .catch(). The .catch(onRejected) function takes only one argument, onRejected. In the case of a rejected promise, this failure handler will be invoked with the reason for rejection. Using .catch() accomplishes the same thing as using a .then() with only a failure handler. 
4. Note: If the appropriate handler is not provided, instead of throwing an error, .then() will just return a promise with the same settled value as the promise it was called on.

### Using Promise.all()
To maximize efficiency we should use concurrency, multiple asynchronous operations happening together. With promises, we can do this with the function Promise.all().// Promise.all() accepts an array of promises as its argument and returns a single promise. That single promise will settle in one of two ways.
Syntax:
Syntax:
```js
const promiseArray = [firstPromise, secondPromise, thirdPromise];

Promise.all(promiseArray).then(onFulfill).catch(onReject);

Promise.all([firstPromise, secondPromise, thirdPromise])
  .then(onFulfill)
  .catch(onReject);

const all = Promise.all([
  new Promise((resolve) => setTimeout(() => resolve(1), 1000)),
  new Promise((resolve) => setTimeout(() => resolve(2), 2000)),
  new Promise((resolve) => setTimeout(() => resolve(3), 3000)),
]).catch((err) => console.log("Promise was rejected!", err));

all.then((results) => console.log(results)); // [1, 2, 3]
```

1. If every promise in the argument array resolves, the single promise returned from Promise.all() will resolve with an array containing the resolve value from each promise in the argument array. We invoke .then() with a success handler(onFulfilled) which will print the array of resolved values if each promise resolves successfully.

2. If any promise from the argument array rejects, the single promise returned from Promise.all() will immediately log a reject with the reason that promise rejected. We invoke .catch() with a failure handler(onRejected) which will print the first rejection message if any promise rejects. This behavior is sometimes referred to as failing fast.

### Chaining Multiple Promises which depend on each other
One common pattern we’ll see with asynchronous programming is multiple operations which depend on each other to execute or that must be executed in a certain order, This process of chaining promises together is called composition. Promises are designed with composition in mind!

```js
fetch("api-URL")
  .then((data) => console.log(data))
  .catch((err) => console.log(err));
```
In this example we fetch some JSON data via an HTTP request. The fetch function returns a Promise object, and will either resolve or reject the Promise internally. We attach a then handler to the Promise returned by fetch to handle the response once the Promise resolves.

### Use of Async
 The async...await syntax allows us to write asynchronous code that reads similarly to traditional synchronous, imperative programs, Instead of using callbacks & native promises.

```js
const myFuncName = async () => {
  // Function body here
};
myFuncName();
```

Or 

async function myFuncName( ) {// Function body here};
 myFuncName(); //calling the function. This is better

Note: We wrap our asynchronous logic inside a function prepended with the async keyword. Then, we invoke that function. async functions always return a promise object. This means we can use traditional promise syntax, like .then() & .catch with our async functions.

An async function will return in one of three ways:
If there’s nothing returned from the function, it will return a promise with a resolved value of undefined.
If a promise is returned from the function, it will simply return that promise.
If there’s a non-promise value returned from the function, it will return a promise resolved to that value.

### Await
Note: The await keyword can only be used inside an async function. await is an operator: it returns the resolved value of a promise. Since promises resolve in an undetermined amount of time, await halts, or pauses, the execution of our async function until a given promise is resolved. In other words, it handles the promise object returned internally.
Syntax: const asyncFuncExample = async ( ) => {    or.   async function asyncFuncExample ( ) {
 			 let resolvedValue1 = await myPromise1(); 
  			console.log(resolvedValue); 
			 let resolvedValue2 = await myPromise2(resolvedValue1);
			console.log(resolvedValue2);
			}

    asyncFuncExample(); // invokes/calls the async’d function
Note: We mark our function(asyncFuncExample) as async. Inside our function block{ }, we create a variable resolvedValue1 assigned await myPromise1() with no argument. This means resolvedValue1 is assigned the resolved value of the awaited promise. Next, we log resolvedValue1 to the console. Then, we create a variable resolvedValue2 assigned to await myPromise2(resolvedValue1) with resolvedValue1  passed as an argument. Therefore, secondValue is assigned this promise’s resolved value. Finally, we log resolvedValue2 to the console. We’re able to handle the logic for a promise in a way that reads like synchronous code.

// Creating a new promise that runs the function in the setTimeout after 5 seconds. 
const newPromise = new Promise((resolve, reject) => {
  setTimeout(() => resolve("All done!"), 5000);
});
 
// Creating an asynchronous function using an arrow expression and saving it to a the variable asyncFunction. 
const asyncFunction = async () => {
  // Awaiting the promise to resolve and saving the result to the variable finalResult.
  const finalResult = await newPromise;
 
  // Logging the result of the promise to the console
  console.log(finalResult); // Output: All done!
}
 
asyncFunction();

### Handling Independent Promises
Remember that await halts the execution of our async function. This allows us to conveniently write synchronous-style code to handle dependent promises. But what if our async function contains multiple promises which are not dependent on the results of one another to execute? I.e they can run concurrently/simultaenously
async function concurrent() {
 const firstPromise = firstAsyncThing();
 const secondPromise = secondAsyncThing();
console.log(await firstPromise, await secondPromise);
} // In our concurrent() function, both promises are constructed without using await. We then await each of their resolutions to print them to the console. Notice the secondAsyncThing() didn’t have an argument of the resolve value from the firstPromise, since they are independent promises.
(Ref https://www.codecademy.com/courses/introduction-to-javascript/lessons/async-await/exercises/concurrency)

### Await Promise.all()
Another way to take advantage of concurrency when we have multiple promises which can be executed simultaneously is to await a Promise.all(). We can pass an array of promises as the argument to Promise.all(), and it will return a single promise. This promise will resolve when all of the promises in the argument array have resolved. This promise’s resolve value will be an array containing the resolved values of each promise from the argument array. Promise.all() also has the benefit of failing fast, meaning it won’t wait for the rest of the asynchronous actions to complete once any one has rejected. 
#### Syntax

```js
async function asyncPromAll() {
  const resultArray = await Promise.all([
    asyncTask1(),
    asyncTask2(),
    asyncTask3(),
    asyncTask4(),
  ]);

  resultArray.forEach((i) => {
    console.log(resultArray[i]);
  });
} // we use forEach/for (condition) to loop through our array.
```

### Benefits of Async
The true beauty of async...await is when we have a series of asynchronous actions which depend on one another result. With native promise syntax, we use a chain of .then() functions making sure to return correctly each one. This can lead of a mistake
The async...await syntax also makes it easy to store and refer to resolved values from promises further back in our chain which is a much more difficult task with native promise syntax. The async...await version more closely resembles synchronous code, which helps developers maintain and debug their code.

With async...await, we use try...catch statements for error handling. By using this syntax, not only are we able to handle errors in the same way we do with synchronous code, but we can also catch both synchronous and asynchronous errors. This makes for easier debugging!

#### Read more
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function


## JavaScript Objects
In JavaScript, almost "everything" is an object. At their core, JavaScript objects are containers{ } storing related data and functionality, but that deceptively simple task is extremely powerful in practice.
Booleans can be objects (if defined with the new keyword)	Functions are always objects
Numbers can be objects (if defined with the new keyword)	Arrays are always objects
Strings can be objects (if defined with the new keyword)	Objects are always objects
Dates are always objects.  Maths are always objects.	Regular expressions are always objects

JavaScript objects are containers for named values, called properties & also methods. In Javascript, variables can contain single or multiple values, object are variables too i.e objects are a collection of organized data into of named values(property/key-value pairs).  A key is like a variable name/ property name that points to a location in memory that holds a value. Common to declare objects with const keyword. Objects are mutable: They are addressed by reference(key), not by value.

There are different ways to create new objects:
*Define an object constructor, and then create objects of the constructed type.
*Create an object using Object.create().
✓Create a single object, with the keyword new.
✓Create a single object, using an object literal: easiest and most popular way to create a javascript object, you defines & create an object in one statement, an object literal is a list of name: value pairs inside curly braces {}. 
const person = {
name: “value”,
age: “valu”,
sex: “val”
};	const person = {};          person.name= “value”;              
person.age= “value”; 
person.sex= “value”;	 const person = new Object();          
person.name= “value”;
person.age= “value”;
person.sex= “value”;          
Key: “value assigned” ✍︎ Properties are key-value pairs, person = objectName

Access Object properties. 
1. objectName.key  Dot Notation
2. objectName[“key”] Bracket Notation
We must use bracket notation[] when accessing key’s values that have numbers(0-9), spaces “ “, or “quotation marks” in them. Without bracket notation in these situations, our code might throw an error.
3. objectName[expression] expression must evaluate to a property name. I.e let x= “name”; x= person[x]. An object that has iterable properties. 

What ?. Actually Means
?. lets you safely access a property only if the value before it is not null or undefined.
If it is null/undefined, the whole expression returns undefined instead of throwing an error.
Why Developers Use It

It prevents app crashes when dealing with: API responses (res?.data?.profile?.email), Deeply nested objects, User-generated data, Optional props in React

Example: const userName = response?.user?.info?.name || "Guest";
If any part is missing, you don’t get errors — you just get undefined.

Without optional chaining:
res.data   // ❌ throws "Cannot read property 'data' of undefined" if res is undefined

With optional chaining:
res?.data  // returns undefined instead of crashing if res is undefined

Add New Properties: objectName.key = “newvalue”;
One of two things can happen with property assignment:
Note: If the property already exists on the object, whatever value it held before will be replaced with the newly assigned value.
Note: If there was no property with that name, a new property will be added to the object. The above syntax can add and replace Key’s value in an object.

Delete Properties: delete objectName.key 
The delete keyword deletes both the value of the property and the property itself. After deletion, the property cannot be used unless added back again. The delete operator is designed to be used on object properties. It has no effect on variables or functions. The delete operator should not be used on predefined JavaScript object properties. It can crash your application.

/*Methods are actions that can be performed on objects*/
A function defined as the property of an object, is called a method to the object. To explain further, When the data stored on an object is a identifier() we call that a method. A property(key-value pairs) is what an object has, while a method is what an object does. The key serves as our method’s name, while the value is an anonymous identifier() expression(without the function keyword), A key’s value can be of any data type in the language including other objects & functions
Example:
```js
let goat = {
  dietType: "herbivore",
  makeSound: function () {
    console.log("baaa");
  },
};
```

Or shorthand syntax:
```js
let goat = {
  dietType: "herbivore",
  makeSound() {
    console.log("baaa");
  },
};
```

Note: JavaScript ES6 update: you can omit the colon and the `function` keyword for methods.

```js
const alienShip = { invade: function () { /* line of code */ } };
const alienShip2 = { invade() { /* line of code */ } };
```

Accessing Object Methods: objectName.methodName()

Add New Method: objectName.methodName = function() {code};
Note: Arrow shorthand syntax is not appropriate for objects.

### JavaScript Destructuring Assignment
The Javascript Destructuring Assignment is a convenient way of extracting multiple values from data stored in objects & Arrays, allows object/arrays to be extracted into specific variables. It uses a pair of curly braces/square brackets with variables names on the lefthand side of an assignment to extract values from objects. The number of variables can be less than the total properties of the object.

```js
const finance = {
  income: "$10",
  revenue: "$30",
  costs: "$5",
};

const { income, revenue, costs } = finance;
console.log(income); // prints "$10"

const numbers = [1, 2, 3];
const [num1, num2, num3] = numbers;
// same as: const [num1, num2, num3] = [1, 2, 3];
```


Note: Rest Operator (`...args`): specified when a function is declared/defined; takes a number of parameters and combines them into an array.

```js
function myFunc(...args) {
  // args is an array
}
```

Note: Spread Operator (`...args`): specified when a function is called; takes an array and expands it into individual arguments.

```js
myFunc(...args);
```
Note: Rest & Spread operator can be used on Arrays & Objects….such that, rest operator is used to represent that there are other sets of variable value(arrays)/key-value pairs(objects) in an array/object declaration. Spread operator is used to represent this values during their execution. 


### Nested Objects
In application code, objects are often nested— an object might have another object as a property which in turn could have a property that’s an array of even more objects! Remember arrays as also objects.
Syntax Example:
```js
let myObj = {
  name: "John",
  age: 30,
  cars: { car1: "Ford", car2: "BMW", car3: "Fiat" },
};

// Access car3 value without reference
myObj.cars.car3;
myObj["cars"]["car3"];

let p1 = "cars";
let p2 = "car3";

// Access car3 value using reference
myObj[p1][p2];
```

Values in objects can be arrays[], and values in arrays can be objects{}

All properties have a Key, In addition they also hold a value.
The value is one of the property's attributes. Other attributes are: enumerable, configurable, and writable/readable.
In JavaScript, all attributes can be read, but only the value attribute can be changed (and only if the property is writable).

### Looping Through Objects
We learned how to iterate through arrays using their numerical indexing, but the key-value pairs in objects aren’t ordered! JavaScript has given us alternative solution for iterating through objects with the for...in syntax .for...in will execute a given block of code for each property in an object.

#### Displaying Object Properties

1) Displaying the object properties by name
```js
document.getElementById("demo").innerHTML =
  person.name + "," + person.age + "," + person.city;
```

2) Displaying the object properties in a loop
```js
let txt = "";
for (let x in person) {
  txt += person[x] + " ";
}
document.getElementById("demo").innerHTML = txt;
```

3) Displaying the Object as Array
There are also useful Object class methods such as Object.assign(), Object.entries(), Object.keys(), & Object.values() just to name a few. 
Any JavaScript object can be converted to an array using the above function, With objectName as the argument..
Object.keys() will return an array containing property keys, Object.values() will return an array containing key’s value, Object.entries() will return an array containing an objects key-value pairs. Syntax: const myArray = Object.entries/keys/values(objectName);
Object.assign(target, source) takes two parameters, one being the target(new {key-value pairs} to be added) followed by comma, and source(objectName) and copies all enumerable own properties from one or more source objects to a target object. It returns the modified target object.

document.getElementById("demo").innerHTML = myArray; or console.log(myArray);
For a comprehensive list, browse (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object#Methods)


### Advanced Objects Notation
Objects are collections of related data(key-value pairs) and functionality. We store that functionality as methods on our objects.
Let robot = {
  model: '1E78V2',
  energyLevel: 100,
  provideInfo() { 
    return `I am ${this.model} and my current energy level is ${this.energyLevel}.`
  }}; 

The this keyword references the calling object variableName i.e robot which provides access to the calling object’s properties. The value of this.Key, when used in an object, is the object variable itself.
**In a constructor function this does not have a value. It is a substitute for the new object(). 
The value of this will become the new object when a new object is created.**

Note: What happens when we use Arrow functions: Arrow functions do not have their own this. They are not well suited for defining object methods.
provideInfo: () => {return `I am ${this.model} and my current energy level is ${this.energyLevel}.`}
Note: It inherently bind, or tie, an already defined this.key value to the function vairableName itself that is NOT the calling object. In the code snippet above, the value of this.key is the global object, or an object that exists in the global scope, which doesn’t have a property and therefore returns undefined, The key takeaway from the example above is to avoid using arrow functions when using this in a method!

Privacy in objects, we define it as the idea that only certain properties should be mutable or able to change in value. One common convention is to place an underscore _ before the name of a property(_key) to mean that the property should not be altered/which indicate these properties should not be accessed directly.

### Javascript Object Constructor function
A function designed to create new objects, is called an object constructor.
// This is a function constructor:
function myFunction(arg1, arg2, arg3) {
  this.argX = arg1;
  this.argY  = arg2;
  this.argZ  = arg3;
}
**The value of this, when used in a function, references the new object constructed that "owns" the function.**
A constructor invocation creates a new object. The new object inherits the properties and methods from its constructor.
The this keyword in the constructor does not have a value. The value of this will be the new object created when the function is invoked.

Note: A factory function is a function that returns an object and can be reused to make multiple object instances. Factory functions often accept parameters allowing us to customize the returned object.
Let  myPerson(first, last, age, eye) {
  firstName = first;
  lastName = last;
  age = age;
  job() {console.log(Trader);}
}


### JavaScript Classes & Methods
JavaScript Classes are templates for JavaScript Objects a tool that developers use to quickly produce similar objects. Class methods are created with the same syntax as object methods. Use the keyword class to create a className. Always add a constructor(properties) method. Then add any number of methods.
Note: "use strict"The syntax in classes must be written in "strict mode".
You will get an error if you do not follow the "strict mode" rules because in strict mode you’ll get an error if you use a variable without declaring it

### Syntax

```js
class ClassName {
  constructor(input1, input2, …..) {
  this.input1 = input1;   // In the context of a Class, this keyword references the calling Class Object i.e ClassName which provides access to the calling Class properties.  
  this.input2 = input2;   //We use this to set the value OF the constructor properties to constructor arguments.
 	 }//curly braces close the constructor method(I.e acts as a Object Constructor function to initialize the objects key=>value pairs)
  method_1() { line of code }
  method_2() { ... }
  method_3() { ... }
	}//curles braces close the class object

const objectName = new ClassName(input1, input2); //instance of an object
console.log(objectName.method_1()); //executing Class method

```

Note: To chain methods, we use return this in method block of code 

Note: Although you may see similarities between class and object syntax, there is one important method that sets them apart: The constructor method is a syntactic sugar & special method. It is used to initialize object properties, If you do not define a constructor method, JavaScript will add an empty constructor method. 

Note: An instance is an object that contains the property names and methods of a class, but with their own unique property values., using the new keyword to create an object instance. The new keyword calls the constructor(), runs the code inside of it, and then returns the new instance.

Syntax of creating an object instance
Let objectName = new ClassName(input1, input2, …….); 

We created a new Object with const objectName and assigned directly object’s properties using the new keyword & constructor template(input1, input2). 
objectName.input1 = valueofinput1;
objectName.input2 = valueofinput2;
…………………………………….

Note: The syntax for calling methods on an instance is the same as calling them on an object — append the instance with a period, then the property or method name. For methods, you must also include opening and closing parentheses().

Note: A JavaScript class is not an object. It’s an object template or blueprint to create objects

### Default Methods for Class
Note: Getters are methods that get & return the value of internal properties. We use the get keyword followed by a function. Example: get xyz() {line of code;}
Note: Setters can safely reassign property values. Along with getter methods, we can also create setter methods which reassign values of existing properties within an object.
✗Getters can perform an action on the data when getting a property.	✗Like getter methods, there are similar advantages to using setter methods that include checking input.

✗Getters can return different values using conditionals.	✗performing actions on properties, and displaying a clear intention for how the object is supposed to be used.
✗In a getter, we can access the properties of the calling object using this.key	 ✗Nonetheless, even with a setter method, it is still possible to directly reassign properties. 

✗The functionality of our code is easier for other developers to understand. 	We use get & set pairs Instead of adding or replacing method with this syntax objectName.key = “newValue”;. 

### Inheritance(further explained in sublime text)
When multiple classes share properties or methods, they become candidates for inheritance — a tool developers use to decrease the amount of code they need to write. Inheritance is useful for code reusability: reuse properties and methods of an existing class when you create a new class.

With inheritance, you can create a parent class (also known as a superclass) with properties and methods that multiple child classes (also known as subclasses) share. The child classes inherit the properties and methods(including getter) from their parent class. 

Note: To use class inheritance, use the extends keyword.
A class created with a class inheritance inherits all the methods from another class/parentclass/superclass.

Note: super() method refers to the parent class. By calling the super() method in the constructor method, we call the parent's constructor method and gets access to the parent's properties and methods.
you must always call the super method before you can use the this keyword — if you do not, JavaScript will throw a reference error. To avoid reference errors, it is best practice to call super(input_args*) on the first line of subclass constructors.

Note: In addition to the inherited features, child classes can contain their own properties, getters, setters, and methods. 

Note: Static class methods are defined on the Parent Class itself.
You cannot call a static method on an regular object, only on a class object. Sometimes you will want a class to have methods that aren’t available in individual instances/children classes, but that you can call directly from the class.

Note: Classes also allows you to use getters and setters.
It can be smart to use getters and setters for your properties, especially if you want to do something special with the value before returning them, or before you set them. Class method and getter syntax is the same as it is for objects except you can not include commas between methods.

Note: One benefit of Inheritance is that when you need to change a method or property that multiple classes share, you can change the parent class, instead of each subclass.


---
𝟏. String are objects with Methods->actions that can be performed or executed on it
(ref https://www.w3schools.com/jsref/jsref_obj_string.asp)
Let/var/const text1 = “for extracting a part of a string”;
text1.slice(start, end): extracts a part of a string and returns the extracted part in a new string. JavaScript counts positions from zero. First position is 0. Start & end can accept negative indexes.
	Converting to Upper & Lower case
text1.toUpperCase() & text1.toLowerCase()
text1 is converted to upper or lower case with the above syntax.	text1 = "Hello" + " " + "World!"; using concat(): text2 = "Hello".concat(" ", "World!"); instead for + operator.
text1.substring(start, end): same with slice, doesn’t accept negatives.	text1.indexOf(): method returns the index of (the position of) the first occurrence of a specified text in a string.	
text1.lastindexOf(): method returns the index of the last occurrence of a specified text in a string.
Both indexOf(), & lastIndexOf() return -1 if the text is not found and also accepts a second parameter as the starting position for the search. 		The charAt() method returns the character at a specified index (position-0,1,2,3….) in a string. text1.charAt() / The charCodeAt() method returns the unicode of the character at a specified index in a string.
text1.substr(start, length): same with slice, second parameter specifies the length to be extracted.	text1.search()  method accepts same arguments however it can’t take a second start position argument	
text1.includes() method returns true if a string contains a specified value.
text1.startsWith(searchvalue, position to start search)
text1.endsWith(searchvalue, length to search)	*All string methods return a new string. They don't modify the original string. Formally said: Strings are immutable: Strings cannot be changed, only replaced*


𝟐 Numbers are objects with Methods->actions that can be performed or executed on it
JavaScript has only one type of number. Numbers can be written with or without decimals. Extra large or small numbers can be written in exponent notation. JavaScript will try to convert strings to numbers in all numeric operations except JavaScript uses the + operator for both addition and concatenation. Numbers are added. Strings are concatenated. The JavaScript interpreter works from left to right except arithmetic brackets() taking precision. NaN is a JavaScript reserved word indicating that a number is not a legal number, You can use the global JavaScript function isNaN() to find out if a value is a number. Infinity (or -Infinity) is the value JavaScript will return if you calculate a number outside the largest possible number. 
All number methods can be used on any type of numbers (literals, variables, or expressions)      
Method	Description	Property	Description
isFinite()	Checks whether a value is a finite number	constructor	Returns the function that created JavaScript's Number prototype
isInteger()	Checks whether a value is an integer	MAX_VALUE	Returns the largest number possible in JavaScript
isNaN()	Checks whether a value is Number.NaN	MIN_VALUE	Returns the smallest number possible in JavaScript
isSafeInteger()	Checks whether a value is a safe integer	NEGATIVE_INFINITY	Represents negative infinity (returned on overflow)
toExponential(x)	Converts a number into an exponential notation, a parameter(x) defines the no. of characters behind the decimal point, after the number has been rounded up.	NaN	Represents a "Not-a-Number" value
toFixed(x)	Returns a string with x numbers of digits after the decimal point.	POSITIVE_INFINITY	Represents infinity (returned on overflow)
toLocaleString()	Converts a number into a string, based on the locale settings	prototype	Allows you to add properties and methods to an object
toPrecision(x)	Returns a string with a number written to specified x length		
toString()	Converts a number to a string		
valueOf()	Returns the primitive value of a number		

𝟑 Math Object☞Syntax Math.property
Allows you to perform Mathematical tasks on numbers. Unlike other objects, the math object has no constructor and it’s static, can be used without creating a math object first. JavaScript provides 8 mathematical constants that can be accessed as Math properties: Javascript Math Methods Syntax☞Math.method.(number)
(https://www.w3schools.com/jsref/jsref_obj_math.asp)
Math.round(x) //returns the nearest integer	Math.abs(x) //returns the absolute +positive value of x	Math.E        // returns Euler's number
Math.ceil(x) //returns value of x rounded up its nearest int.	Math.sin(x) //returns the sine value of x	Math.PI       // returns PI
Math.floor(x) //returns value of x rounded down its nearest int.	Math.cos(x) //returns the cosine value of x	Math.SQRT2    // returns the square root of 2
Math.trunc(x) //returns the integer part of x, 	Math.min(x,y,z,…) Math.max(x,y,z,…) //find the lowest or highest value in a list of arguments.	Math.SQRT1_2  // returns the square root of 1/2
Math.sign(x) //returns if x is +ve, -ve, or null.	Math.log(x) //returns the natural logarithm of x.	Math.LN2      // returns the natural logarithm of 2
Math.pow(x, y) //returns the value of x to the power of y.	Math.log2(x) //returns the base 2 logarithm of x.	Math.LN10     // returns the natural logarithm of 10
Math.sqrt(x) // returns the square root of x.	Math.log10(x) //returns the base 10 logarithm of x.	Math.LOG2E    // returns base 2 logarithm of E
	JavaScript provides 8 mathematical constants that can be accessed as Math properties: ⇥⇥	Math.LOG10E   // returns base 10 logarithm of E
Math.random() * x // returns a random number btw 0(inclusive), & x(exclusive) -> value less than(<) x // 
Math.random() * x + 1 // returns a random number btw 0(inclusive) & x(inclusive) -> value less than or equal(<=) to x //
To create a proper random function, 
Syntax: Math.random() * (max - min) + min;
//This JavaScript function always returns a random number between min (included) and max (excluded)//
Syntax: Math.floor(Math.random() * (max - min + 1) ) + min; //This JavaScript function always returns a random number between min (included) and max (included)//


𝟒 Arrays are objects with Methods->actions that can be performed or executed on it(ref https://www.w3schools.com/jsref/jsref_obj_array.asp)
The real strength of JavaScript arrays are the built-in array properties and methods.  For and .forEach() can be used to loop through an array.	/*Tip You can create an array, and then provide the elements*/ The full array can be accessed by referring to arrayName.
JavaScript arrays are special variables used to store multiple values in a single variableName at a time, and this values can be accessed by referring to an index number Array indexes start with 0. [0] is the first element. [1] is the second element... 	Arrays[ ] are special kind of objects and can have variables of different types in the same array, you can have objects{}, functions(), & arrays[]  in same array.
.push() add a new element to an array .pop() removes the last elements from an array. The return of the .push() is a new array length, return of the .pop() is the element removed.	.toString() converts an array to a string of(comma separated) array values. .join() joins all array elements into a string, but in addition you can specify the separator as the parameter.
.shift() method removes the first array element and "shifts" all other elements to a lower index, it’s return is the element removed, .unshift() method adds a new element at the beginning of an array & shifts all other elements to a higher index, it’s return is the new array length.	Arrays[ ] are Objects{ }, arrays use numbers to access it’s elements ✗(numbered indexes), objects use propertyName to access its members ✗(named indexes). Arrays with named indexes are called associative arrays (or hashes).   ⌫JavaScript does not support arrays with named indexes.
.splice(x, y) method can be used to add new items to an array, with 2 (parameters), 1st-defines position where new elements should be added, 2nd-defines how many elements should be removed. Returns an array with deleted items.	You should use objects{ } when you want the property names to be strings (text). You should use arrays[ ] when you want the element names to be numbers.
instanceOf & Array.isArray(): validates is a variable is an array, typeof returns object.	.length returns the length of an array, always one more than the highest array index. 

.concat() method, creates a new array by merging(concatenating) existing arrays which defines the parameters to use. It.s always return a new array, does not change the existing arrays.	.slice() method slices out a piece/part of an array, into a new array, but does not change the existing array. Its parameters/arguments, if one slices out the rest of the array, if two, The method then selects elements from the start argument, and up to (but not including) the end argument.
Changing an Array const arrayName = [“item1”, “item2”, …]; {arrayName[0] = “xyz”; -> returns [“xyz”, “item2”,…]; }	Syntax: const arrayName = [“item1”, “item2”, …];            Avoid using newArray( ) to create an Array[ ]. New keyword complicates and slows your code.

### JavaScript Sorting Arrays & Iterator Callback Function
Numeric sort() method sorts an int array numerically. To sort ascending order varName.sort(function(a, b){return a - b}); To .sort()  in descending order varName.sort(function(a, b){return b - a});
To .sort() in random order varName.sort(function(a, b){return 0.5 - Math.random()});   The .reverse() method reverses the elements in an array. 	/*After sorting an array, you can use the index to obtain highest&lowest values*/
Math.max.apply(null, points); finds highest number in array.100
Math.min.apply(null, points); finds lowest number in array.1
### How Numeric Sort works
const points = [40, 100, 1, 5, 25, 10];  The .sort() function(i.e function is the argument here, compares two values in an array, sorts the values according to the returned
-If the result is negative a is sorted before b.
(40, 100)(a - b) -60, a sorted before b 
-If the result is positive b is sorted before a.
(25, 10)(a-b) +15, b sorted before a.

-If the result is 0 no changes are done with the sort order of the two values.	Array.forEach(): The .forEach() method calls a function (a callback function) once for each array element. The functions takes 3 arguments(value, index, array). Iteration
Array.filter(): The .filter() method creates a new array with array elements that passes a test. takes 3 arguments(value, index, array).  Iteration	Array.map(): The .map() method creates a new array by performing a function on each array element. The method does not execute the function for array elements without values & does not change the original array. takes 3 arguments(value, index, array). Iteration

Array.every(): The .every() method checks if every/all array values passes a test. takes 3 arguments(value, index, array). Returns boolean true/false. Iteration	Array.some(): The .some() method checks if some array values passes a test. takes 3 arguments(value, index, array). Returns boolean true/false. Iteration
Array.find(): The .find() method returns the value of the first array element that passes a test function.  takes 3 arguments(value, index, array). Meanwhile findIndex() method returns the index of the first array element that passes a test function. Iteration	The reduce() method works from left-to-right in the array. See also reduceRight() works right-to-left, does not produce the original array. The functions takes 4 arguments(total, value, index, array). Iteration
Array.includes(search-element): .includes() This method allows us to check if an element is present in an array.	Array.lastIndexOf(element, start): The .lastIndexOf() is the same as Array.indexOf(), but returns the position of the last occurrence of the specified element.
Array.reduce(): The .reduce() method runs a function on each array element to produce (reduce it to) a single value. Sum of +	Array.indexOf(element, start): The .indexOf() method searches an array for an element value and returns its position. You may specify a search start ⇔ +ve ltr, -ve rtl. 
Javascript Array Const. const cars = ["Saab", "Volvo", "BMW"]
Just like every variable Once declared with const, arrayName cannot be reassigned. However you can perform array methods & properties on it, like changing and adding an element. Using  const to declare an array must be initialized/given a content when it’s declared, array declared with var can be initialized at any time. Array declared with const has block scope, declared with var doesn’t have block scope. Redeclaring an array declared with var is allowed, redeclaring/reassigning an array to const in same scope or same block is not allowed.
𝟓 Creating Date Objects
Date objects are created with the new Date() constructor.
There are 4 ways to create a new date object: 
Javascript counts months from 0 to 11, December is 11.
Date objects are created with the new Date() constructor. Syntax const d = ⇲
new Date(); create current date & time
new Date(year, month, day, hours, minutes, seconds, milliseconds); create current date-time with 7numbers to specify
new Date(milliseconds); creates current date as zero time plus milliseconds: zero time is 01 Jan 1970, 1day = 86,400,000ms. 
new Date(date string); creates a new date object from a “date string”.
/* Date.parse(): method converts dates to milliseconds*/

Get Date Methods->Getting info from date object & Set Date Methods->Setting date values for date object. 
Method	Description	Method	Description
getFullYear()	Get the year as a four digit number (yyyy)	setDate()	Set the day as a number (1-31)
getMonth()	Get the month as a number (0-11)	setFullYear()	Set the year (optionally month and day)
getDate()	Get the day as a number (1-31)	setHours()	Set the hour (0-23)
getHours()	Get the hour (0-23)	setMilliseconds()	Set the milliseconds (0-999)
getMinutes()	Get the minute (0-59)	setMinutes()	Set the minutes (0-59)
getSeconds()	Get the second (0-59)	setMonth()	Set the month (0-11)
getMilliseconds()	Get the millisecond (0-999)	setSeconds()	Set the seconds (0-59)
getTime()	Get the time (milliseconds since January 1, 1970)	setTime()	Set the time (milliseconds since January 1, 1970)
getDay()	Get the weekday as a number (0-6)		
Date.now()	Get the time. ECMAScript 5.		
Javascript Date Methods->actions that can be performed or executed on it Once date objects are created, you may operate a number of methods. i.e display/setting date objects using local time, UTC,GMT.	Javascript Date Inputs/ Output as “Strings” relative to browser time zone.
The toDateString() method converts a date to a more readable format(“string”).	ISO Date		"2015-03-25" (YYYY-MM-DD) *preferred format.
The toUTCString() method converts a date to a UTC string (a date display standard).	Short Date		"03/25/2015" ("MM/DD/YYYY”)
The toISOString() method converts a Date object to a string, using the ISO standard format.	Long Date		"Mar 25 2015" or "25 Mar 2015" ("MMM DD YYYY”)
ISO dates can be written with added hours, minutes, and seconds (YYYY-MM-DDTHH:MM:SSZ). T is separator

𝟲 JavaScript Bitwise Operators
JavaScript stores numbers as 64 bits floating point numbers, but all bitwise operations are performed on 32 bits binary numbers.
Before a bitwise operation is performed, JavaScript converts numbers to 32 bits signed integers.
After the bitwise operation is performed, the result is converted back to 64 bits JavaScript numbers.
Operator	Name	Description
&	AND	Sets each bit to 1 if both bits are 1
|	OR	Sets each bit to 1 if one of two bits is 1
^	XOR	Sets each bit to 1 if only one of two bits is 1
~	NOT	Inverts all the bits
<<	Zero fill left shift	 Shifts left by pushing zeros in from the right and let the leftmost bits fall off
>>	Signed right shift	Shifts right by pushing copies of the leftmost bit in from the left, and let the rightmost bits fall off
>>>	Zero fill right shift	 Shifts right by pushing zeros in from the left, and let the rightmost bits fall off


𝟕 JavaScript Regular Expressions Syntax: /pattern/flags;
A regular expression is a sequence of characters that forms a search-filter pattern.
(https://www.w3schools.com/jsref/jsref_obj_regexp.asp) & (https://regex101.com/) For creating and testing REGEX.

The test() method is a RegExp expression method. It searches a string for a pattern, and returns true or false, depending on the result.
The exec() method is a RegExp expression method. It searches a string for a specified pattern, and returns the found text as an object. 
If no match is found, it returns an empty (null) object.
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Cheatsheet

const regExp = /Reg_Ex_Pattern/flags;
const re = new RegExp('pattern', 'flags');


---

## Code Debugging
Often, when programming code contains errors, nothing will happen. There are no error messages, and you will get no indications where to search for errors.
Searching for (and fixing) errors in programming code is called code debugging.

Built-in debuggers can be turned on and off, forcing errors to be reported to the user.
With a debugger, you can also set breakpoints (places where code execution can be stopped), and examine variables while the code is executing.
In the debugger window, you can set breakpoints in the JavaScript code. At each breakpoint, JavaScript will stop executing, and let you examine JavaScript values.
After examining values, you can resume the execution of code (typically with a play button).

The debugger keyword stops the execution of JavaScript, and calls (if available) the debugging function. This has the same function as setting a breakpoint in the debugger. If no debugging is available, the debugger statement has no effect.

## JavaScript Errors: try/catch, throw, finally
The try statement allows you to define a block of code to be tested for errors while it is being executed.
The catch statement allows you to define a block of code to be executed/returned, if an error occurs in the try block.
The JavaScript statements try and catch come in pairs.
When an error occurs, JavaScript will normally stop and generate an error message. The technical term for this is: JavaScript will throw an exception (throw an error). The throw statement allows you to create a custom error message. If you use throw together with try and catch, you can control program flow and generate custom error messages.
Modern browsers will often use a combination of JavaScript and built-in HTML validation, using predefined validation rules defined in HTML attributes*/
The finally statement lets you execute code, after try & catch, regardless of the result

Syntax:
try {Block of code to try for error} 
throw “return specified/customized error string, message”
catch(error) {Block of code to handle errors object caught from try block & print to the console}
finally {Block of code to be executed regardless of the try / catch result}// finally = default. 

  Catches & handles the errors from TRY
	 // console.error(err.stack);
        // console.error(err.name);
        // console.error(err.message);
        // console.table(error);
        // console.error(error);
        // console.table(error);
        // console.warn(error);
	// console.log(error);

JavaScript has a built in error object that provides error information when an error occurs.The error object provides two useful properties: error name and message(“string”).
error Name	Description
EvalError	An error has occurred in the eval() function
RangeError	Using A number "outside of range" of values has occurred
ReferenceError	An illegal reference has occurred i.e use of an undeclared variable
SyntaxError	A syntax error has occurred
TypeError	A type error has occurred I.e use of a value outside the range of expected data types.
URIError	An error in encodeURI() has occurred, i.e use of illegal characters.
Syntax errors: These are spelling errors in your code that actually cause the program not to run at all, or stop working part way through — you will usually be provided with some error messages too. These are usually okay to fix, as long as you are familiar with the right tools and know what the error messages mean!
Logic errors: These are errors where the syntax is actually correct but the code is not what you intended it to be, meaning that program runs successfully but gives incorrect results. These are often harder to fix than syntax errors, as there usually isn't an error message to direct you to the source of the error.

## Asynchronous JavaScript and XML (AJAX) Event-loop
JavaScript uses an event loop to handle asynchronous function calls. When a program is run, function calls are made and added to a stack. The functions that make requests that need to wait for servers to respond then get sent to a separate queue. Once the stack has cleared, then the functions in the queue are executed.
1. An event occurs in a web page (the page is loaded, a button is clicked)
2. An XMLHttpRequest object is created by JavaScript
3. The XMLHttpRequest object sends a request to a web server
4. The server processes the request
5. The server sends a response(In form or XML/JSON back to the web page
6. The response is read & parsed by JavaScript
7. Proper action (like page update) is performed by JavaScript

Note: All modern browsers support the XMLHttpRequest object.
The XMLHttpRequest object can be used to exchange data with a web server behind the scenes. This means that it is possible to update parts of a web page, without reloading the whole page. An alternate to XMLHttpRequest(): The Fetch() API interface allows web browser to make HTTP requests to web servers. 

AJAX just uses a combination of:
A browser built-in XMLHttpRequest object (to request data from a web server) “ + “ JavaScript and HTML DOM (to display or use the response data).
AJAX applications might use XML to transport data, but it is equally common to transport data as plain text or JSON text.
We use “GET” to retrieve data from a source. 
Note: JSON is JavaScript Object Notation, which is how the response is going to be formatted.

### Creating the boilerplate
—We need to create the XMLHttpRequest object using the new keyword and assign it to a variable.
	All modern browsers have a built-in browser XMLHttpRequest/xhr object.
		const xhr = new XMLHttpRequest();

—Define a callback Function, which should contain block of code to execute when response of our request is ready or when event handler code is fulfilled.
  xhr.onload = () => { }.
  xhr.onload = function() { }
  xhr.onreadystatechange = () => { }.
  xhr.onreadystatechange = function() { }
Note: Use JSON.parse(responseText); if the response is coming as a JSON type document response.
Ref: readyStates & processes (https://www.w3schools.com/tags/ref_httpmessages.asp)

### Sending & specifying the Request
To send a request to a server, use the open() and send() methods of the XMLHttpRequest object I.e xhr.open() & xhr.send()
.open() creates a new request and the arguments passed in determine the type and URL of the request. .open(method, url, async, user, psw)	
.send() has no arguments/parameters.

method: the request type GET or POST
Always use POST requests when:
A cached file is not an option (update a file or database on the server).
Sending a large amount of data to the server (POST has no size limitations).
Sending user input (which can contain unknown characters), POST is more robust and secure than GET.
HTTP GET requests are made with the intention of retrieving information or data from a source (server) over the web. HTTP POST requests are made with the intention of sending new information to the source (server) that will receive it. GET requests have no body, so the information that the source(server) requires, in order to return the proper response, must be included in the request URL path or query string, For a POST request, the new information is stored in the body of the request.

url: the server(file) location
The url parameter of the open() method, is an address to a file on a server:
The file can be any kind of file(i.e plain.txt & .xml, or server scripting files like .asp & .php) which can perform actions on the server before sending the response back.
Query strings are used to send additional information to the server during an HTTP GET request. The query string is separated from the original URL using the question mark character ?.
In a query string, there can be one or more key-value pairs joined by the equal character =.
For separating multiple key-value pairs, an ampersand character & is used.

async: true (asynchronous) or false (synchronous)
Server requests should be sent asynchronously(true) which is the default async parameter. By sending asynchronously, the JavaScript does not have to wait for the server response, but can instead. It can execute other scripts while waiting for server response & deal with the response after the response is ready
user: optional user name
psw: optional password


## Fetch API
A JavaScript Fetch API is used to access and manipulate requests and responses within the HTTP pipeline(server-browser), fetching resources asynchronously across a network.
A basic fetch() request will accept a URL parameter, send a request and .then contain a success and failure promise handler function.
In the example, the block of code begins by calling the fetch(‘url’) function. 
Then a then() method is chained to the end of the fetch().
It ends with the response callback to handle success and the rejection callback to handle failure.

### BoilerPlate Synytax for Fetch()
fetch('url')
.then(
 function (res) { console.log(response); },
 function (rej) { console.log(rejection message) };
).then(jsonResponse => {return jsonResponse})

Note: In the case of ‘POST’(difference being a second argument determines that this request is a POST request and what information will be sent to the API)
fetch('https://api-to-call.com/endpoint', {
  method: 'POST',
  body: JSON.stringify({id: '200'})
}).then(
  response  => { console.log(response); },
  rejection => { console.log(rejection.message);
).then(jsonResponse => {return jsonResponse})


## JavaScript Hoisting & Strict Mode
Hoisting is JavaScript's default behavior of moving declarations to the top of the current scope / to the top of the current script / the current function. JavaScript only hoists declarations(assigning variableName), not initializations(assigning value to variable).
We should also be aware of the hoisting feature in JavaScript which allows access to function declarations before they’re defined. Arrow functions are not hoisted. They must be defined before they are used.
In JavaScript, a variable can be declared after it has been used, In other words; a variable can be used before it has been declared.
Variables defined with let and const are hoisted to the top of the block, but not initialized.
The block of code is aware of the variable, but it cannot be used until it has been declared.
Using a let & const variable before it is declared will result in a ReferenceError & SnntaxError
The variable is in a "temporal dead zone" from the start of the block until it is declared*/

"use strict"; Defines & indicates that the JavaScript code should be executed in "strict mode". You can use strict mode in all your programs. It helps you to write cleaner code, like preventing you from using undeclared variables.
Strict mode is declared by adding "use strict"; to the beginning of a script or a function. Declared at the beginning of a script, it has global scope (all code in the script will execute in strict mode), Declared inside a function, it has local scope (only the code inside the function is in strict mode)
Strict mode makes it easier to write "secure" JavaScript.
Strict mode changes previously accepted "bad syntax" into real errors.

### Not allowed in strict Mode
Using an object, without declaring it, is not allowed:	Deleting a variable (or object) is not allowed.
Deleting an undeletable property is not allowed:	The with statement is not allowed:
Deleting a function is not allowed.	Duplicating a parameter name is not allowed:
The word eval cannot be used as a variable:	The word arguments cannot be used as a variable:
Octal numeric literals are not allowed:	Octal escape characters are not allowed:
Writing to a read-only property is not allowed:	Writing to a get-only property is not allowed:

## JSON
JSON stands for JavaScript Object Notation
JSON is a language independent lightweight data-interchange format(in text format) for storing and transporting data between computers. 
The file type for JSON files is ".json"
The MIME type for JSON text is "application/json"
Note: It’s syntax is a subset & derived from JavaScript object notation, but the JSON format is text only. Therefore Data is in name/value pairs(aka key/value pairs), separated by commas where Curly{} braces hold objects, Square[] brackets hold arrays. 
Note: Every name-value pair is separated from another pair by a comma, ,. Similarly, every item in an array is delimited by a comma as well. Trailing commas are forbidden.
Note: In JSON, values must be one of the following data types:
a string-Strings in JSON must be written in double quotes.
However, In JSON, keys must be “strings”, written with double quotes:
a number-Numbers in JSON must be an integer or a floating point.
an object (JSON object)-Objects as values in JSON must follow it’s syntax
{"employee":{"name":"John", "age":30, "city":"New York"} }
an array-Values in JSON can be arrays.
{"employees":["John", "Anna", "Peter"] }
a boolean-Values in JSON can be true/false: {“sale":true}
null-Values in JSON can be null: {"middlename":null}

JSON values cannot be one of the following data types:
Function & date objects are not allowed, if you need to include then, write it as a “string”(with double quotes) and convert them back. Likewise undefined.

Note: JSON.parse(): A common use of JSON is to exchange data to/from a web server. When receiving data from a web server, the data is always a string. Parse the data(data being the argument) with JSON.parse(), and the data becomes a JavaScript object.

Note: JSON.stringify(): A common use of JSON is to exchange data to/from a web server. When sending data to a web server, the data has to be a string. Convert a JavaScript object into a string with JSON.stringify() (built in function). Any JavaScript object can be stringified (converted to a string) with the JavaScript function JSON.stringify(), with data as argument
/*JSON.stringify will not stringify() functions. This can be "fixed" if you convert the functions into strings using toString() with function as argument before stringifying*/
Also date strings must be converted suing a reviver as an argument to check it’s properties and convert it to a JS date object by using a new Date() method, and passing the value as it’s parameter

### JSON From a Server
You can request JSON from the server by using an AJAX request/Fetch.
As long as the response from the server is written in JSON format, you can parse() the string into a JavaScript object.

## Browser Compatibility & Transpilation
In this lesson, you will learn about two important tools for addressing browser compatibility issues.
caniuse.com — A website that provides data on web browser compatibility for HTML, CSS, and JavaScript features. You will learn how to use it to look up ES6 feature support.
Babel — A Javascript library that you can use to convert new, unsupported JavaScript (ES6), into an older version (ES5) that is recognized by most modern browsers. This is called Transpilation. 
Note: ES6 supports backward compatibility
Note: ES5 supports concatenation(+) for string interpolation , ES6 introduced template literals(‘text…… ${expression}….. text’ for string interpolation. String Interpolation is the process of evaluating string literals containing one or more placeholders(expressions, variables…etc) into a `string` to access & return their values. We can also use string concatenation in ES6. Automatic replacing of variables with real values is called string interpolation.
Example: var pasta = "Spaghetti"; var meat = "Pancetta"; var sauce = "Eggs and cheese";
Concatenation: “ + variable + “
 var carbonara = "You can make carbonara with " + pasta + ", " + meat + ", " + " and a sauce made with " + sauce + ".";  
Template literals: ${variable}
let carbonara = `You can make carbonara with ${pasta}, ${meat}, and a sauce made with ${sauce}.`; 

Review
Babel — A JavaScript package that transpiles JavaScript ES6+ code to ES5.
npm init — A terminal command that creates a package.json file.
package.json — A file that contains information about a JavaScript project.
npm install — A command that installs Node packages.
babel-cli — A Node package that contains command line tools for Babel.
babel-preset-env — A Node package that contains ES6+ to ES5 syntax mapping information.
.babelrc — A file that specifies the version of the JavaScript source code.
"build" script — A package.json script that you use to tranpsile ES6+ code to ES5.
npm run build — A command that runs the build script and transpiles ES6+ code to ES5.

How to use Babel
how to setup a JavaScript project that transpiles code when you run npm run build from the root directory of a JavaScript project. For future reference, here is a list of the steps needed to set up a project for transpilation:
Initialize your project using npm init and create a directory called src
Install babel dependencies by running syntax
npm install babel-cli -D
npm install babel-preset-env -D
Create a .babelrc file inside your project and add the following code inside it:
{
  "presets": ["env"]
}
Add the following script to your scripts object in package.json:
"build": "babel src -d lib"
Run npm run build whenever you want to transpile your code from your src to lib directories.

Don't Use new Object()
Use "" instead of new String()
Use 0 instead of new Number()
Use false instead of new Boolean()
Use {} instead of new Object()
Use [] instead of new Array()
Use /()/ instead of new RegExp()
Use function (){} instead of new Function()
Example
let x1 = "";             // new primitive string
let x2 = 0;              // new primitive number
let x3 = false;          // new primitive boolean
Declaring objects & arrays with const will prevent any accidential change of type.
const x4 = {};           // new object
const x5 = [];           // new array object
const x6 = /()/;         // new regexp object
const x7 = function(){}; // new function object

---

## Node.js
https://nodejs.org

### Introduction
You’ll sometimes hear front-end development referred to as client-side development. Our instinct might be to think of the client as the human visitor or user of a website, but when referring to the client in web development, we’re usually referring to the non-human requester of content. In the case of visiting a website, the client is the browser, but in other circumstances, a client might be another application, a mobile device, or even a “smart” appliance!

The collection of programming logic required to deliver dynamic content to a client, manage security, process payments, and myriad other tasks is sometimes known as the “application” or application server(Back-End Dev).

While the front-end is the part of the website(HTML, CSS & Javascript) that makes it to the browser, the back-end consists of all the behind-the-scenes processes and data that make a website function and send resources to clients(I.e like a warehouse of a store). 

A web server is a process running on a computer that listens for incoming requests for information over the internet and sends back responses. Each time a user navigates to a website on their browser, the browser makes a request to the web server of that website.  The specific format of a request (and the resulting response) is called the protocol. I.e When a visitor navigates to a website on their browser, they make an HTTP request protocol for the resources that make up that site. Modern web applications often cater to the specific user rather than sending the same files to every visitor of a webpage. This is known as “dynamic content”.w.r.t their relation to constraint 

In order to have consistent ways of interacting with data, a back-end will often include a web API. API stands for “Application Program Interface” and can mean a lot of different things, but a web API is a collection of predefined ways of, or rules for, interacting with a web application’s data, often through an HTTP request-response cycle. The type of request indicates how it would like to interact with a web application’s data (create new data, read existing data, update existing data, or delete existing data), and it receives some data back as a response.

Note: When building a robust web application back-end, we need to incorporate both authentication (Who is this user? Are they who they claim to be?) and authorization (Who is allowed to do and see what?) into our server-side logic to make sure we’re creating secure, personalized, and dynamic content.

Most developers make use of frameworks which are collections of tools that shape the organization of your back-end and provide efficient ways of accomplishing otherwise difficult tasks. The collection of technologies used to create the front-end(HTML, CSS, Js) and back-end(Java, Python, Javascript, PHP …etc) of a web application is referred to as a stack. This is where the term full-stack developer comes from.

---
Node.js is an open source server environment, which allows you to run single-threaded, non-blocking, asynchronously Javascript runtime programming, which is very memory efficient JavaScript on the server.	Node.js can create, open, read, write, delete, and close files on the server
A “runtime” converts code written in a high-level, human-readable, programming language and compiles it down to code the computer can execute. A runtime environment is where your program will be executed. It determines what global objects your program can access and it can also impact how it runs	Node.js can generate dynamic page content
Note: Node.js modules/files must be initiated in the “Terminal Shell/Command Prompt Interface" program of your computer.	Node.js can collect form data. Node.js can add, delete, modify data in your database

### Modules
https://nodejs.org/api/

### Cheatsheets
https://overapi.com/nodejs

Note: The words “module” and “file” are often used interchangeably

Modularity is a software design technique where one program has distinct parts, each providing a single piece of the overall functionality. These separate modules come together to build a cohesive whole.  Modules are reusable pieces of code in a file that can be exported and then imported for use in another file. A modular program is one whose components can be separated, used individually, and recombined to create a complex system. Modularity is essential for creating scalable programs which incorporate libraries and frameworks and separate the program’s concerns into manageable chunks. Essentially, a module is a collection of code located in a file. Instead of having an entire program located in a single file, code is organized into separate files based on the concerns they address. These files can then be included in other files by using the require() function.

You can create your own modules, Save the code in a file called "myfirstmodule.js"and easily export their function, variable values, arrays & objects in other application file. 
Use the module.exports. keyword to make your module properties(variable values, arrays & objects) and methods(function) available outside the module file. Include your module in the any of the node.js files using the require Keyword.

To save developers from reinventing the wheel each time, Node.js has several built-in modules to perform common tasks efficiently. These are known as the core modules. The core modules are defined within Node.js’s source code and are located in the lib/ folder. Core modules can be required by passing a string with the name of the module into the require() function: 
In JavaScript, there are two runtime environments and each has a preferred module implementation. The Node runtime environment and the browser’s runtime environment
module.exports is an object that is built-in to the Node.js runtime environment. Another feature that is built-in to the Node.js runtime environment: The require() function accepts a string as an argument. That string provides the file path to the module you would like to import.

Using Object Destructuring { single functionality }to be more Selective With require() In many cases, modules will export a large number of functions but only one or two of them are needed. You can use object destructuring to extract only the needed functions.

### Built-in module: module
module is actually another built-in core module of Node.js. When we require it and append the builtinModules property, it gives the list of every core module. require('module').builtinModules inside REPL.

“Below are modules global to the Node.js V8 chrome engine”
__dirname, __filename —>Specifies the file/directory/folder.
console, exports, global, module, Buffer, process, require(),
queueMicrotask(callback),  setImmediate(callback[, ...args]), 
setInterval(callback, delay[, ...args]), setTimeout(callback, delay[, ...args]), clearImmediate(immediateObject), clearInterval(intervalObject), 
clearTimeout(timeoutObject), TextDecoder, TextEncoder, URL, URLSearchParams, WebAssembly

### Understanding setImmediate() process.nextTick() setTimeout() setInterval()
When we pass a function to process.nextTick(), we instruct the engine to invoke this function at the end of the current operation, before the next event loop tick starts. The event loop is busy processing the current function code. When this operation ends, the JS engine runs all the functions passed to nextTick calls during that operation. It's the way we can tell the JS engine to process a function asynchronously (after the current function), but as soon as possible, not queue it.
Calling setTimeout(() => {}, 0) will execute the function at the end of next tick, much later than when using nextTick() which prioritizes the call and executes it just before the beginning of the next tick. Use nextTick() when you want to make sure that in the next event loop iteration that code is already executed.
Any function passed as the setImmediate() argument is a callback that's executed in the next iteration of the event loop. How is setImmediate() different from Zero-Delay setTimeout(() => {}, 0) (passing a 0ms timeout), and from process.nextTick()
A function passed to process.nextTick() is going to be executed on the current iteration of the event loop, after the current operation ends. This means it will always execute before setTimeout and setImmediate.
A setTimeout() callback with a 0ms delay is very similar to setImmediate(). The execution order will depend on various factors, but they will be both run in the next iteration of the event loop.
Note: Every time the event loop takes a full trip, we call it a tick.
setInterval is a function similar to setTimeout, with a difference: instead of running the callback function once, it will run it forever, at the specific time interval you specify (in milliseconds). 

Handling errors in callbacks
How do you handle errors with callbacks? One very common strategy is to use what Node.js adopted: the first parameter in any callback function is the error object: error-first callbacks
If there is no error, the object is null. If there is an error, it contains some description of the error and other information. Asynchronous Operations in Node.Js implements error-first callback functions, to handle error unlike their synchronous counterparts, where an error leads to a halt in program execution. 



┌──────────────┐
│          dir        │    base    │
├──────┬              ├──┤
│ root │            │ name │ ext │
"  /    home/user/dir / file      .txt "
└──────┴─────────┘
(All spaces in the "" line should be ignored. They are purely for formatting.)
//	 root: '/',
//   dir: '/home/user/dir',
//   base: 'file.txt',
//   ext: '.txt',
//   name: 'file' 
path.join() method allows us to create cross-platform filepaths.
path.join(__dirname, /file.txt) ==> /home/user/dir/file.txt whichIS absolute path 
I.e ./file.text === relative path



### Node.js Global Console Module
In Node.js, the terminal is used to send and receive text feedback to and from a program, often for debugging purposes. This may sound familiar to how we use the DOM console. That’s because in Node.js, the built-in console module exports a global console object that gives the terminal similar functionality. 
- console.log() — to print messages to the terminal.
- console.assert() — to print a message to the terminal if the value is falsy.
- console.table() — to print out a table in the terminal from an object or array.

### Node.js Global Process Module
In computer science, a process is the instance of a computer program that is being executed. Node has a global process object with useful methods and information about the current process.
- process.env -property is an object which stores and controls information about the environment in which the process is currently running. 
- process.memoryUsage() -returns information on the CPU demands of the current process. 
- process.memoryUsage().heapUsed -will return a number representing how many bytes of memory the current process is using. Heap can mean different things in different contexts: a heap can refer to a specific data structure, but it can also refer to the a block of computer memory.
- process.argv property holds an array of command line arguments provided when the current process was initiated. The first element in the array is the absolute path to Node, which ran the process. The second element in the array is the path to the file that’s running. The following elements will be any command line arguments provided when the process was initiated. Command line arguments are separated from one another with whitespaces.

### Node.js Global Process Input/Output Module
Input is data that is given to the computer, while output is any data or feedback that a computer provides. In Node,  using the 
- stdin.on() method on the process object we can get input from a user. We are able to use this because .on() is an instance of EventEmitter. 
- .stdout.write() method on the process object To give an output, we can use the  as well. This is because console.log() is a thin wrapper on .stdout.write().

// Recieves an input
process.stdin.on('name of event', listenerCallbackFunction);
// Gives an output
process.stdout.write();

### Node.Js Global Error Module
The Node environment’s error module has all the standard JavaScript errors such as EvalError, SyntaxError, RangeError, ReferenceError, TypeError, and URIError as well as the JavaScript Error class for creating new error instances. 

Within our own code, we can generate errors and throw them, and, with synchronous code in Node, we can use error handling techniques such as try...catch statements. However traditional try...catch statements won’t work for errors thrown during asynchronous operations.

Instead we use error-first callback functions >> callback functions which have an error as the first expected argument and the data as the second argument. If the asynchronous task results in an error, it will be passed in as the first argument to the callback function. If no error was thrown, the first argument will be undefined.

const api = require('./api.js');
// An error-first callback
let errorFirstCallback = (err, data) => {
  if (err) {
    console.log(`Something went wrong. ${err}\n`);
  } else {
    console.log(`Something went right. Data: ${data}\n`);
  }
};
api.errorProneAsyncApi('problematic input', errorFirstCallback);

We require the local api.js module which contains the api.naiveErrorProneAsyncFunction() method. This asynchronous method designed to work like the asynchronous methods in Node. invoke the api.errorProneAsyncApi() method with ‘err input' as the first argument and the error-first callback as the second.

### Node.js Global Buffer Module
In Node.js, the Buffer module is used to handle binary data. A Buffer object represents a fixed amount of memory that can’t be resized. Buffer objects are similar to an array of integers where each element in the array represents a byte of data. The buffer object will have a range of integers from 0 to 255 inclusive. The Buffer module provides a variety of methods to handle the binary data such as 

Buffer.alloc() method creates a new Buffer object with the size specified as the first parameter. .alloc() accepts three arguments:
- Size: Required. The size of the buffer
- Fill: Optional. A value to fill the buffer with. Default is 0.
- Encoding: Optional. Default is UTF-8.

.toString() method translates the Buffer object into a human-readable string. It accepts three optional arguments:
- Encoding: Default is UTF-8.
- Start: The byte offset to begin translating in the Buffer object. Default is 0.
- End: The byte offset to end translating in the Buffer object. Default is the length of the buffer. The start and end of the buffer are similar to the start and end of an array, where the first element is 0 and increments upwards.

Buffer.from() method is provided to create a new Buffer object from the specified string, array, or buffer. The method accepts two arguments:
- Object: Required. An object to fill the buffer with.
- Encoding: Optional. Default is UTF-8.

Buffer.concat() method joins all buffer objects passed in an array into one Buffer object. .concat() comes in handy because a Buffer object can’t be resized. This method accepts two arguments:
- Array: Required. An array containing Buffer objects.
- Length: Optional. Specifies the length of the concatenated buffer.

### Node.js Readable/Writable Streams
const stream = require(‘stream’);
A stream is an abstract interface for working with streaming data in Node.js. The stream module provides an API for implementing the stream interface.  All streams are instances of EventEmitter. Both Writable and Readable streams will store data in an internal buffer. 
There are four fundamental stream types within Node.js:
- Writable: streams to which data can be written -> fs.createWriteStream()
- Readable: streams from which data can be read -> fs.createReadStream()
- Duplex: streams that are both Readable and Writable (for example, net.Socket).
- Transform: Duplex streams that can modify or transform the data as it is written and read (for example, zlib.createDeflate()).
Additionally, this module includes the utility functions stream.pipeline(), stream.finished(), stream.Readable.from() and stream.addAbortSignal().

### Node.js OS Module
const os = require('os'); / import os from ‘os’
Allows Node.js access to information about the computer, operating system, and network on which the program is running. OS module object is not global and needs to be imported. With the os module saved to the os variable, you can call methods like:
- os.type() — to return the computer’s operating system.
- os.arch() — to return the operating system CPU architecture.
- os.networkInterfaces — to return information about the network interfaces of the computer, such as IP and MAC address.
- os.homedir() — to return the current user’s home directory.
- os.hostname() — to return the hostname of the operating system.
- os.uptime() — to return the system uptime, in seconds.

### Node.js Util Module
const util = require('util');
The util module contains methods used to maintain and debug your code.
Developers sometimes classify outlier functions used to maintain code and debug certain aspects of a program’s functionality as utility functions. Utility functions don’t necessarily create new functionality in a program, but you can think of them as internal tools used to maintain and debug your code. The Node.js util core module contains methods specifically designed for these purposes. One important object is types, which provides methods for runtime type checking in Node. Returning Boolean.
- .promisify(), which turns callback functions into promises. Since promises are often preferred over callbacks and especially nested callbacks, Node offers a way to turn these into promises. util.Promisify(callbackFunc)

9. Node.js File System Module Syntax☞ const fs = require('fs');
The Node.js core module is an API for interacting with the file system. It was modeled after the POSIX standard for interacting with the filesystem, allows you to work with the file system on your computer.  Each method available through the fs module has a synchronous version(doesn’t require error-first callback func) and an asynchronous version(requires an error-first-callbackFunc as argument). 
Common use for the File System module with their methods.
Read files || Create files  || Update files || Delete files  || Rename files
- Writable: streams to which data can be written -> .createWriteStream()
- Readable: streams from which data can be read -> .createReadStream()
- .unlink() method to delete files, argument is the file-path to be deleted.
- .readFileSync() method which reads data from a provided file synchronously. It’s 1st arg is the file-path to read from, 2nd arg is the encoding format
- .writeFileSync() method which writes data into a provided file synchronously
it’s 1st arg is a new file-path, 2nd arg is the read data. 
- .readFile() method which reads data from a provided file asynchronously.
fs.readFile('./file-path’, 'utf-8', err-first-Callback);
- The first argument is a string that contains a path to the file file.txt.
- The second argument is a string specifying the file’s character encoding (usually ‘utf-8’ for text files).
- The third argument is an error-first callback function to be invoked when the asynchronous task(non-blocking) of reading from the file system is complete. The error-first callback function which expects an error to be passed as the first argument and data(contents of file) as the second. Node will pass the contents of file.txt into the provided callback as its second argument(data)
- .writeFile()- since the error-first callback function is passed the data from .readfile, & returns this data, we can therefore invoke the .writeFile() method within the {code block} of the err-first-callbackfunc with It’s 1st argument-> a new file-path, 2nd argument-> the read data. .

Access the promise-based version of the fs module like so:
const fs = require("fs").promises;
Instead of taking a err-first callback, these methods return a Promise.
const writePromise = fs.writeFile("./out.txt", "Hello, World");
writePromise.then(() => console.log("success!")).catch(err => console.error(err));

### Node.js Readline Module
Syntax☞ const readline = require('readline');
The Readline module provides an interface for reading data from a Readable stream one line at a time. This is what we call streams. Streaming data is preferred as it doesn’t require tons of RAM and doesn’t need to have all the data on hand to begin processing it. Streams allow us to read or write data piece by piece instead of all at once.
- .createInterface()- To read files line-by-line, Instances of the readline.Interface class are constructed using the readline.createInterface() method. Every instance is associated with a single input Readable stream and a single output Writable stream. The output stream is used to print prompts for user input that arrives on, and is read from, the input stream. This returns an EventEmitter set up to emit 'line' events.

const readline = require('readline’);//use the readline stream module
const fs = require('fs’);//use the file system module
const myInterface = readline.createInterface({
  input: fs.createReadStream('text.txt')
});
myInterface.on('line', (fileLine) => {
  console.log(`The line read: ${fileLine}`);
});
 

11. Node.js Events Class Module
Node.js core API is built around an idiomatic asynchronous event-driven architecture in which certain kinds of objects (called "emitters") emit named events that cause Function objects ("listeners") to be called. Objects in Node.js can fire events, Node.js has a built-in module, called "Events", where you can create-, fire-, and listen for- your own events. 
Node.js has an EventEmitter class which can be accessed by importing the events core module by using the require() statement. Each event emitter instance has an .on() method which assigns a listener callback function to a named event. EventEmitter also has an .emit() method which announces a named event that has occurred. Syntax below.
const events = require('events'); //import event module
Class events Extends EventEmitter { }
const myEmitter = new events.EventEmitter();//creating an instance of the events.EventEmitter class constructor using the new keyword & getting access to it’s properties & methods.

The eventEmitter.on() method is used to register listeners, while the eventEmitter.emit() method is used to trigger the event.
Each event emitter instance has an .on(‘events’, callbackfunction) method which assigns & register a listener callback function(optional args/data) to a named event. The .on() method takes as its first argument the name of the event as a ‘string’ and, as its second argument, the listener callback function—>analogous to jQuery. Each event emitter instance also has an .emit() method which triggers a named event /announces an event has occurred. The .emit() method takes as its first argument the name of the event as a ‘string’ and, as its second argument, the optional args/data that should be passed into the listener callback function.
When a listener is registered using the .on() method, that listener is invoked every time the named event is emitted. Using the .once() method, it is possible to register a listener that is called at most once for a particular event. Once the event is emitted, the listener is unregistered and then called.

12. Node.js Global timers Module
The global timers module contains scheduling functions such as setTimeout(), setInterval(), and setImmediate(). These functions are put into a queue processed at every iteration of the Node.js event loop. This means that the timer functions are scheduled and put into a queue. This queue is processed at every iteration of the event loop. If a timer function is executed outside of a module, the behavior will be random (non-deterministic).

Note: The setImmediate() function executes the specified callback function after the current event loop has completed<->The function to call at the end of this turn of the Node.js Event Loop. The method accepts a callback function as its first argument and optionally accepts arguments for the callback function as the subsequent arguments. If you instantiate multiple setImmediate() functions, they will be queued for execution in the order that they were created.

Note: If callback is not a function, a TypeError will be thrown.
The setImmediate(), setInterval(), and setTimeout() methods each return objects that represent the scheduled timers. These can be used to cancel the timer and prevent it from triggering. clearImmediate(immediateObject), clearInterval(intervalObject), & clearTimeout(timeoutObject)

### Node.js HTTP Module
const http = require('http'); 
To process HTTP requests in JavaScript and Node.js, we can use the built-in http module. This core module is key in leveraging Node.js networking and is extremely useful in creating HTTP servers and processing HTTP requests. Allows Node.js to transfer data over the Hyper Text Transfer Protocol (HTTP). 

The http module comes with various methods that are useful when engaging with HTTP network requests. One of the most commonly used methods within the http module is the .createServer() method. This method is responsible for doing exactly what its namesake implies; it creates an HTTP server. To implement this method to create a server, the following code can be used.

const http = require('http'); 
http.createServer(function (req, res) {
code to be executed based on request & response from server 
}).listen(port#, () => {
Callback function allowing it to carry out a task 
after the server has successfully started
}); 		
Alternative:
const server = http.createServer((req, res) => {
  res.end('Server is running!');
});
server.listen(8080, () => {
  const { address, port } = server.address();
  console.log(`Server is listening on: http://${address}:${port}`);
})

The .createServer() method takes a single argument in the form of a callback function. —>This callback function has two primary arguments; the request (commonly written as req) and the response (commonly written as res).

Note: The req object contains all of the information about an HTTP request <ingested> by the server. It exposes information such as the HTTP method (GET, POST, etc.), the url, pathname, headers, body, and so on. 

Note: The res object contains methods and properties pertaining to the generation of a response by the HTTP server. This object contains methods such as 
res.setHeader() (sets HTTP headers on the response)
res.statusCode (set the status code of the response) (https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#information_responses)
Once a request is processed, a response must be returned to the client to inform it of what happened. To build a response for the client, several pieces of information are required. One of these pieces of information is the HTTP response status code, which is responsible for indicating whether a specific HTTP request has been successfully completed. Each response status code conveys information about what happened during the processing of the request, which in turn helps the client decide how to handle the response and if further action is necessary. 
res.end() (dispatches the response to the client who made the request). 

Once the .createServer() method has instantiated the server, it must begin listening for connections. This final step is accomplished by the 
Note: .listen() method on the server instance. This method takes a port# as the 1st argument, which tells the server to listen for connections at the given port#. Additionally, the .listen() method takes an optional callback function as a second argument, allowing it to carry out a task after the server has successfully started. Using this simple .createServer() method, in conjunction with the callback, provides the ability to process HTTP requests dynamically and dispatch responses back to their callers.

14. Node.js Url Class Module const url = require('url');
Typically, an HTTP server will require information from the request URL to accurately process a request. This request URL is located on the url property contained within the req object itself. To parse the different parts of this URL easily, Node.js provides the built-in url module. The core of the url module revolves around the URL class. A new URL object can be instantiated using the URL class as follows:
const url = new URL('https://www.example.com/p/a/t/h?query=string);
Once instantiated, different parts of the URL can be accessed and modified via various properties, which include:

- .hostname: Gets and sets the host name portion of the URL.
- .pathname: Gets and sets the path portion of the URL.
- .searchParams: Gets the search parameter object representing the query parameters contained within the URL. Returns an instance of the URLSearchParams class.
Using these properties, one can break the URL down into easily usable parts for processing the request. While the url module can be used to deconstruct a URL into its constituent parts, it can also be used to construct a URL
Once all parts of the URL have been added, the composed URL can be obtained using the .toString() method. 
.toString(); // Creates URL “https://www.example.com/p/a/t/h?query=string”

15. Node.js Querystring Module  const querystring = require(‘querystring’);
While the url module can handle query strings attached to URLs, it can also be done with the built-in querystring module. The querystring module is dedicated to providing utilities solely focused on parsing and formatting URL query strings. 
The querystring module is focused solely on manipulating URL query strings, so it requires the query string to have already been isolated from an incoming URL as part of a request. This means that some pre-processing of the URL is necessary before being able to use the module. Such as using the js split() method .split() || .split(separator) || .split(separator, limit) —>.split('?')[1]

As such, the module provides a much smaller number of methods to use. The core methods are listed below:

- querystring.parse(): This method is used for parsing a URL query string into a collection of key-value pairs. The .decode() method does the same.
- querystring.stringify(): This method is used for producing a URL query string from a given object via iteration of the object’s “own properties.” The .encode() method does the same.
- .escape(): This method is used for performing percent-encoding on a given query string.
- .unescape(): This method is used to decode percent-encoded characters within a given query string.

### Anatomy of the Uniform Resource Locator
Basic Url Syntax<— protocol/domain/path/{path_parameter_optional}?query
A URL can provide a great deal of information about a request and how it is expected to behave. A URL is made up of the following parts: Anatomy of a URL
1) Protocol: The protocol of the URL denotes what protocol is being used for this particular resource. For instance, a URL could have a protocol of HTTP or HTTPS.
2) Domain: The domain of the URL is a unique reference that identifies a website on the Internet through the domain name system(DNS)
3) Path: The path refers to a ./file or directory on the web server. Paths oftentimes contain path parameters that APIs can process as a way to provide additional data when processing. 
Path parameters appear as part of the path on a URL
4) Query: The query is commonly found on pages that contain dynamic content. Queries are prefixed by a ? and appear at the end of a URL. Queries can be comprised of multiple key/value pairs, separated by a &, with each key being assigned its corresponding value using =. Queries are often used in conjunction with GET requests to pass filter parameters in order to provide specificity for the requested resource. I.e ?key1=value1&key2=value2…..

---

HTTP, short for Hypertext Transfer Protocol, is a request-response protocol that serves as the foundation of data exchange and communication within the client-server computing model. What this means in simpler terms is that HTTP helps facilitate the exchange of information between a client (i.e. browser, website, mobile app, etc.) and a server.

1) The client(browser) submits an HTTP request message to the server. 2) The server receives the HTTP request, performs some functions on behalf of the client according to the request. 3) The server returns a response data/message to the client containing important information about the processing of the request.
The HTTP module can create an HTTP server object that listens to server ports and gives a response back to the client. 

The Structure of HTTP
HTTP requests and responses have specific structures to help facilitate the exchange of information between a client and a server. These structures encapsulate all of the important information required to instruct the recipient of the message on how to react.

1) HTTP Method: The HTTP method is usually a verb, such as GET and POST, or a noun such as OPTIONS and HEAD. These methods inform the server of the intent of the request and are used in accurately routing and processing requests. For instance, an HTTP request containing a GET method implies that the client wants to fetch a resource. The list of supported HTTP methods can be found using the http.METHODS property.	1) HTTP Protocol Version: The version of the HTTP protocol, similar to the request.
2) PathName: The path denotes the path of the resource relative to the root URL. For example, making a GET request to https://codecademy.com/api/lessons would strip common elements such as the protocol (https://) and domain (codecademy.com), leaving the path of /api/lessons.	2) Status Code: The status code indicates if the request was successful and, if not, why it wasn’t successful.
3) HTTP Protocol Version: The version of the HTTP protocol (I.e. HTTP/1.1, HTTP/2, and HTTP/3). We will learn more about this in the next exercise.	3) Status Message: The status message provides a short description of the corresponding status code.
4) Headers: Headers are optional and are used to convey additional information that may be important in processing a request by a server. There is an extensive list of standard headers that can be used, as well as custom headers that can be added on a per-application basis.	4) Headers: These response headers are similar to those provided in a request.
5) Body: The body contains data required to be sent to the server to process a request. The body is not leveraged for all request types. It is most common to see a body attached to requests with verbs such as POST, PUT, and PATCH.	5) Body: The body of a response contains data corresponding to the fetched resource. The body is optional and contains data only when necessary to fulfill the request.

### Routing
To process and respond to requests appropriately, servers need to do more than look at a request and dispatch a response. Internally, a server needs to maintain a way to handle each request based on specific criteria such as method, pathname, etc. The process of handling requests in specific ways based on the information provided within the request is known as “Routing”.

The method is one important piece of information that can be used to route requests. Since each HTTP request contains a method such as GET and POST, it is a great way to discern different classes of requests based on the action intended for the server to carry out. Thus, all GET requests could be routed to a specific function for handling, while all POST requests are routed to another function to be handled. This also allows for the logical co-location of processing code with the specific verb to be handled.
We can distinguish one request from another of the same method through the use of the pathname. The pathname allows the server to understand what resource is being targeted, allowing the server to handle many different types of requests to different resources.

Databases are remote resources to which the server must make a request. When this happens, the server making the <request> functions as the client, sending HTTP messages to the <database server>. Databases usually have their own Software Development Kits (SDKs) and Object-Relational Mapping (ORMs) that can be used to connect to them easily. But with the right information, requests could potentially be made in a raw form directly from your server using something like the HTTP .request() method.

As seen in the diagram above, a single server often does not represent the final destination in processing a request from a client. Instead, a client sends a request, which is then processed partially, generating a separate HTTP request from the server to the database. When received, the server waits for the database’s response and will ultimately relay that information as a response back to the original caller.

The back-ends of modern web applications include some sort of database, often more than one. Databases are collections of organized stored information that can be easily accessed, managed and updated.There are many different databases, but we can divide them into two types: 
Relational databases store information in tables with columns and rows. SQL, Structured Query Language, is a programming language for accessing and changing data stored in relational databases. Popular relational databases include MySQL and PostgreSQL.

Non-Relational databases (also known as NoSQL databases). use other systems such as key-value pairs or a document storage model. Non-relational databases might while popular NoSQL databases include MongoDB and Redis.

MongoDB, which is a document-oriented NoSQL database. It is crucial to be aware of how the data is stored in different types of databases and how
we can connect to these remote database servers and retrieve the desired data. In a document-oriented NoSQL database, the data is organized into a hierarchy of the following levels:
databases >> collections >> documents
Databases make up the top level of data organization in a MongoDB instance. Databases are organized into collections which contain documents. Documents contain literal data such as strings, numbers, dates, etc. in a JSON-like format.
Each document consists of key-value pairs which are the basic unit of data in a MongoDB database. A single collection can contain multiple documents and they
are schema-less meaning that the size and content of each document can be different from each another
In order to connect to the remote MongoDB server running on the target box, we will need to install the MongoDB shell utility, which can be done on Debian-based Linux distributions (like Parrot, Kali and Ubuntu) by downloading the following tar archive file We must then extract the contents of the tar archive file using the tar utility. Navigate to the location where the mongosh binary is present.
Let's now try to connect to the MongoDB server running on the remote host as an anonymous user. We can list the
databases present on the MongoDB server using the following command.
curl -O https://downloads.mongodb.com/compass/mongosh-2.3.2-linux-x64.tgz
tar xvf mongosh-2.3.2-linux-x64.tgz
cd mongosh-2.3.2-linux-x64/bin
./mongosh mongodb://{target_IP}:27017
show dbs;

Let's list down the collections stored in the sensitive_information database using the following -> show collections; command.
We can dump the contents of the documents present in the collection name by using the db.collectionName.find() command. Let's replace the collection
name flag in the command and also use pretty() in order to receive the output in a beautified format -> db.collectionName.find().pretty();

Redis (REmote DIctionary Server) is an open-source advanced NoSQL key-value data store used as a database, cache, and message broker. The data is stored in a dictionary format having key-value pairs. It is typically used for short term storage of data that needs fast retrieval. Redis does backup data to hard drives to provide consistency. Redis runs as server-side software so its core functionality is in its server component. The server listens for connections from clients, programmatically or through the command-line interface.
The command-line interface (CLI) is a powerful tool that gives you complete access to Redis’s data and its functionalities if you are developing a software or tool that needs to interact with it. Now, to be able to interact remotely with the Redis server, we need to download the redis-cli utility. It can be downloaded using the following command : sudo apt install redis-tools && redis-cli -h {target_IP}
Alternatively, we can also connect to the Redis server using the netcat utility, but we will be using redis-cli in this write-up as it is more convenient to use.
The keyspace section provides statistics on the main dictionary of each database. The statistics include the number of keys, and the number of keys with an expiration.
Let us select this Redis logical database by using the select command followed by the index number of the database that needs to be selected : select 0
We can list all the keys present in the database using the command : keys *
We can view the values stored for a corresponding key using the get command followed by the keynote:  get <key>

The database is stored in the server's RAM to enable fast data access. Redis also writes the contents of the database to disk at varying intervals to persist it as a backup, in case of failure. The back-end needs a way to programmatically access, change, and analyze the data stored. In fact, much of what the back-end entails is reading, updating, or deleting information stored in a database.
There are different types of databases and one among them is Redis, which is an 'in-memory' database. In-memory databases are the ones that rely essentially on the primary memory for data storage (meaning that
the database is managed in the RAM of the system); in contrast to databases that store data on the disk or SSDs. As the primary memory is significantly faster than the secondary memory, the data retrieval time in the case of 'in-memory' databases is very small, thus offering very efficient & minimal response times.
Applications like Redis or databases are designed to operate securely only on internal/trusted networks and never get exposed over the Internet.
This is indeed a secure practice, but it is based on the hypothesis that the internal network is
uncompromised. If a machine that has access to the internal network gets compromised it is possible to access these instances using tunneling.



Overview of Data Brokering with Node.js: https://heynode.com/tutorial/what-data-brokering/

### Interacting with Another Backend API
Just like with databases, sometimes servers need to make requests to external APIs to accomplish some goal. There are a variety of reasons to reach out to external services. Some common situations are payment processing, service integrations with other products, webhooks, and so on.

There are a few methods provided by the http module that facilitate making HTTP requests to external services. One of these methods is the request() method. The request() method takes two arguments; it takes a configuration object containing details about the request as well as a callback to handle the response.

```js
const options = {
  hostname: "example.com",
  port: 8080,
  path: "/projects",
  method: "GET",
  headers: { "Content-Type": "application/json" },
};

const request = http.request(options, (res) => {
  // Handle response here
});
```

For convenience, the http module provides a convenient method for making GET requests in the form of the get() method. This method differs from the request() method in that it automatically sets the method to GET and calls req.end() automatically.

The fact that servers can make HTTP requests to other services opens up possibilities for different architecture designs for back-ends. One example of an architecture made possible by this ability is microservice architectures. Microservice architectures divide needs into separate lightweight services that communicate via HTTP over a network. As such, a single application can be comprised of dozens of microservices, which could all be written in different programming languages, but work together by communicating over HTTP.

---

## The Node REPL
REPL is an abbreviation for read–eval–print loop. It’s a program that loops, or repeatedly cycles, through three different states: a read state where the program reads input from a user, the eval state where the program evaluates the user’s input, and the print state where the program prints out its evaluation to a console. Then it loops through these states again. The Node REPL will evaluate your input line by line. Access the REPL by typing the command node (with nothing after it) into the terminal and hitting enter. A > character will show up in the terminal, indicating the REPL is running and prompting your input. 

By default, you indicate the input is ready for eval when you hit enter. If you’d like to type multiple lines and then have them evaluated at once, you can type .editor while in the REPL. Once in “editor” mode, you can type control + d when you’re ready for the input to be evaluated. Each session of the REPL has a single shared memory; you can access any variables or functions you define until you exit the REPL.

A REPL can be extremely useful for performing calculations, learning a language, and developing code. It’s a place where you can explore language features and try things out while receiving immediate feedback. Figuring out how to do this outside of the browser or a website can be really empowering.

The global object has a lot of useful properties and methods, If you’re familiar with running JavaScript on the browser, you’ve likely encountered the Window object. Here’s one major way that Node differs: try to access the Window object (this will throw an error). The Window object is the JavaScript object in the browser that holds the DOM, since we don’t have a DOM here, there’s no Window object.

### What are CJS, AMD, UMD, and ESM in Javascript?
Common JS- imports modules Synchronously, made for backend, gives you a copy of the imported object, doesn’t work in browsers cause it has to be bundled & transpired —> const module = require(./module); <—
Asynchronous Modules Definition- imports modules asynchronously, made for front-end exact opposite of CJS
Universal Modules Definition- works for both front & back end, 
EcMa-Script Modules- standardized asynchronous import module, works with modern browsers runtime environment, best module format thanks to its simple syntax, async nature, and tree-shakeability.—> import module from ‘module’ <—can be used in HTML script tags with the defer keyword however pls specify type=module as an attribute.

---

## Node Package Manager (npm)
npm install <pkg>
npm is an online collection, or registry, of software. Developers can share code they’ve written to the registry or download code provided by other developers to use in Node.js projects.
In addition to core Node.js modules, third-party modules(referred to as dependencies) often solve common problems and simplify the development process. Using dependencies is an essential aspect of efficiently creating applications—we don’t have to reinvent the wheel each time we want to include new functionality.
npm is the default package manager for Node.js and its command-line tool is included in the Node.js installation process. This tool enables developers to interact with the registry via the terminal.

## Node.js Modules
Node.js has three main types of modules to work with:
1. Built-in modules
2. Local modules / personally customized modules
3. External modules (installed via npm)


### Create a package.json File
Part of learning Node.js is creating a package.json file using npm init. Creating a package.json file is typically the first step in a Node project, and you need one to install dependencies in npm. If you're starting a project from scratch, you create a package.json file to hold important metadata about your project and record your dependencies. When you run npm init to generate a package.json, you can accept the suggested defaults, or fill out your own information.
After you've created a package.json, you are free to install dependencies for your project using `npm install <package>`.

Instead of running `npm init` and then repeatedly hitting the enter key to accept defaults, you can also generate a `package.json` without being asked for input. Run `npm init -y` to generate a package and automatically accept all the defaults.

The goal of `package-lock.json` is to keep track of the exact version of every package that is installed so that a product is 100% reproducible in the same way even if packages are updated by their maintainers.

### nodemon
A popular npm package is `nodemon`. `nodemon` is a tool used to automatically restart a program when a file changes, alleviating the need for the `node app.js` command each time you save a file.

- Install: `npm i nodemon`
- Install globally: `npm install -g <package name>`

### Formidable
This is a module for working with client (browser)-side file uploads to the server, called "Formidable".

- Install: `npm install formidable`
- Use:

```js
const formidable = require('formidable');
```

  ## Express.js
  Express is a module for simplifying the Node `http` core module to implement APIs.

  - Install: `npm install express`
  - Guide: https://expressjs.com/en/guide/routing.html
  - Cheatsheet: https://github.com/azat-co/cheatsheets/blob/master/express4/readme.md

  ```js
  const express = require('express');
  const app = express();
  const port = 3000;

  app.get('/', (req, res) => {
    res.send('Hello World!');
  });

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
  ```
The first two lines require() (import) the express module and create an Express application. This object, which is traditionally named app, has methods for routing HTTP requests, configuring middleware, rendering HTML views, registering a template engine, and modifying application settings that control how the application behaves (e.g. the environment mode, whether route definitions are case sensitive, etc.)

The middle part of the code (the three lines starting with app.get) shows a route definition. The app.get() method specifies a callback function that will be invoked whenever there is an HTTP GET request with a path ('/') relative to the site root. The callback function takes a request and a response object as arguments, and calls send() on the response to return the string "Hello World!"

The final block starts up the server on a specified port ('3000') and prints a log comment to the console. With the server running, you could go to localhost:3000 in your browser to see the example response returned.

Basic routing with Express
Routing refers to how an application’s endpoints (URIs) responds to a client request and a specific HTTP request method (GET, POST, and so on). You define routing using methods of the Express object that correspond to HTTP methods; for example, .get() to handle GET requests and app.post to handle POST requests.
Note: The endpoint is the URL where your service can be accessed by a client application(browser).
Each route can have one or more handler functions, which are executed when the route is matched.
These routing methods specify a callback function (sometimes called “handler functions”) called when the application receives a request to the specified route (endpoint) and HTTP method. In other words, the application “listens” for requests that match the specified route(s) and method(s), and when it detects a match, it calls the specified callback function.

In fact, the routing methods can have more than one callback function as arguments. With multiple callback functions, it is important to provide next middleware as an argument to the callback function and then call next() within the body of the function to hand off control to the next callback.

Route definition takes the following structure:

```js
const express = require('express');
const app = express(); // app is an instance of express object

app.METHOD(PATH, HANDLER(req, res, next /* optional */));
```
METHOD is derived from HTTP request method, in lowercase, attached to an instance of express Object
PATH is a route path on the server.(‘/‘) defined using route params.
HANDLER is the middleware function executed when the route is matched with arguments res & req object
Next behaves like middleware function to handle a request

METHOD: The Express application object also provides methods to define route handlers for all the other HTTP verbs, which are mostly used in exactly the same way:
checkout(), copy(), delete(), get(), head(), lock(), merge(), mkactivity(), mkcol(), move(), m-search(), notify(), options(), patch(), post(), purge(), put(), report(), search(), subscribe(), trace(), unlock(), unsubscribe().


### Response Object methods
https://expressjs.com/en/4x/api.html#res
The methods on the response object (res) can send a response to the client, and terminate the request-response cycle. If none of these methods are called from a route handler, the client request will be left hanging. 
Creates an Express application. This object, which is traditionally named app, is an instance that conventionally denotes the Express application. The express() function is a top-level function exported by the express module.

```js
const express = require('express');
const app = express();
```
The app object has methods for—>Routing HTTP requests, Configuring middleware, Rendering HTML views, Registering a template engine
It also has settings (properties) that affect how the application behaves. The Express application object can be referred from the request object and the response object as req.app, and res.app.

| Method | Description |
|---|---|
| `res.download()` | Prompt a file to be downloaded. |
| `res.end()` | End the response process. |
| `res.json()` | Send a JSON response. |
| `res.jsonp()` | Send a JSON response with JSONP support. |
| `res.redirect()` | Redirect a request. |
| `res.render()` | Render a view template via template engine (e.g., Pug, Mustache, EJS). |
| `res.send()` | Send a response of various types. |
| `res.sendFile()` | Send a file as an octet stream. |
| `res.sendStatus()` | Set the response status code (1XX-5XX) and send its string representation as the response body. |

### Request Object methods
https://expressjs.com/en/4x/api.html#req

### Route paths
Route paths, in combination with a request method, define the endpoints at which requests can be made. Route paths can be strings, string patterns, or regular expressions.
The characters ?, +, *, () are subsets of their regular expression counterparts. The hyphen (-) and the dot (.) are interpreted literally by string-based paths.
If you need to use the dollar character ($) in a path string, enclose it escaped within ([ and ]). For example, the path string for requests at “/data/$book”, would be “/data/([\$])book”.
Route/Query parameters: are named URL segments that are used to capture the values specified at their position in the URL. The captured values are populated in the req.params object, with the name of the route parameter specified in the path as their respective keys. Name must be made up of “word characters” ([A-Za-z0-9_]), To have more control over the exact string that can be matched by a route parameter, you can append a regular expression in parentheses (()):

To define routes with route parameters, simply specify the route parameters in the path of the route as shown below.
app.get('/users/:userId/books/:bookId', function (req, res) {
  res.send(req.params)
}) 
Route path: /users/:userId/books/:bookId
Request URL: http://localhost:3000/users/34/books/8989
req.params: { "userId": "34", "bookId": "8989" }
—>if a client request a route path using the GET http method, the server responds(res.send) with the captured values corresponding to the (req.params) object.

### Route handlers & Middleware functions  *req ==> middleware ==> res*
MiddleWare Functions: are simply any function that occurs between the time the server receives a request & the time a server sends a response, they have access to the request object (req), the response object (res), and the next function in the application’s request-response life-cycle. The next() function is a function in the Express router which, when invoked, executes the middleware succeeding the current middleware, commonly denoted by a variable named next. Route handlers/ middleware Functions can be in the form of a single/multiple callback function, an array of functions, or combinations of both. Middleware can also be declared/configured in an array for reusability.

Middleware functions can perform the following tasks:
- Execute any code.
- Make changes to the request and the response objects.
- End the request-response cycle.
- Call the next middleware in the stack.
- If the current middleware function does not end the request-response cycle, it must call next() to pass control to the next middleware function. Otherwise, the request will be left hanging.

Whereas route functions end the HTTP request-response cycle by returning some response to the HTTP client, middleware functions typically perform some operation on the request or response and then call the next function in the "stack", which might be more middleware or a route handler. The order in which middleware is called is up to the app developer. You can provide multiple callback functions that behave like middleware to handle a request. The only exception is that these callbacks might invoke next('route') to bypass the remaining route callbacks. You can use this mechanism to impose pre-conditions on a route, then pass control to subsequent routes if there’s no reason to proceed with the current route.

What is this next()—>The next() function could be named anything, but by convention it is always named “next”. To avoid confusion, always use this convention.
Is basically a function that will the receive the Request and Response objects, just like your route Handlers do. As a third argument you have another function which you should call once your middleware function code completed. This means you can wait for asynchronous database or network operations to finish before proceeding to the next step. 

Types of express middleware levels
- 1. Application level middleware https://expressjs.com/en/4x/api.html#app
Bind application-level middleware to an instance of the app object by using the app.use() and app.METHOD() functions, where METHOD is the HTTP method of the request that the middleware function handles (such as GET, PUT, or POST) in lowercase.

- 2. Router level middleware router.use
Router-level middleware works in the same way as application-level middleware, except it is bound to an instance of express.Router(). Load router-level middleware by using the router.use() and router.get/post/…etc() functions. 

```js
const router = express.Router(); // created an instance of express.Router object
```

- 3. Error handling middleware  https://expressjs.com/en/guide/error-handling.html
Error Handling refers to how Express catches and processes errors that occur both synchronously and asynchronously. Express comes with a default error handler so you don’t need to write your own to get started. However It’s important to ensure that Express catches all errors that occur while running route handlers & middleware.
Note: Errors that occur in synchronous code inside route handlers-middleware require no extra work. If synchronous code throws an error, then Express will catch and process it. 

```js
app.get('/', (req, res) => {
  throw new Error('BROKEN'); // Express will catch this on its own.
});
```
Note: For errors returned from asynchronous code invoked by route handlers-middleware, you must pass them to the next() function, where Express will catch and process them

```js
app.get('/', function (req, res, next) {
  fs.readFile('/file-does-not-exist', function (err, data) {
    if (err) {
      next(err); // Pass errors to Express.
    } else {
      res.send(data);
    }
  });
});
```

Default Error Handlers
Errors are handled by one or more special middleware functions that have four arguments, instead of the usual three: (err, req, res, next).. You must provide four arguments to identify it as an error-handling middleware function. Even if you don’t need to use the next object, you must specify it to maintain the signature for both asynchronous & synchronous handlers. Otherwise, the next object will be interpreted as regular middleware instead of an error handler middleware and will fail to handle errors. 

Express comes with a built-in error handler, which takes care of any remaining errors that might be encountered in the app. This default error-handling middleware function is added at the end of the middleware function stack. If you pass an error to next() and you do not handle it in an error handler, it will be handled by the built-in error handler; the error will be written to the client with the stack trace.

Notice that when not calling “next” in an error-handling function, you are responsible for writing (and ending) the response. Otherwise those requests will “hang” and will not be eligible for garbage collection.

- 4. Thirdparty middleware https://expressjs.com/en/resources/middleware.html
Most apps will use third-party middleware in order to simplify common web development tasks like working with cookies, sessions, user authentication, accessing request POST and JSON data, logging, etc. Use third-party middleware to add functionality to Express apps.  Middleware and routing functions are called in the order that they are declared. For some middleware the order is important (for example if session middleware depends on cookie middleware, then the cookie handler must be added first). It is almost always the case that middleware is called before setting routes, or your route handlers will not have access to functionality added by your middleware.
1st Install the Node.js module for the required functionality, then load it in your app at the application level or at the router level. Types Include Morgan,

- 5. Built-in middleware
Express has the following built-in middleware functions:
express.static() serves static files, including your images, CSS and JavaScript (static() is the only middleware function that is actually part of Express). For example, you would use the line below to serve images, CSS files, and JavaScript files from a directory named 'public' at the same level as where you call node:

```js
app.use(express.static('public'));
```

express.json() parses incoming requests with JSON payloads. NOTE: Available with Express 4.16.0+
express.urlencoded() parses incoming requests with URL-encoded payloads. NOTE: Available with Express 4.16.0+
->express.raw()
->express.Router()
->express.text()


Using template engines with Express
A template engine enables you to use static template files in your application. At runtime, the template engine replaces variables in a template file with actual values, and transforms the template into an HTML file sent to the client. This approach makes it easier to design an HTML page.
Some popular template engines that work with Express are Pug, Mustache, and EJS. The Express application generator uses Jade as its default, but it also supports several others.

## BIG PICTURE of a Backend

In a modern backend:

* **Routes** = “Entry gates”
* **Handlers/Controllers** = “Middle managers”
* **Utils / Services** = “Workers doing the actual job (API calls, DB tasks, crypto signing, business rules)”

This triangle keeps your code clean, predictable, and scalable.

---

## 1️⃣ ROUTES — *“Entry Points / API Endpoints”*

### **Your description: almost correct**

But I’ll refine it.

### ✔ What Routes REALLY do

Routes **do NOT do business logic**.
Routes **only decide which controller to run**.

They define:

* The URL (`/buydata`)
* The HTTP method (`POST`)
* The middleware to run (`authMiddleware`)
* The controller function to execute

### ✔ Example

```js
router.post('/buydata', authMiddleware, buyData);
```

This line means:

1. A POST request hits `/buydata`
2. Backend checks if user is authenticated
3. If OK → execute `buyData` controller
4. If NOT OK → reject the request

### ❌ Routes should NOT contain:

* axios calls
* API business logic
* heavy processing

Those belong elsewhere.

---

## 2️⃣ CONTROLLERS / HANDLERS— *“Logic Orchestrators”*

### ✔ Your understanding: **correct and solid**

Controllers receive `(req, res)` because they sit between the **incoming HTTP request** and the backend logic.

### ✔ What Controllers actually do:

1. **Extract user data from the request**
   (`req.body`, `req.params`, `req.query`)
2. **Call the appropriate Utils/Service function**
3. **Handle errors gracefully**
4. **Send a response back to the frontend**

### ✔ Controllers DO:

* Validate simple things (missing fields)
* Call utils/services
* Return JSON responses

### ✔ Controllers DO NOT:

* Make direct API calls
* Write business logic
* Know API keys or provider URLs
* Connect to databases (mostly)

Those belong to **Utils/Services** or **Models**.

### ✔ Using your example:

```js
const response = await vtPass.buyData({
    phone,
    network: `${network}-data`,
    variationCode,
    amount
});
```

Controller → passes sanitized values → utils handles the real business.

---

## 3️⃣ UTILS / SERVICES — *“The Workers”*

### ✔ Your understanding: **correct, with one refinement**

### ✔ What Utils/Services are responsible for:

* Managing **axios clients**
* Connecting to external providers (VTpass, Zendit, Crypto APIs)
* Handling API keys
* Running business logic
* Generating request IDs / signatures
* Transforming provider responses before controllers use them

### ✔ They DO NOT:

* Handle HTTP requests
* Know anything about Express
* Deal with req/res
* Know about users or authentication

They are purely **backend logic modules**, independent of Express.

### ✔ Example

```js
return this.request("POST", "/v1/esim/purchases", payload);
```

This sends a POST request to Zendit and returns provider data to the controller.

### ✔ Why Utils use axios

Because utils talk to **other APIs**, not to your frontend.

---

## 🧩 Putting It Together (Perfect Relationship Model)

```
   ┌─────────────┐        ┌───────────────┐        ┌───────────────┐
   │    			ROUTES    │  -->  │   			CONTROLLER/HANDLERS   -->   │   UTILS/SERVICE│
   └─────────────┘        └───────────────┘        └───────────────┘
         │                        │                        │
   URL + HTTP verb         Extract req.body          External API calls,
   attach middleware       Validate + call utils     business logic, axios
```

### **Frontend → Routes → Controllers → Utils → Provider API → Controller → Frontend**



## REST (Representational State Transfer)
REST, or REpresentational State Transfer, is an architectural style for providing standards between computer systems on the web, making it easier for systems to communicate with each other. REST-compliant systems, often called RESTful systems, are characterized by how they are stateless and separate the concerns of client and server. We will go into what these terms mean and why they are beneficial characteristics for services on the Web.

### Separation of Client and Server
In the REST architectural style, the implementation of the client and the implementation of the server can be done independently without each knowing about the other. This means that the code on the client side can be changed at any time without affecting the operation of the server, and the code on the server side can be changed without affecting the operation of the client.

As long as each side knows what format of messages to send to the other, they can be kept modular and separate. Separating the user interface concerns from the data storage concerns, we improve the flexibility of the interface across platforms and improve scalability by simplifying the server components. Additionally, the separation allows each component the ability to evolve independently.

By using a REST interface, different clients hit the same REST endpoints, perform the same actions, and receive the same responses.

### Statelessness
Systems that follow the REST paradigm are stateless, meaning that the server does not need to know anything about what state the client is in and vice versa. In this way, both the server and the client can understand any message received, even without seeing previous messages. This constraint of statelessness is enforced through the use of resources, rather than commands. Resources are the nouns of the Web - they describe any object, document, or thing that you may need to store or send to other services.

Because REST systems interact through standard operations on resources, they do not rely on the implementation of interfaces. These constraints help RESTful applications achieve reliability, quick performance, and scalability, as components that can be managed, updated, and reused without affecting the system as a whole, even during operation of the system.Now, we’ll explore how the communication between the client and server actually happens when we are implementing a RESTful interface.

### CRUD
“Create, Read, Update, and Delete (CRUD)” are the four basic functions that models should be able to do, at most.
When we are building APIs, we want our models to provide four basic types of functionality. The model must be able to Create(POST), Read(GET), Update(PUT), and Delete(DELETE) resources. Computer scientists often refer to these functions by the acronym CRUD. A model should have the ability to perform at most these four functions in order to be complete. If an action cannot be described by one of these four operations, then it should potentially be a model of its own.
The CRUD paradigm is common in constructing web applications, because it provides a memorable framework for reminding developers of how to construct full, usable models. 

### Communication between Client and Server
In the REST architecture, clients send requests to retrieve or modify resources, and servers send responses to these requests. Let’s take a look at the standard ways to make requests and send responses.

#### Requests
REST requires that a client make a request to the server in order to retrieve or modify data on the server. A request generally consists of:

1. HTTP verb—> defines what kind of operation to perform. In a REST environment, CRUD often corresponds to the HTTP methods `POST`, `GET`, `PUT`, and `DELETE`.
  - `GET` — read/retrieve a specific resource (by id) or a collection of resources. Reading a resource should never change any information.
  - `POST` — creates a new resource of the specified resource type.
  - `PUT` — update a specific resource (by id)
  - `DELETE` — delete a specific resource by id

2. Header—> allows the client to pass along information about the request. Headers and Accept parameters (in the header of the request, the client sends the type of content that it is able to receive from the server. This is called the `Accept` field).

MIME Types (used to specify content types in the `Accept` field) consist of a type and a subtype, separated by a slash (`/`).

- `Accept: type/subtype`
- Text — `text/html`, `text/css`, `text/plain`
- Image — `image/png`, `image/jpeg`, `image/gif`
- Audio — `audio/wav`, `audio/mpeg`
- Video — `video/mp4`, `video/ogg`
- Application — `application/json`, `application/pdf`, `application/xml`, `application/octet-stream`, `application/javascript`

3. Path to a resource—>Requests must contain a path to a resource that the operation should be performed on. In RESTful APIs, paths should be designed to help the client know what is going on. Conventionally, the first part of the path should be the plural form of the resource. This keeps nested paths simple to read and easy to understand.

4. Optional message Body containing data—>


#### Responses
Content Types—>In cases where the server is sending a data payload to the client, the server must include a content-type in the header of the response. This content-type header field alerts the client to the type of data it is sending in the response body. These content types are MIME Types, just as they are in the accept field of the request header. The content-type that the server sends back in the response should be one of the options that the client specified in the accept field of the request.

Response Codes—>Responses from the server contain status codes to alert the client to information about the success of the operation. As a developer, you do not need to know every status code, but you should know the most common ones and how they are used:

| Code | Meaning | Notes |
|---:|---|---|
| 200 | OK | Standard response for successful HTTP requests. |
| 201 | CREATED | Standard response when an item is successfully created. |
| 204 | NO CONTENT | Success with no response body. |
| 400 | BAD REQUEST | Bad request syntax, excessive size, or another client error. |
| 403 | FORBIDDEN | Client does not have permission to access this resource. |
| 404 | NOT FOUND | Resource could not be found (may not exist or may have been deleted). |
| 500 | INTERNAL SERVER ERROR | Generic answer for an unexpected failure if there is no more specific information available. |
For each HTTP verb, there are expected status codes a server should return upon success:
GET — return 200 (OK)
POST — return 201 (CREATED)
PUT — return 200 (OK), Optionally, the response could use a Status Code of 204 (NO CONTENT) and not include a response body
DELETE — return 204 (NO CONTENT),… If the operation fails, return the most specific status code possible corresponding to the problem that was encountered. Calling DELETE on a resource that does not exist should not change the state of the system. The call should return a 404 response code (NOT FOUND) and do nothing.


## Regex (RegExp)
A RegEx (regular expression) is a sequence of characters that forms a search pattern.
RegEx can be used to check if a string contains the specified search pattern.

Cheatsheet: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Cheatsheet

Flags change the output of the expression. That's why flags are also called Modifiers. Flags determine whether the typed expression treats text as separate lines, is case sensitive, or finds all matches. 

Global Flag  /g >> The global flag causes the expression to select all matches. If not used it will only select the first match. 
Multiline Flag  /m >> Regex sees all text as one line. But we use the multiline flag to handle each line separately. In this way, the expressions we write to identify patterns at the end of lines work separately for each line. Now enable the multiline flag to find all matches.
Case-insensitive Flag /i >>In order to remove the case-sensitivity of the expression we have written, we must activate the case-insensitive flag.

To express a certain number of occurrences of a character, at the end we write curly braces {n} along with how many times we want it to occur.

Pipe Character |
It allows to specify that an expression can be in different expressions. Thus, all possible statements are written separated by the pipe sign |. This differs from charset [abc], charsets operate at the character level. Alternatives are at the expression level

Escape Character \
There are special characters that we use when writing regex such as { } [ ] / \ + * . $^ | ? Before we can select these characters themselves, we need to use an escape character \ . For example, to select the dot . and asterisk * characters in the text, let's add an escape character \ before it.

Parentheses ( ): Grouping
We can group an expression and use these groups to reference or enforce some rules. To group an expression, we enclose () in parentheses


x(?=y) Positive Lookahead x(?=y) 	
Lookahead assertion: Matches "x" only if "x" is followed by "y". For example, /Jack(?=Sprat)/ matches "Jack" only if it is followed by "Sprat".
/Jack(?=Sprat|Frost)/ matches "Jack" only if it is followed by "Sprat" or "Frost". However, neither "Sprat" nor "Frost" is part of the match results.

x(?!y) Negative Lookahead x(?!y) 	
Negative lookahead assertion: Matches "x" only if "x" is not followed by "y". For example, /\d+(?!\.)/ matches a number only if it is not followed by a decimal point. /\d+(?!\.)/.exec('3.141') matches "141" but not "3".

(?<=y)x Positive Lookbehind (?<=y)x 	
Lookbehind assertion: Matches "x" only if "x" is preceded by "y". For example, /(?<=Jack)Sprat/ matches "Sprat" only if it is preceded by "Jack". /(?<=Jack|Tom)Sprat/ matches "Sprat" only if it is preceded by "Jack" or "Tom". However, neither "Jack" nor "Tom" is part of the match results.

(?<!y)x Negative Lookbehind (?<!y)x 	
Negative lookbehind assertion: Matches "x" only if "x" is not preceded by "y". For example, /(?<!-)\d+/ matches a number only if it is not preceded by a minus sign. /(?<!-)\d+/.exec('3') matches "3". /(?<!-)\d+/.exec('-3') match is not found because the number is preceded by the minus sign. 

| Characters / constructs | Corresponding article |
|---|---|
| `\, ., \cX, \d, \D, \f, \n, \r, \s, \S, \t, \v, \w, \W, \0, \xhh, \uhhhh, \uhhhhh, [\b]` | Character classes |
| `^, $, x(?=y), x(?!y), (?<=y)x, (?<!y)x, \b, \B` | Assertions |
| `(x), (?:x), (?<Name>x), x\|y, [xyz], [a-z],[^xyz], \Number` | Groups and ranges |
| `*, +, ?, x{n}, x{n,}, x{n,m}` | Quantifiers |
| `\p{UnicodeProperty}, \P{UnicodeProperty}` | Unicode property escapes |

| Construct | Description |
|---|---|
| `\xhh` | Matches the character with the code hh (two hexadecimal digits). |
| `\uhhhh` | Matches a UTF-16 code-unit with the value hhhh (four hexadecimal digits). |
| `\u{hhhh} or \u{hhhhh}` | (Only when the u flag is set.) Matches the character with the Unicode value U+hhhh or U+hhhhh (hexadecimal digits). |
| `\p{UnicodeProperty}, \P{UnicodeProperty}` | Matches a character based on its Unicode character properties (to match just, for example, emoji characters, or Japanese katakana characters, or Chinese/Japanese Han/Kanji characters, etc.). |

Metacharacters
Metacharacters are characters with a special meaning:

| Character | Description | Example |
|---|---|---|
| `[]` | A set of characters | `"[a-m]"` |
| `\` | Signals a special sequence (can also be used to escape special characters) | `"\\d"` |
| `.` | Every possible character (except newline character) | `"he..o"` |
| `^` | Start of The String<br>Caret Sign ^:<br>Selecting by Line Start | `"^hello"` |
| `$` | End of The String<br>Dollar Sign $:<br>Selecting by End of Line | `"world$"` |
| `*` | asterisk * after a character indicates that the character may either not match at all or can match many times. i.e it may have zero or more occurrence | `"aix*"` |
| `+` | plus sign + after a character indicates that the character may either match once or can match many times. i.e it may have one or more occurrence | `"aix+"` |
| `?` | Question Mark ? After a character indicates that a character is optional(i.e it may or may not occur), we put a ? question mark after a character. |  |
| `{n}` | Exactly the specified number of occurrences | `"al{2}"` |
| `|` | Either or | `"falls|stays"` |
| `()` | Capture and group |  |

Special Sequences
A special sequence is a \ followed by one of the characters in the list below, and has a special meaning:

| Character | Description |
|---|---|
| `\A` | Returns a match if the specified characters are at the beginning of the string |
| `\b` | Matches a word boundary. This is the position where a word character is not followed or preceded by another word-character, such as between a letter and a space. Note that a matched word boundary is not included in the match. In other words, the length of a matched word boundary is zero. /\bm/ matches the "m" in "moon".<br>/oo\b/ does not match the "oo" in "moon", because "oo" is followed by "n" which is a word character. |
| `\B` | Matches a non-word boundary. This is a position where the previous and next character are of the same type: Either both must be words, or both must be non-words, for example between two letters or between two spaces. The beginning and end of a string are considered non-words. Same as the matched word boundary, the matched non-word boundary is also not included in the match. For example, /\Bon/ matches "on" in "at noon", and /ye\B/ matches "ye" in "possibly yesterday". |
| Numeric Character \d | Returns a match where the string contains digits (numbers from 0-9) |
| Non-Numeric Character \D | Returns a match where the string DOES NOT contain digits |
| Whitespace Characters \s | Matches a single white space character, including space, tab, form feed, line feed, and other Unicode spaces. |
| Non-whitespace Characters \S | Returns a match where the string DOES NOT contain a white space character, including space, tab, form feed, line feed, and other Unicode spaces. \S is used to find non-whitespace characters. |
| Alphanumeric Word Character \w | Returns a match where the string contains any word characters (characters from a to Z, digits from 0-9, and the underscore _ character) |
| Non-alphanumeric Except Word Character \W | The expression \W is used to find characters other than letters, numbers, and underscores. |
| `\Z` | Returns a match if the specified characters are at the end of the string |
| `\t` | Matches a horizontal tab. |
| `\r` | Matches a carriage return. |
| `\n` | Matches a linefeed. |
| `\v` | Matches a vertical tab. |
| `\f` | Matches a form-feed. |

Sets, Groups & Ranges
A set is a set of characters inside a pair of square brackets [] with a special meaning:
| Set | Description |
|---|---|
| `[arn]` | Returns a match where one of the specified characters (a, r, or n) are present |
| `[a-n]` | Returns a match for any lowercase character between a and n |
| `[^arn]` | Returns a match for any character EXCEPT a, r, and n |
| `[0123]` | Returns a match where any of the specified digits (0, 1, 2, or 3) are present |
| `[0-9]` | Returns a match for any digit between 0 and 9 |
| `[0-5][0-9]` | Returns a match for any two-digit numbers from 00 to 59 |
| `[a-zA-Z]` | Returns a match for any character between a and z, lowercase OR uppercase |
| `[+]` | In sets, `+`, `*`, `.`, `|`, `()`, `$`, `{}` has no special meaning, so `[+]` matches a literal `+` |

```js
let fruits = ["Apple", "Watermelon", "Orange", "Avocado", "Strawberry"];

// Selecting fruits that do not start by 'A' with a /^[^A]/ regex.
// In this example, two meanings of '^' control symbol are represented:
// 1) Matching beginning of the input
// 2) A negated or complemented character class: [^A]
// That is, it matches anything that is not enclosed in the brackets.

let fruitsStartsWithNotA = fruits.filter((fruit) => /^[^A]/.test(fruit));

console.log(fruitsStartsWithNotA); // [ 'Watermelon', 'Orange', 'Strawberry' ]
```



## jQuery (JS Libraries)
### What is jQuery?
jQuery is a lightweight, "write less, do more", JavaScript library.
The jQuery reference contains a list of all jQuery selectors, methods, properties and events, along with examples.
(https://www.w3schools.com/jquery/jquery_ref_overview.asp) Cheatsheets (https://overapi.com/jquery)

The purpose of jQuery is to make it much easier to use JavaScript on your website.
jQuery takes a lot of common tasks that require many lines of JavaScript code to accomplish, and wraps them into methods that you can call with a single line of code.
jQuery also simplifies a lot of the complicated things from JavaScript, like AJAX calls and DOM manipulation.

Let’s use Legos as an analogy for understanding how jQuery works. With an infinite number of Legos, you could build an entire city — of course, this would take a long time. What if you were given pre-made Lego buildings, Lego roads, Lego parks, etc? You could build a city much faster.

The jQuery library contains the following features:

- HTML/DOM manipulation
- CSS manipulation
- HTML event methods
- Effects and animations
- AJAX
- Utilities
Note: The downloaded jQuery library is a single JavaScript file, and you reference it with the HTML `<script>` tag (notice that the `<script>` tag should be inside the `<head>` section):

```html
<head>
  <script src="jquery-3.6.0.min.js"></script>
</head>
```
Tip: Place the downloaded file in the same directory as the pages where you wish to use it.

### jQuery CDN
If you don't want to download and host jQuery yourself, you can include it from a CDN (Content Delivery Network).

Google is an example of someone who host jQuery
Ref(https://developers.google.com/speed/libraries)
```html
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
```

Or https://code.jquery.com/ itself.
```html
<script
  src="https://code.jquery.com/jquery-3.6.0.min.js"
  integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4="
  crossorigin="anonymous"
></script>
```

The integrity and crossorigin properties in the example ensure the file is delivered without any third-party manipulation.
If your website contains a lot of pages, and you want your jQuery functions to be easy to maintain, you can put your jQuery functions in a separate .js file.
However, sometimes it is preferable to place them in a separate file, like this (use the src attribute to refer to the .js file)
```html
<script src="my_jquery_functions.js"></script>
```

The jQuery syntax is tailor-made for selecting HTML elements and performing some action on the element(s). It has become common practice to link the main JavaScript file at the bottom of the HTML document because a good deal of the content of the script will require that the dependencies, style sheets and elements exist before the browser can run the JavaScript that uses and references those things It is good practice to wait for the document(DOM) to be fully loaded and ready before working with it. This also allows you to have your JavaScript code in between <script> tags before the body of your document, in the head section. However This method allows us to execute our functions when the document is fully loaded and can be included before the body.

```js
$(document).ready(function () {
  // jQuery methods go here...
});
```
Note: The method above can be used in between<script> tags in HTML file, or separate main.js file.

### jQuery Syntax
Basic syntax is: `$(selector).action()` which is similar to `document.querySelector("...")`.

#### `$` sign to define/access jQuery
- `$("*")` selects all elements
- `$(this)` selects the current HTML element (`this` keyword)

Note: A (selector) to "query (or find)" HTML elements. jQuery uses CSS syntax to select elements(their name, id, classes, types, attributes, values of attributes and much more.) Check the reference link below.
Ref(https://www.w3schools.com/jquery/jquery_ref_selectors.asp)

### noConflict()
jQuery uses the `$` sign as a shortcut for `jQuery`. However if other frameworks/libraries use the same shortcut, one might stop working. This can be bypassed using the `noConflict()` method which releases the hold on the `$` shortcut.

```js
var jq = $.noConflict();
```

This should be written before the `$(document).ready(function(){ });`.
If you have a block of jQuery code which uses the $ shortcut and you do not want to change it all, you can pass the $ sign in as a parameter to the ready method. This allows you to access jQuery using $, inside this function - outside of it, you will have to use "jQuery":

```js
jQuery(document).ready(function ($) {
  // $ is safe to use in here
});
```


### Events
jQuery Effects are a group of methods in the jQuery library that are responsible for adding dynamic behavior to websites. 
jQuery events act as higher-order functions taking functions as arguments.
```js
$("selector").on("event", function () {
  // action/execution/effects to perform (effects, DOM manipulation)
});
```
OR
```js
$("selector").event(function () {
  // action/execution/effects to perform (effects, DOM manipulation)
});
```
// if the event hasn’t been specified in the HTML.
Ref(https://www.w3schools.com/jquery/jquery_ref_events.asp)
Mouse Events	Keyboard Events	Form Events	Document/Window Events
click	keypress	submit	load
dblclick	keydown	change	resize
mouseenter	keyup	focus	scroll
mouseleave	 	blur	unload

### Effects
Hide, Show, Toggle, Slide, Fade, and Animate
Ref(https://www.w3schools.com/jquery/jquery_ref_effects.asp)

```js
$(selector).effects(speed, callback);
```

The optional `speed` parameter specifies the speed of the hiding/showing, and can take the following values: "slow", "fast" (with quotes), or milliseconds (no quotes). The optional `callback` parameter is a function to be executed after the effect method completes. Some effects have an optional parameter of `opacity` from `0` to `1`.

Note: The jQuery animate()  method however requires Single CSS or multiple CSS properties to be animated as a parameter. {params}

```js
$(selector).animate({ params }, speed, callback);
```
Note: By default, all HTML elements have a static position, and cannot be moved. To manipulate the position, remember to first set the CSS position property of the element to: “relative”, “fixed”, or “absolute”! All property names must be camel-cased when used with the animate() method just like in Vanilla Javascript DOM manipulation……..jQuery comes with queue functionality for animations. This means that if you write multiple animate() calls after each other, jQuery creates an "internal" queue with these method calls. Then it runs the animate calls ONE by ONE.

Note: The jQuery stop() method is used to stop animations or effects before it is finished. It works for all jQuery effect functions, including sliding, fading and custom animations. 

```js
$(selector).stop(stopAll, goToEnd);
```

### Callback Functions
JavaScript statements are executed line by line. However, with effects, the next line of code can be run even though the effect is not finished. This can create errors. To prevent this, you can create a callback function. A callback function is executed after the current effect is 100% finished. A callback function is executed after the current effect is finished.

### Method Chaining
With jQuery, you can chain together actions/methods.
Chaining allows us to run multiple jQuery methods (on the same element) within a single statement. that allows us to run multiple jQuery commands, one after the other, on the same element(s).
Tip: This way, browsers do not have to find the same element(s) more than once. To chain an action, you simply append the action to the previous action.

### DOM Manipulation
Ref(https://www.w3schools.com/jquery/jquery_ref_html.asp)
One very important part of jQuery is the possibility to manipulate the DOM. jQuery comes with a bunch of DOM related methods that make it easy to access and manipulate elements and attributes.
Just Like Vanilla javascript, where we had .innerHTML, .innerTextContent, .value…..
#### jQuery methods for DOM manipulation
`text()` - Sets or returns the text content of selected elements (excluding HTML markup)
`html()` - Sets or returns the content of selected elements (including HTML markup)
`val()` - Sets or returns the value of form fields 
attr() method is used to get attribute values. Also allows you to set multiple attributes at the same time. Put them in { } curly braces.

All of the also come with a callback function.The callback function has two parameters: the index-i of the current element in the list of elements selected and the original (old) value. You then return the string you wish to use as the new value from the function.
#### Add New HTML Content
append() - Inserts content at the end of the selected elements
prepend() - Inserts content at the beginning of the selected elements
after() - Inserts content after the selected elements
before() - Inserts content before the selected elements
Both the append() and prepend() methods can take an infinite number of new elements as parameters

#### Remove Elements/Content
To remove elements and content, there are mainly two jQuery methods:
remove() - Removes the selected element (and its child elements)
empty() - Removes the child elements from the selected element
The jQuery remove() method also accepts one parameter, which allows you to filter the elements to be removed. The parameter can be any of the jQuery selector syntaxes.

#### jQuery Manipulating CSS
jQuery has several methods for CSS manipulation. We will look at the following methods:
addClass() - Adds one or more classes to the selected elements
removeClass() - Removes one or more classes from the selected elements
toggleClass() - Toggles between adding/removing classes from the selected elements
css("propertyname") - returns the value of the specified property css("propertyname","value”) - sets the style attribute & properties for the selected elements to the second parameter -“value” css({"propertyname":"value","propertyname":"value",...}); curly braces.

#### jQuery Dimension Methods
jQuery has several important methods for working with dimensions:
To set dimensions using this methods below, their parameters are the specified values.
The width() method sets or returns the width of an element (excludes padding, border and margin).
The height() method sets or returns the height of an element (excludes padding, border and margin).
The innerWidth() method returns the width of an element (includes padding).
The innerHeight() method returns the height of an element (includes padding).
The outerWidth() method returns the width of an element (includes padding and border).
The outerHeight() method returns the height of an element (includes padding and border).

### What is Traversing?
ref(https://www.w3schools.com/jquery/jquery_ref_traversing.asp)
jQuery traversing, which means "move through", are used to "find" (or select) HTML elements based on their relation to other elements. Start with one selection and move through that selection until you reach the elements you desire. jQuery provides a variety of methods that allow us to traverse the DOM. The largest category of traversal methods are tree-traversal.

### jQuery - AJAX Introduction
Ref(https://www.w3schools.com/jquery/jquery_ref_ajax.asp)
AJAX is the art of exchanging data with a server asynchronously, and updating parts of a web page - without reloading the whole page.
jQuery provides several methods for AJAX functionality.
With the jQuery AJAX methods, you can request text, HTML, XML, or JSON from a remote server using both HTTP Get and HTTP Post - And you can load the external data directly into the selected HTML elements of your web page!
Method	Description
$.ajax()	Performs an async AJAX request
$.ajaxPrefilter()	Handle custom Ajax options or modify existing options before each request is sent and before they are processed by $.ajax()
$.ajaxSetup()	Sets the default values for future AJAX requests
$.ajaxTransport()	Creates an object that handles the actual transmission of Ajax data
$.get()	Loads data from a server using an AJAX HTTP GET request
$.getJSON()	Loads JSON-encoded data from a server using a HTTP GET request
$.parseJSON()	Deprecated in version 3.0, use JSON.parse() instead. Takes a well-formed JSON string and returns the resulting JavaScript value
$.getScript()	Loads (and executes) a JavaScript from a server using an AJAX HTTP GET request
$.param()	Creates a serialized representation of an array or object (can be used as URL query string for AJAX requests)
$.post()	Loads data from a server using an AJAX HTTP POST request
ajaxComplete()	Specifies a function to run when the AJAX request completes
ajaxError()	Specifies a function to run when the AJAX request completes with an error
ajaxSend()	Specifies a function to run before the AJAX request is sent
ajaxStart()	Specifies a function to run when the first AJAX request begins
ajaxStop()	Specifies a function to run when all AJAX requests have completed
ajaxSuccess()	Specifies a function to run when an AJAX request completes successfully
load()	Loads data from a server and puts the returned data into the selected element
serialize()	Encodes a set of form elements as a string for submission
serializeArray()	Encodes a set of form elements as an array of names and values



