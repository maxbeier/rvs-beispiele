import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import axios from 'axios'; // https://bundlephobia.com/result?p=axios

const STATES = {
  INIT: 'INIT',
  PENDIG: 'PENDIG',
  LOADING: 'LOADING',
  REJECTED: 'REJECTED',
  RESOLVED: 'RESOLVED',
};

const toTitleCase = (txt) =>
  txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();

export default function Pokedex() {
  const [pokeId, setPokeId] = React.useState(null);
  const reset = () => setPokeId(null);

  return (
    <div className="container mt-2" style={{ width: 300 }}>
      <PokeSearch value={pokeId} onChange={setPokeId} />
      <div className="btn-toolbar">
        <span className="btn-sm">e.g.</span>
        <div className="btn-group mb-1">
          <button
            className="btn btn-link btn-sm"
            type="button"
            onClick={() => setPokeId(25)}
          >
            Pikachu
          </button>
          <button
            className="btn btn-link btn-sm"
            type="button"
            onClick={() => setPokeId(39)}
          >
            Jigglypuff
          </button>
          <button
            className="btn btn-link btn-sm"
            type="button"
            onClick={() => setPokeId(150)}
          >
            Mewtwo
          </button>
        </div>
      </div>
      {pokeId && (
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          resetKeys={[pokeId]}
          onReset={reset}
        >
          <PokeData pokeId={pokeId} />
        </ErrorBoundary>
      )}
    </div>
  );
}

function PokeSearch({ value, onChange }) {
  const inputRef = React.useRef();
  const onSubmit = (event) => {
    event.preventDefault();
    onChange(inputRef.current.value);
  };

  React.useEffect(() => {
    inputRef.current.value = value;
  }, [value]);

  return (
    <form onSubmit={onSubmit} className="mb-2">
      <div className="input-group is-invalid">
        <div className="input-group-prepend">
          <span className="input-group-text">Poke-ID</span>
        </div>
        <input ref={inputRef} type="number" className="form-control" />
        <div className="input-group-append">
          <button className="btn btn-secondary" type="submit">
            Suchen
          </button>
        </div>
      </div>
    </form>
  );
}

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div className="alert alert-danger" role="alert">
      <button onClick={resetErrorBoundary} className="close">
        <span aria-hidden="true">&times;</span>
      </button>
      <h4 className="alert-heading">Error</h4>
      <p>{error.message}</p>
      <button
        onClick={resetErrorBoundary}
        type="button"
        className="btn btn-danger"
      >
        Reset
      </button>
    </div>
  );
}

// const randomTimeout = (data) =>
//   new Promise((resolve) => setTimeout(resolve, Math.random() * 5000, data));

// function usePokemon(pokeId) {
//   const [state, setState] = React.useState({ status: STATES.INIT });

//   React.useEffect(() => {
//     if (!pokeId) return;

//     const abortController = new AbortController();
//     const { signal } = abortController;

//     setState({ status: STATES.LOADING });

//     console.log('loading data for', pokeId);

//     fetch(`https://pokeapi.co/api/v2/pokemon/${pokeId}`, { signal })
//       //.then(randomTimeout)
//       .then((response) => {
//         if (signal.aborted) throw null;
//         if (response.ok) return response.json();
//         else throw new Error('404 Pokemon not found');
//       })
//       .then((result) => {
//         if (signal.aborted) throw null;
//         setState({ status: STATES.RESOLVED, pokemon: result });
//       })
//       .catch((error) => {
//         if (signal.aborted) return;
//         setState({ status: STATES.REJECTED, error: error.message });
//       });

//     return () => abortController.abort();
//   }, [pokeId]);

//   return state;
// }

function usePokemon(pokeId) {
  const [state, setState] = React.useState({ status: STATES.INIT });

  React.useEffect(() => {
    if (!pokeId) return;

    setState({ status: STATES.LOADING });

    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokeId}`, {
        cancelToken: source.token,
      })
      .then((result) => {
        setState({ status: STATES.RESOLVED, pokemon: result.data });
      })
      .catch((error) => {
        if (axios.isCancel(error)) return;
        setState({ status: STATES.REJECTED, error: error.message });
      });

    return () => source.cancel('request canceled');
  }, [pokeId]);

  return state;
}

function PokeData({ pokeId }) {
  const { status, error, pokemon } = usePokemon(pokeId);

  if (status === STATES.INIT) return null;

  if (status === STATES.LOADING)
    return (
      <div className="text-center mt-5 mb-5">
        <div className="spinner-grow text-secondary" />
      </div>
    );

  if (status === STATES.REJECTED)
    return (
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    );

  const name = toTitleCase(pokemon.name)
    .replace('-f', ' ♀')
    .replace('-m', ' ♂');
  const image =
    pokemon.sprites.other['official-artwork'].front_default ||
    pokemon.sprites.front_default;

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <img src={image} className="card-img-top" alt="Front default" />
        <h2 className="card-title">{name}</h2>
        <div className="card mt-2">
          <ul className="list-group list-group-flush">
            {pokemon.abilities.map((ability) => (
              <li key={ability.ability.name} className="list-group-item">
                {ability.ability.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
