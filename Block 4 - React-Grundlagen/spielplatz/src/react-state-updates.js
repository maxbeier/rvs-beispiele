import React from 'react';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default function App() {
  const [a, setA] = React.useState(0);
  const [b, setB] = React.useState(0);

  console.log('re-render', 'a', a, 'b', b);

  async function handleClickWithPromise() {
    console.log('  handleClickWithPromise', 'a', a, 'b', b);
    // wird gebatched
    setA(a + 1);
    setB(b + 1);

    // await sleep(100);
    await Promise.resolve();

    console.log('  handleClickWithPromise resolved', 'a', a, 'b', b);
    // wird nicht gebatched
    setA(a + 10);
    setB(b + 10);
  }

  // wird gebatched
  function handleClickWithoutPromise() {
    console.log('  handleClickWithoutPromise', 'a', a, 'b', b);
    setA(a + 1);
    setB(b + 1);
  }

  return (
    <div className="App">
      <button onClick={handleClickWithPromise}>
        a {a} - b {b} async / with promise
      </button>
      {' - '}
      <button onClick={handleClickWithoutPromise}>
        a {a} - b {b} sync
      </button>
    </div>
  );
}
