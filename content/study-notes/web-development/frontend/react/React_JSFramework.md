# React JS Framework

## What is React?

React is a JavaScript Framework for building user interfaces. React is used to build single-page applications and allows us to build and create reusable UI components.

Instead of manipulating the browser's DOM directly, React creates a virtual DOM in memory. It performs all necessary manipulations there before applying the final changes to the browser's DOM, thus changing only what needs to be changed.

### The Virtual DOM

The Virtual DOM (VDOM) is an abstraction of the HTML DOM. It is lightweight and detached from the browser-specific implementation details. Since the DOM is already an abstraction, the virtual DOM is an abstraction of an abstraction. Think of the virtual DOM as React’s local and simplified copy of the HTML DOM. It allows React to do its computations within this abstract world.

In React, for every DOM object, there is a corresponding “virtual DOM object.” A virtual DOM object is a representation of a DOM object, like a lightweight copy. A virtual DOM object has the same properties as a real DOM object, but it lacks the real thing’s power to directly change what’s on the screen.

Manipulating the DOM is slow. Manipulating the virtual DOM is much faster because nothing gets drawn onscreen. Think of manipulating the virtual DOM as editing a blueprint, as opposed to moving rooms in an actual house.

When you render a JSX element, every single virtual DOM object gets updated. In summary, here’s what happens when you try to update the DOM in React:

- The entire virtual DOM gets updated.
- The virtual DOM gets compared to what it looked like before you updated it. React figures out which objects have changed.
- The changed objects, and the changed objects only, get updated on the real DOM through the `render()` method.
- Changes on the real DOM cause the screen to change.

> **Tip:** In the DOM model, HTML element tags are objects with properties.

## Why use React?

- Structure the “view” layer of your application
- Reusable components with their own state
- JSX for dynamic markup
- Interactive User-Interface with the Virtual DOM
- Performance & Testing

