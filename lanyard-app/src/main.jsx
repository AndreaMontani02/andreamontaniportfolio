import React from 'react';
import ReactDOM from 'react-dom/client';
import Lanyard from './Lanyard';

const target = document.getElementById('lanyard-root') || document.getElementById('root');
ReactDOM.createRoot(target).render(
  <Lanyard position={[0, 0, 10]} gravity={[0, -40, 0]} />
);
