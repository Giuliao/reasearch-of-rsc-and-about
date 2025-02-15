import { defineConfig } from '@rspack/cli';
import path from 'path';

export default defineConfig({
  entry: {
    server: './src/server.jsx',
    client: './src/client.jsx'
  },
  output: {
    // 整体的输出目录
    path: path.resolve(process.cwd(), 'dist'),
    // 使用函数根据入口名称动态生成输出文件名和路径
    filename: (pathData) => {
      if (pathData.chunk.name === 'client') {
        return path.relative(
          path.resolve(process.cwd(), 'dist'),
          path.resolve(process.cwd(), 'public', '[name].js')
        );
      }
      // 其他入口按默认规则输出
      return '[name].js';
    }
  },
  target: "node",
  optimization: {
    minimize: false
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        use: {
          loader: 'builtin:swc-loader',
          options: {
            jsc: {
              parser: {
                syntax: 'ecmascript',
                jsx: true,
              },
              transform: {
                react: {
                  pragma: 'React.createElement',
                  pragmaFrag: 'React.Fragment',
                  throwIfNamespace: true,
                  development: false,
                  useBuiltins: false,
                },
              },
            },
          },
        },
        type: 'javascript/auto',
      },
    ],
  },
});
