const url = 'localhost';

export const fetchData = (callback, e) =>
  fetch(url + '/get-image')
    .then(response => {
      callback(response);
    })
    .catch(error => {
      e(error);
    });

export const submitResponse = (data, callback, e) =>
  fetch(url + '/submit', {
    body: JSON.stringify(data),
    headers: {
      'user-agent': 'Mozilla/4.0 MDN Example',
      'content-type': 'application/json'
    },
    method: 'POST'
  })
    .then(response => {
      callback(response);
    })
    .catch(error => {
      e(error);
    });
