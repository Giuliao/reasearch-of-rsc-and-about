import express from 'express';
import React from 'react';
import { renderToPipeableStream } from 'react-dom/server';
import App from "./app.jsx";
const app = express();
const port = 3000;

// 处理静态资源（如果需要）
app.use(express.static('public'));

app.get('/', (req, res) => {

  // 配置流选项
  const stream = renderToPipeableStream(<App />, {
    bootstrapScripts: ["/client.js"],
    onShellReady() {
      // 当初始 shell 准备好时
      res.statusCode = 200;
      res.setHeader('Content-type', 'text/html');
      stream.pipe(res);
    },
    onShellError(error) {
      // 处理 shell 错误
      console.error('Shell 渲染错误:', error);
      res.status(500).send('服务器错误');
    },
    onAllReady() {
      // 全部内容渲染完成（适用于 SEO 优化）
      console.log('完整内容已渲染');
    }
  }
  );

  // 设置超时处理
  req.on('close', () => {
    if (!res.headersSent) {
      stream.abort();
    }
  });
});



app.listen(port, () => {
  console.log(`服务器运行在 http://localhost:${port}`);
});

