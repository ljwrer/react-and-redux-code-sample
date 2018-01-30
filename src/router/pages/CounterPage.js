import React from 'react';
import {view as Counter, stateKey, reducer, initState} from '../Counter';

const page = () => {
  return (
    <div>
      <div>Counter</div>
      <Counter />
    </div>
  );
};

export {page, reducer, initState, stateKey};
