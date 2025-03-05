import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import { ServeComp } from './server-comp.jsx';


hydrateRoot(
  document.getElementById('root'),
  <div>
    <h1>Hello, 服务端流式渲染!</h1>
    <p>当前时间: {new Date().toLocaleTimeString()}</p>
    <React.Suspense fallback={<div>Loading...</div>}>
      <ServeComp />
    </React.Suspense>
  </div>
);



