import React from 'react';

function useLocalStorageState(key) {
  const [state, setState] = React.useState(
    () => window.localStorage.getItem(key) || '');

  React.useEffect(() => {
    window.localStorage.setItem(key, state);
  }, [state, key]);

  return [state, setState];
}

function useResize() {
  const [width, setWidth] = React.useState(0);

  React.useEffect(() => {
    function updateWidth() {
      setWidth(window.innerWidth);
    }

    window.addEventListener('resize', updateWidth);
    updateWidth();

    function cleanup() {
      window.removeEventListener('resize', updateWidth);
    }
    return cleanup;
  });

  return width;
}

export default function Message() {
  const [message, setMessage] = useLocalStorageState('backup');
  const handleChange = (event) => setMessage(event.target.value);
  const width = useResize();

  if (width < 450)
    return 'Mobilgeräte werden aktuell nicht unterstützt';

  return (
    <div className="container mt-2">
      <p>Der Browser ist {width}px groß.</p>
      <textarea className="form-control" value={message} onChange={handleChange} />
      <button className="btn btn-primary mt-2" onClick={() => setMessage('')}>Reset Message</button>
    </div>
  );
}
