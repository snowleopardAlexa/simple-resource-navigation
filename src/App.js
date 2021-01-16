import React, { useState, useEffect } from "react";
import './App.css';

// We want to query json format from jsonplaceholder API and display it
// we use useEffect for that
// we call users, posts, comments from API --> https://jsonplaceholder.typicode.com/
// there is not mounting, unmounting, lifecycle methods in the functional component
// so useEffect is our side effect

function App() {

  const [resourceType, setResourceType] = useState('posts')
  const [items, setItems] = useState([])

  console.log('render')

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/${resourceType}`)
    .then(response => response.json())
    .then(json => setItems(json))
  // second parameter - array
  // the hook runs only when you change the resource - posts, users, comments
  // if you click repeatedly on posts, the hook will not re-render because 
  // the code has a second parameter written inside useEffect
  // without resourceType (second parameter) while clicking multiple times on the posts, users, or comments
  // the hook would re-render - you don't have to change resource here to rerender the hook
  }, [resourceType])

  return (
    <div className="App">
       <div>
         <button onClick={() => setResourceType('posts')}>Posts</button>
         <button onClick={() => setResourceType('users')}>Users</button>
         <button onClick={() => setResourceType('comments')}>Comments</button>
       </div>        
       <h1>{resourceType}</h1>
       {items.map(item => {
         // we print the users, posts, comments list on the screen
         return <pre>{JSON.stringify(item)}</pre>
       })}
    </div>
  );
}

export default App;
