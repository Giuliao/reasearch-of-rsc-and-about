import React from 'react';
import path from "path";
import fs from "fs/promises";
import { registerClientData, registerServerData } from './helper';


registerClientData("ServeComp", (files) => {
  console.log("files===>", files);
  console.log("ServeComp.propsPromise===>", ServeComp.propsPromise);
  ServeComp.propsPromise = Promise.resolve({ files: files });
  console.log("ServeComp.propsPromise===>", ServeComp.propsPromise);
})

registerServerData(async () => {
  const currentDirectory = path.resolve();
  let files = []
  try {
    files = await fs.readdir(currentDirectory);
  } catch (err) {
    console.error('Error reading directory:', err);
  }

  return {
    type: "ServeComp",
    data: files
  }
})


export function ServeComp() {
  const { files } = React.use(ServeComp.propsPromise);
  return (
    <div>
      {
        files.map(item => {
          return <div>{item}</div>
        })
      }
    </div>
  )
}

ServeComp.propsPromise = new Promise(() => { });

