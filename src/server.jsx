import express from 'express';
import React from 'react';
import App from './app.jsx';
import { promiseList } from "./helper.js";
import { renderToPipeableStream } from "react-dom/server";
import { Transform } from "stream";
const app = express();
const port = 3000;

// 处理静态资源（如果需要）
app.use(express.static('static'));

app.get('/', async (req, res) => {

  const result = await Promise.all(promiseList);
  const str = result.map(item=>{
    return `
document.dispatchEvent(
  new CustomEvent('${item.type}', {
  detail: '${JSON.stringify(item.data)}'}))
`}).join(";")
  console.log(str);
  // 配置流选项
  const stream = renderToPipeableStream(
   <>    

      <App />
      <script
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
            __html: str,
        }}
        defer
      />
    </>, {
    bootstrapScripts: ["/client.js"],
    onShellReady() {
      // 当初始 shell 准备好时
      res.statusCode = 200;
      res.setHeader('Content-type', 'text/html; charset=utf-8');
      
      res.write(
            `<!DOCTYPE html><head><title>SSR 示例</title></head><body><div id="root">`,
      )

      const transform = new Transform({
        transform(chunk, encoding, callback) {
              this.push(chunk)
              callback()
        },
        flush(callback) {
              this.push(`</div></body></html>`)
              callback()
            },
        });
      stream.pipe(transform).pipe(res)
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

