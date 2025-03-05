import React from 'react';
import { ServeComp } from './server-comp.jsx';


function App() {
  return (
    <div>
      <h1>Hello, 服务端流式渲染!</h1>
      <p>当前时间: {new Date().toString()}</p>
      <React.Suspense fallback={<div>Loading...</div>}>
        <ServeComp />
      </React.Suspense>
    </div>
  );
}


export default App;