To use React in production, you need npm and Node.js installed.
[Installation Reference](https://github.com/facebook/create-react-app)

### Create React App

To create a new React application, run the following command:

```bash
npx create-react-app name_of_app
```

Common commands include:
```bash
npm start      # Starts the development server.
npm run build  # Bundles the app into static files for production.
npm test       # Starts the test runner.
npm run eject  # Removes this tool and copies build dependencies, configuration files, and scripts into the app directory. If you do this, you can’t go back!
```

To start the development server:
```bash
cd name_of_app
npm start
```

---

## Core ES6 Features for React

React uses ES6, and you should be familiar with some of the new features like:

### Classes
A class is a type of function, but instead of using the keyword `function` to initiate it, we use the keyword `class`, and the properties are assigned inside a `constructor()` method. To create a class with inheritance, use the `extends` keyword. Import the parent class variables using the `super()` keyword. Parent class methods are inherited automatically.

### Arrow Functions
The handling of the `this` keyword is different in arrow functions compared to regular functions. In short, with arrow functions, there is no binding of `this`. In regular functions, the `this` keyword represents the object that called the function (e.g., the window, the document, a button). With arrow functions, the `this` keyword always represents the object that *defined* the arrow function.

### Variables (let, const, var)
- **Scope**: Block scope `{}` involves a block of code for conditional & loop statements/expressions. Function scope is inside of a function declaration/expression. Global scope is outside of any function.
- `var` has function scope, not block scope.
- `let` has block scope.
- `const` has block scope and its value should not be reassigned.

---


## JSX (JavaScript Syntax Extension)

JSX stands for JavaScript Syntax Extension. It's an extension of the JavaScript language based on ES6 and is translated into regular JavaScript at runtime. JSX makes it easier to write and add HTML in React.

### JSX Elements

A basic unit of JSX is called a JSX Element or `ReactElement`. It is a light, stateless, immutable, virtual representation of a DOM Element that lives in the virtual DOM. Their immutability makes them easy and fast to compare and update. Once defined, `ReactElement`s can be rendered into the “real” DOM.

An example of a JSX element:
```jsx
<h1>Hello world</h1>
```

This JSX element looks exactly like HTML, but you would find it in a JavaScript file. JSX elements are treated as JavaScript expressions. They can be saved in a variable, passed to a function, stored in an object or array, and so on.

JSX Elements are what components are “made of” and are the smallest building blocks of React apps. An element describes what you want to see on the screen. React elements are immutable—once you create an element, you can’t change its state, props, or children. An element is like a single frame in a movie: it represents the UI at a certain point in time.

### Rules of JSX

- **Writing HTML in JS**: JSX allows us to write HTML elements in JavaScript and place them in the DOM. It converts HTML tags into React JSX elements.

- **Embedding JavaScript Expressions**: To add expressions into JSX elements, use curly braces `{ }`. You can put any valid JavaScript expression inside them. The code between the tags will be read as JSX, not regular JavaScript. The curly braces are markers that signal an injection of JavaScript.

- **Accessing Variables**: A JSX expression can access variables declared outside of it.

- **Nesting**: You can nest JSX elements inside other JSX elements, just like in HTML. If a JSX expression takes up more than one line, you must wrap it in parentheses `()`.

- **Outermost Element**: A JSX expression must have exactly one outermost element. This is often a `<div>` tag used as a container.

- **Closing Tags**: JSX elements must be properly closed.
    - *Self-closing tags*: Empty elements must be closed with `/>`. Forgetting the slash will cause an error (e.g., `<br />`).
    - *Non-self-closing tags*: The opening and closing tags must belong to the same element (e.g., `<h1></h1>`).

### JSX Attributes

JSX elements can have attributes, just like HTML elements. A JSX attribute is written using HTML-like syntax: a name, followed by an equals sign, followed by a value wrapped in quotes.

```jsx
const title = <h1 id='title'>Introduction to React.js: Part I</h1>;
```

- **`className`**: The `class` attribute is not allowed in JSX because `class` is a reserved word in JavaScript. Use `className` instead. When JSX is rendered, `className` attributes are automatically converted to `class` attributes in the HTML.

- **Using Variables as Attributes**: It’s common to use variables to set attributes.

    ```jsx
    let sideLength = "200px";
    const panda = (
      <img
        src="images/panda.svg"
        alt="panda"
        height={sideLength}
        width={sideLength} />
    );
    ```

- **Using Object Properties as Attributes**: Object properties are also often used to set attributes.
    ```jsx
    const pics = {
      panda: "http://bit.ly/1Tqltv5",
      owl: "http://bit.ly/1XGtkM3",
      owlCat: "http://bit.ly/1Upbczi"
    };
    const panda = (
      <img
        src={pics.panda}
        alt="Lazy Panda" />
    );
    ```

### JSX Conditionals

You cannot use `if...else` statements directly inside a JSX expression.

```jsx
// This will not work
const order = (
  <h1>
    {
      if (purchase.complete) {
        'Thank you for placing an order!'
      }
    }
  </h1>
);
```

There are several ways to use conditionals to decide which JSX should be rendered.

#### 1. `if` Statements Outside JSX
You can put the `if` statement outside the JSX tags. This way, no JavaScript injection is necessary, and the logic determines which element gets rendered.

```jsx
render() {
  let message;
  if (user.age >= drinkingAge) {
    message = <div>Hey, check out this alcoholic beverage!</div>;
  } else {
    message = <div>Hey, you are not old enough!</div>;
  }
  return message;
}
```

#### 2. Ternary Operator
The ternary operator (`condition ? expressionIfTrue : expressionIfFalse`) works the same way in React as it does in regular JavaScript and is a compact way to write conditionals.

```jsx
render() {
  return (
    <h1>
      { age >= drinkingAge ? 'Buy Drink' : 'Do Teen Stuff' }
    </h1>
  );
}
```
You can also use it to render different elements:
```jsx
render() {
  return age >= drinkingAge ? <h1>Buy drink</h1> : <h1>Do Teen Stuff</h1>;
}
```

#### 3. Short-Circuit Operator (`&&`)
The `&&` operator is useful for conditionals that will either perform an action or do nothing at all. If the expression on the left side of `&&` is true, the JSX on the right side will be rendered. If it is false, the JSX on the right will be ignored.

```jsx
const tasty = (
  <ul>
    <li>Applesauce</li>
    { !baby && <li>Pizza</li> }
    { age > 15 && <li>Brussels Sprouts</li> }
    { age > 20 && <li>Oysters</li> }
    { age > 25 && <li>Grappa</li> }
  </ul>
);
```

### Using `.map()` in JSX
The array method `.map()` is commonly used in React to create lists of JSX elements from an array of data.

```jsx
const strings = ['Home', 'Shop', 'About Me'];
const listItems = strings.map((string, index) => <li key={index}>{string}</li>);

<ul>{listItems}</ul>
```

When using `.map()` to return a list of items, it’s imperative to include a `key` attribute on each list item. A `key` is a special string attribute you need to include when creating lists of elements. Keys help React identify which items have changed, are added, or are removed.

If you don’t have stable IDs for rendered items, you may use the item `index` as a key as a last resort. Using the index is not recommended if the order of items may change, as it can negatively impact performance and cause issues with component state.

### Rendering in React

`ReactDOM.render()` is the original way to render JSX. It takes a JSX expression, creates a corresponding tree of DOM nodes, and adds that tree to a specified DOM element.

The first argument is the JSX to render, and the second argument is the container element in the DOM where it should be rendered.

```jsx
// Renders <h1>Hello world</h1> into the element with id 'root'
ReactDOM.render(<h1>Hello world</h1>, document.getElementById('root'));
```

The first argument can be a variable, as long as it evaluates to a JSX expression. The second argument must select a single DOM element, so methods like `getElementsByTagName()` or `querySelectorAll()` cannot be used, as they return collections.

As of React 18, `ReactDOM.render()` is deprecated and has been replaced by `ReactDOM.createRoot()`.

```jsx
// React 18 and later
ReactDOM.createRoot(document.getElementById('root')).render(<h1>Hello, world!</h1>);
```

#### JSX and `React.createElement()`

While most React programmers use JSX, it's possible to write React code without it. Every JSX element is just syntactic sugar for a call to `React.createElement()`.

The following JSX expression:
```jsx
const h1 = <h1>Hello world</h1>;
```

Can be rewritten without JSX like this:
```javascript
const h1 = React.createElement(
  "h1",           // Type/tag
  null,           // Props/attributes
  "Hello, world"  // Children or content
);
```

When a JSX element is compiled, the compiler transforms it into a `React.createElement()` call. This is why `React` must be in scope in your files if you are using JSX.

- `import React from 'react'`: Imports the `React` object, which contains methods like `React.createElement()` necessary to handle JSX and components in the Virtual DOM.
- `import ReactDOM from 'react-dom'`: The methods imported from `react-dom` are meant for interacting with the real DOM, such as rendering your component tree.

---

## React Components

React applications are made out of components. A component is a small, reusable chunk of code that is responsible for one job, which is often to render some HTML. Components let you split the UI into independent, reusable pieces and think about each piece in isolation.

Components come in two types:
- **Class Components**: Stateful components that use ES6 classes.
- **Function Components**: Stateless or stateful (with Hooks) components that are JavaScript functions.

### Class Components (Stateful)

A class component is an ES6 class that extends `React.Component`.

#### Anatomy of a Class Component

- **Declaration**: `class YourComponentName extends React.Component {}`
  - All class components extend `React.Component` from the React library. This provides them with access to React's lifecycle methods and state management.
  - Component names must always start with a capital letter. This is how JSX distinguishes a component instance from a regular HTML tag.

- **The `render()` Method**:
  - The `render()` method is the only required method in a class component. It is a property whose value is a function that returns a JSX expression.
  - A `render()` method must contain a `return` statement. Multi-line JSX expressions in the return statement must be wrapped in parentheses `()`.
  - Simple calculations or logic needed just before rendering can be placed inside the `render()` function.

- **Component Instance**:
  - To create an instance of a component, you write a JSX tag with the component's name: `<YourComponentName />`.

Here is a basic example of a class component:

```jsx
import React from 'react';
import ReactDOM from 'react-dom';

class YourComponentName extends React.Component {
  // Instructions for how to build the component, manage state, and handle props
  render() {
    return <h1>Hello world</h1>;
  }
}

// Render the component to the DOM
ReactDOM.render(<YourComponentName />, document.getElementById('app'));
```

#### Components Rendering Other Components

A React application can contain dozens or even hundreds of components. A component's `render()` method can return instances of other components. This allows you to build complex UIs by composing simple components together.

In this example, the `ProfilePage` component renders the `NavBar` component.

**`ProfilePage.js`**
```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { NavBar } from './NavBar.js';

class ProfilePage extends React.Component {
  render() {
    return (
      <div>
        <NavBar />
        <h1>All About Me!</h1>
        <p>I like movies and blah blah blah blah blah</p>
      </div>
    );
  }
}

ReactDOM.render(<ProfilePage />, document.getElementById('app'));
```

**`NavBar.js`**
```jsx
import React from 'react';

export class NavBar extends React.Component {
  render() {
    const pages = ['home', 'blog', 'pics', 'bio', 'art', 'shop', 'about', 'contact'];
    const navLinks = pages.map(page => {
      return (
        <a key={page} href={'/' + page}>
          {page}
        </a>
      )
    });

    return <nav>{navLinks}</nav>;
  }
}
```

#### Props in Class Components
A component’s `props` is an object that holds information passed to that component as attributes. The `props` object is how components talk to each other, passing data from a parent to a child. Props are analogous to function arguments and are immutable (read-only).

To access a component’s props object, you use the expression `this.props`.

**Passing and Rendering Props**

You pass props to a component by adding them as attributes to its JSX tag.

```jsx
<Greeting firstName='Jennifer' />
```

The receiving component (`Greeting`) can then access this information via `this.props.firstName`.

```jsx
import React from 'react';
import ReactDOM from 'react-dom';

class Greeting extends React.Component {
  render() {
    return <h1>Hi there, {this.props.firstName}!</h1>;
  }
}

ReactDOM.render(
  <Greeting firstName='Jennifer' />,
  document.getElementById('app')
);
```

- To pass information that isn’t a string, wrap the value in curly braces: `<Greeting myInfo={["top", "secret", "lol"]} />`.
- You can pass several pieces of information: `<Greeting name="Frarthur" town="Flundon" age={2} haunted={false} />`.
- You can also use props to make decisions inside the component, for example, in conditionals.

**`this.props.children`**

The `this.props.children` property returns everything in between a component's opening and closing JSX tags.

```jsx
<MyComponentClass>
  <p>This is a child element.</p>
</MyComponentClass>
```
In this case, `this.props.children` would be the `<p>` element. If a component has more than one child, `this.props.children` will be an array of those children.


**Default Props**

You can define default values for a component's props by assigning an object to the component's `defaultProps` property.

```javascript
// Set defaultProps equal to an object:
MyComponent.defaultProps = {
  text: 'This is the default text.'
};
```

#### Events in Class Components
React has the same events as HTML: `click`, `change`, `mouseover`, etc. In React, you define event handlers as methods on a component class.

- In JSX, event listener names are written in camelCase (e.g., `onClick`, `onMouseOver`).
- React event handlers are passed as functions inside curly braces.

```jsx
// `this` must be bound correctly for `myFunc` to work
<div onHover={this.myFunc}>
```

An event handler is defined as a method on the component class.
```jsx
class MyClass extends React.Component {
  myFunc() {
    alert('Stop it.  Stop hovering.');
  }
  render() {
    // Note: `this` needs to be bound for this to work. See the State section for more on binding.
    return (
      <div onHover={this.myFunc}>
        Hover over me.
      </div>
    );
  }
}
```

You can also pass event handlers down to child components as props. A common naming convention is to name the handler prop `on[Event]` or `handle[Event]` (e.g., `onClick` or `handleClick`).

```jsx
<button onClick={this.handleClick}>Take the Shot!</button>
```
Here, `this.handleClick` is the event handler method defined on the component.


#### State in Class Components
While `props` allow a component to receive information from its parent, `state` allows a component to manage its own internal, dynamic information. State allows React components to change their output over time in response to user actions, network responses, and anything else.

- State is analogous to variables declared within a function body.
- Unlike props, a component’s state is not passed in from the outside. A component decides its own state, and it is private to that component.

**Initializing and Accessing State**

A component's state is an object that determines how it renders and behaves. It should be initialized in the `constructor` method.

- The `constructor()` method is called to declare the state object and initialize its properties.
- `super(props)` must be called in the constructor to access the parent's (i.e., `React.Component`) properties and methods.

```jsx
class MyClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = { feeling: 'great' };
  }
  render() {
    return (
      <h1>
        I'm feeling {this.state.feeling}!
      </h1>
    );
  }
}
```
To read a component’s state, use the expression `this.state.propertyName`.

**Updating State**

A component changes its state by calling `this.setState()`. This function takes an object that will be merged with the component’s current state.

- **Do not modify state directly!** Never write `this.state.key = 'value'`. Always use `this.setState()`.
- **`setState()` is asynchronous.** React may batch multiple `setState()` calls for performance.
- **`setState()` triggers a re-render.** Any time you call `this.setState()`, it automatically calls `render()` as soon as the state has changed. For this reason, you must **never** call `this.setState()` inside the `render()` method, as this will cause an infinite loop.

**Binding `this` in Event Handlers**

When you write a component class method (like an event handler) that updates state, you need to bind that method inside your constructor function so that `this` is correctly scoped.

There are three common ways to bind `this`:

1.  **Bind in Constructor (Recommended)**: Bind the method once in the constructor. This is the most efficient approach.
    ```javascript
    constructor(props) {
      super(props);
      this.myMethod = this.myMethod.bind(this);
    }
    ```

2.  **Bind in Render**: Bind the method directly where it is passed as a prop. This creates a new function on every render, which can affect performance.
    ```jsx
    <button onClick={this.myMethod.bind(this)}>Click Me</button>
    ```

3.  **Use an Arrow Function**: Define the method as an arrow function, which automatically binds `this`. Or, use an arrow function in the render method.
    ```jsx
    // As a class property (experimental syntax)
    myMethod = () => { /* ... */ }

    // In the render method
    <button onClick={() => this.myMethod()}>Click Me</button>
    ```

### Component Lifecycle Methods
React components have several methods, called lifecycle methods, that are called at different parts of a component’s lifecycle. The `render()` method is required, but the others are optional.

#### 1. Mounting
Mounting means putting elements into the DOM. These methods are called in the following order when a component is being created and inserted into the DOM:

- `constructor()`: Use to initialize state and bind methods. It is the first thing called.
- `render()`: Renders the component to the Virtual DOM.
- `componentDidMount()`: The final method called during mounting, invoked immediately after the component is rendered into the real DOM. This is the ideal place to perform "side effects" like making AJAX requests, setting up subscriptions (e.g., `setInterval`), or manually interacting with the DOM.

When a component produces a side effect, you should remember to clean it up in the unmounting phase.

#### 2. Updating
A component is updated whenever there is a change in its state or props. These methods are called when a component is being re-rendered:

- `render()`: Called when a component’s props or state changes.
- `componentDidUpdate()`: Called immediately after updating occurs. This is a good place for update-phase side effects.

#### 3. Unmounting
This phase occurs when a component is being removed from the DOM.

- `componentWillUnmount()`: Called right before the component is destroyed. This is the ideal place to clean up any side effects, such as invalidating timers, canceling network requests, or cleaning up any subscriptions that were created in `componentDidMount()`.

#### Example: `Clock` Component
```jsx
import React from 'react';

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }

  componentDidMount() {
    const oneSecond = 1000;
    this.intervalID = setInterval(() => {
      this.setState({ date: new Date() });
    }, oneSecond);
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  render() {
    return <div>{this.state.date.toLocaleTimeString()}</div>;
  }
}
```

#### 4. Error Handling
These methods are called when there is an error during rendering, in a lifecycle method, or in the constructor of any child component.

- `static getDerivedStateFromError(error)`
- `componentDidCatch(error, info)`

---

While powerful, class components can be complex. They can be difficult to reuse, tricky to test, and have confused many developers, leading to bugs. This complexity was a primary motivation for the introduction of Hooks.


### Function Components (Stateless)
A function component is a JavaScript function that returns JSX. It is a simpler way to write a component that doesn't need its own state or lifecycle methods.

- It is not a class and does not extend `React.Component`.
- It has no `render()` or `constructor()` methods.
- It accepts a single `props` object as an argument and returns a React element.

To access props, give your function a parameter (conventionally named `props`). You can then access properties on it directly (e.g., `props.propertyName`) without using the `this` keyword.

**Arrow Function Syntax**
```jsx
const Welcome = (props) => {
  return <h1>Hello, {props.name}</h1>;
}
```

**Regular Function Syntax**
```jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

## React Hooks
React Hooks are functions that let you “hook into” React state and lifecycle features from function components. Hooks don’t work inside classes—they are designed to let you use React features without writing a class.

There are two main rules for using Hooks:
1.  Only call Hooks at the top level. Do not call Hooks inside of loops, conditions, or nested functions.
2.  Only call Hooks from React function components. Do not call them from regular JavaScript functions.

First, import the desired hook from the `react` library:
```javascript
import React, { useState, useEffect } from 'react';
```

**Basic Hooks**
- `useState()`
- `useEffect()`
- `useContext()`

**Additional Hooks**
- `useReducer()`
- `useCallback()`
- `useMemo()`
- `useRef()`
- `useImperativeHandle()`
- `useLayoutEffect()`
- `useDebugValue()`

### `useState()`
The `useState()` hook is a function that lets you add React state to function components. When called, it returns an array containing two values:
1.  The current state value.
2.  A "setter" function that you can use to update the state value.

You can use array destructuring to assign these values to local variables.
```javascript
const [currentState, setStateSetter] = useState(initialStateValue);
```

Calling the state setter function signals to React that the component needs to re-render. `useState()` allows React to keep track of the current value of state from one render to the next.

When initializing state with collections (arrays or objects), use the spread syntax inside the setter function to copy the previous state before making changes.
```javascript
setArrayState(prev => [ ...prev, newItem ]);
setObjectState(prev => ({ ...prev, property: 'new value' }));
```

### `useEffect()`
The `useEffect()` hook lets you perform "side effects" in function components. These are actions that run after each render, such as:
- Fetching data from a backend service
- Subscribing to a stream of data
- Managing timers and intervals (`setInterval`)
- Reading from or making changes to the DOM

The `useEffect` hook can be utilized at three key moments: on mount, on update/re-render, and on unmount.

The first argument passed to `useEffect()` is a callback function (the "effect") that you want React to call after the component renders. This function can optionally return a "cleanup" function, which React will run before the component unmounts or before re-running the effect.


## Common React Patterns

### Stateful and Stateless Components
A common and powerful pattern in React involves using a "stateful" parent component that manages state and passes it down to "stateless" child components.

- **Stateful Component (Parent)**: Holds the state and the methods to update that state. It passes the state down as props to child components. It also passes the event handler methods down to child components that need to trigger state changes.
- **Stateless Component (Child)**: Receives state as props and displays it. It does not have its own state. If it needs to update the application's state, it calls the event handler function it received from the parent via props.

This pattern centralizes state management, making data flow predictable (unidirectional data flow) and easier to reason about.

- A stateful, parent component passes a prop to a stateless, child component.
- The stateful parent passes an event handler to the stateless child.
- The child component uses that event handler to update its parent’s state.
- The parent may then pass that updated state to a sibling component.

## Advanced React Concepts

### Higher-Order Components (HOCs)
A Higher-Order Component (HOC) is a function that takes a component and returns a new, enhanced component. It's a pattern for reusing component logic.

```jsx
const EnhancedComponent = higherOrderComponent(OriginalComponent);
```

HOCs are often used for cross-cutting concerns that need to be applied to multiple components, such as authentication, authorization, or data fetching. While powerful, they can sometimes make code more complex.

### Render Props
The term “render prop” refers to a technique for sharing code between React components using a prop whose value is a function. A component with a render prop takes a function that returns a React element and calls it instead of implementing its own render logic.

### Error Boundaries
Error boundaries are React components that catch JavaScript errors anywhere in their child component tree, log those errors, and display a fallback UI instead of the component tree that crashed.

A class component becomes an error boundary if it defines either (or both) of the lifecycle methods `static getDerivedStateFromError()` or `componentDidCatch()`.

Error boundaries do **not** catch errors for:
- Event handlers
- Asynchronous code (e.g., `setTimeout` or `requestAnimationFrame` callbacks)
- Server-side rendering
- Errors thrown in the error boundary itself (rather than its children)

### Ref Forwarding
Ref forwarding is a technique for automatically passing a `ref` through a component to one of its children. This is useful for accessing the underlying DOM node of a child component from a parent.

`React.forwardRef` lets a component take a `ref` it receives and "forward" it to a child component.

```jsx
const FancyButton = React.forwardRef((props, ref) => (
  <button ref={ref} className="FancyButton">
    {props.children}
  </button>
));

// You can now get a ref directly to the DOM button:
const ref = React.createRef();
<FancyButton ref={ref}>Click me!</FancyButton>;
```
Here is a step-by-step explanation:
1. We create a React ref by calling `React.createRef` and assign it to a `ref` variable.
2. We pass our `ref` down to `<FancyButton ref={ref}>` by specifying it as a JSX attribute.
3. React passes the `ref` to the `(props, ref) => ...` function inside `forwardRef` as a second argument.
4. We forward this `ref` argument down to `<button ref={ref}>` by specifying it as a JSX attribute.
5. When the ref is attached, `ref.current` will point to the `<button>` DOM node.

The second `ref` argument only exists when you define a component with a `React.forwardRef` call. Regular function or class components don’t receive the `ref` argument, and `ref` is not available in `props`.





