import React from 'react';
import Message from './Message';

function App() {
  const [counter, setCounter] = React.useState(0);
  return (
    <div>
      <Message />
      <button onClick={() => setCounter(counter + 1)}>Counter ist {counter}</button>
    </div>
  );
}

export default App;
