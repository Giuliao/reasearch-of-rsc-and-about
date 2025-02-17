import path from 'path';
import { defineConfig } from '@rspack/cli';
import ReactServerWebPackPlugin from "react-server-dom-webpack/plugin";

export const commonConfig = {
  // 公共插件、模块规则等
  mode: 'development',
  optimization: {
    minimize: false,
     minimizer: [
    ],
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
            },
          },
        },
        type: 'javascript/auto',
      },
    ],
  },

};


const clientConfig = defineConfig({
  entry: {
    client: "./src/client.jsx"
  },
  output: {
    path: path.resolve(process.cwd(), 'static')
  },
  target: "web",
  resolve: {
    fallback: {
      path: false,
      fs: false
    }
  },
  ...commonConfig,
})

const serverConfig = defineConfig({
  entry: {
    server: './src/server.jsx',
  },
  output: {
    // 整体的输出目录
    path: path.resolve(process.cwd(), 'dist'),
  },
  target: "node",
  ...commonConfig,
});

export default [serverConfig, clientConfig];
