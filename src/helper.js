
export const listeners = []
export function registerClientData(type, handler) {
  if (typeof window !== 'undefined') {
    listeners.push(() => {
      console.log("===>", type);
      document.addEventListener(type, (evt) => {
        const { detail: data } = evt;
        console.log("===>", data);
        let files;
        try {
          files = JSON.parse(data);
        } catch (err) {
          console.error('Error parsing client data:', err);
        }

        handler(files);
      })
    });
  }
}


export const promiseList = []
export function registerServerData(handler) {
  if (typeof window === 'undefined') {
    promiseList.push(handler());
  }
}

