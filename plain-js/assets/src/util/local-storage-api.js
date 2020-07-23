export const get = (url) => {
  return new Promise(resolve => {
    setTimeout(() => {
      const response = localStorage.getItem(url);
      const jsonResponse = JSON.parse(response);

      resolve(jsonResponse);
    }, 300);
  });
}

export const post = (url, body) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const parsedBody = JSON.stringify(body);

        // throw new Error();
        localStorage.setItem(url, parsedBody);
        resolve('Data saved successfully');
      }
      catch(error) {
        reject({
          errorText: 'Cannot perform a post to server'
        })
      }
    }, 300);
  });
}