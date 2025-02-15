import React from 'react';
// import { ServeComp } from './server-comp.jsx';


function App() {
  return (
    <html>
      <head>
        <title>SSR 示例</title>
      </head>
      <body>
        <div id="root">
          <h1>Hello, 服务端流式渲染!</h1>
          <p>当前时间: {new Date().toLocaleTimeString()}</p>
        </div>
      </body>
    </html>
  );
}

export default App;

