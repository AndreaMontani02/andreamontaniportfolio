import React from 'react';
import ReactDOM from 'react-dom/client';
import Lanyard from './Lanyard';

const isMobile = window.innerWidth <= 600;
const target = document.getElementById('lanyard-root') || document.getElementById('root');
ReactDOM.createRoot(target).render(
  <Lanyard
    position={[0, 0, isMobile ? 14 : 12]}
    gravity={[0, -40, 0]}
    fov={20}
    anchorX={isMobile ? 0 : -2}
  />
);
