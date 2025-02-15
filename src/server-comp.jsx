import fs from 'fs/promises';
import path from 'path';

export async function ServeComp() {

  // Get the current directory
  const currentDirectory = path.resolve();

  try {
    const files = await fs.readdir(currentDirectory);
    console.log('Files in current directory:');
    files.forEach(file => console.log(file));
  } catch (err) {
    console.error('Error reading directory:', err);
  }

  return (
    <div>
      {
        files.map(item => {
          return <>{item}</>
        })
      }
    </div>
  )


}
