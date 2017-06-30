# React Demo

## Start
* index.html
* server.js
* package.json
  * dependencies: express

## Install dev dependencies
* webpack
* babel-core
* babel-loader
* babel-preset-es2015 (transpiles ES6 code)
* babel-preset-react (transpiles JSX)

## Install other dependencies
* react
* react-dom (React on its own doesn't need to know about the DOM - it can be used server-side, kinda like nunjucks)

## Webpack/React boilerplate
* Make webpack.config.js:
```js
module.exports = {
  entry: './browser-entry.js',
  output: {
    path: __dirname,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /jsx?$/,
        exclude: /(node_modules|bower_components)/
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  }
}
```
* `touch ./browser-entry.js`
* run webpack

## Get started with React
* In `browser-entry.js`:
```js
console.log('hello world');

import React from 'react';
import ReactDOM from 'react-dom';

ReactDom.render(
  <div>
    <h1>Hello React</h1>h1>
  <div>,
  document.getElementById('')
)
```
* In `index.html`, add a `div` with id `app`
* Update `npm start` to run webpack and nodemon

## First Component
* `touch MyComponent.js`
```js
import React from 'react';

class MyComponent extends React.Component {
  render () {
    return (
      <div>
        <h1>Hello React</h1>h1>
      </div>
    )
  }
}

export default MyComponent;
```

* in `browser-entry.js`, pass `<MyComponent />` (make sure it's self-closing!) as first arg to `ReactDOM.render`

## Refactor to make more components
* make `Newsfeed.js`
* show that render can only return one DOM node; can't return two sibling DOM nodes
* import Newsfeed component into MyComponent

## Newsfeed component and State
* first, need to define default state in constructor method
* `this.state` is an object that represents minimal amt of data needed to display the newsfeed
* refactor newsfeed to generate `<li>` elements from an object, with a `newsFeedArr` property
  * interpolate javascript into JSX with curly braces
  * map over the array, return JSX from the .map callback function
  * the resulting array of React elements will be rendered
  * "each child in an array or iterator should have a unique 'key' prop" - used internally by React when calculating the virtual DOM

## Props
* looks like an HTML attribute!

## Likes button
* make it a React Component
```js
import React from 'react';

class Likes extends React.Component {

  render () {
    return (
      <div>
        <h3>Likes: 0</div>h3>
      {/* <button class="btn btn-primary">Like</button>*/}
      </div>
    )
  }
}
```
* show differences between JSX and HTML (esp. `class` vs. `className`)

* add state to Likes button
```js
constructor () {
  super();
  this.state = {
    likes: 0
  }
}
```

* add `onClick` callback function, as a method on the Like button class
```
  // bind handleClick in the constructor method

  handleClick () {
    // console.log("I am clicked!");
    // this.state.likes += 1; // this won't work - this.state is changing, but our render function isn't executing again
    this.setState({
      likes: this.state.likes + 1
    }); // this will trigger a re-render
  }
```

## Shared state between components
* make a LikesView component
```js
import React from 'react';

class LikesView extends React.Component {
  render () {
    <div>
      <h3>Likes: {this.state.likes}</h3>
      <button className="btn btn-primary" onClick={this.handleClick}>Like</button>
    </div>
  }
}

export default LikesView;
```

* update Likes component render method to this:
```js
  return <LikesView />
```
* state update in Likes component will trigger rerender of LikesView as well
* pass down "likes" as props to LikesView - like passing down arguments to a function
* you only need to pass props to super in the constructor if you want to access `this.props` in the constructor method

## Component Lifecycle

* update Newsfeed component - instead of having newsfeedArr set in the constructor, set it equal to an array of strings in `componentDidMount`
```js
  componentDidMount() {
    Promise.resolve() // to mimic an ajax request
    .then(() => {
      this.setState({
        newsFeedArr: newsFeedArr
      })
    })
  }
```
* console.log in `constructor` versus `render` versus `componentDidMount`