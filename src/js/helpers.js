import { TIMEOUT_SEC } from './config.js';
console.log(TIMEOUT_SEC);
const timeout = function(s) {
  return new Promise(function(_, reject) {
    setTimeout(function() {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const AJAX = async function(url, uploadData = undefined) {
  try {
    const fetchPro = uploadData
      ? fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(uploadData)
        })
      : fetch(url);

    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    const data = await res.json();

    if (!res.ok)
      throw new Error(`(${res.status}) ${res.statusText}. ${data.message}`);

    return data;
  } catch (err) {
    throw err;
  }
};

// export const getJSON = async function(url) {
//   try {
//     const fetchPro = fetch(url);
//     const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
//     const data = await res.json();

//     if (!res.ok)
//       throw new Error(`(${res.status}) ${res.statusText}. ${data.message}`);

//     return data;
//   } catch (err) {
//     throw err;
//   }
// };

// export const sendJSON = async function(url, uploadData) {
//   try {
//     const fetchPro = fetch(url, {
//       method: 'POST',
//       headers: {
//         // these are standard headers which are some snippet of text ie information about the request
//         'Content-Type': 'application/json'
//         // this indicates that, the data would b in a json format
//       },
//       // the body should be in json format, so we convert it
//       body: JSON.stringify(uploadData)
//     });
//     // we have to still race this request against a timer to prevent it running forever
//     const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
//     // we would also await any data coming back because the forkify API will actually return back the data we jst sent which will be very important
//     const data = await res.json();

//     if (!res.ok)
//       throw new Error(`(${res.status}) ${res.statusText}. ${data.message}`);

//     return data;
//   } catch (err) {
//     throw err;
//   }
// };
