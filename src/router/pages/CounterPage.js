import React from 'react';
import {view as Counter, stateKey, reducer} from '../Counter';

const page = () => {
  return (
    <div>
      <div>Counter</div>
      <Counter />
    </div>
  );
};

const initialState = 100;

export {page, reducer, initialState, stateKey};
