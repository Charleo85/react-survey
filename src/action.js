const url = '';

export const fetchData = (callback, fail) =>
  fetch(url + '/loadquestions')
    .then(response => response.json())
    .then(response => {
      callback(response);
    })
    .catch(error => {
      fail(error);
    });

export const submitResponse = (data, callback, fail) =>
  fetch(url + '/submit', {
    body: JSON.stringify(data),
    headers: { 'content-type': 'application/json' },
    method: 'POST'
  })
    .then(response => {
      if (response.status === 200) {
        return response.json();
      } else {
        fail();
      }
    })
    .then(data => {
      if (data.status === 0) {
        callback(data.mTurkCode);
      } else {
        fail(data.msg);
      }
    })
    .catch(error => {
      console.log(error);
      fail();
    });

const fakeResponse = () => {
  return [
    [
      { id: '1_0', img: '1_0.png' },
      { id: '2_1', img: '2_1.png' },
      { id: '3_1', img: '3_1.png' },
      { id: '4_1', img: '4_0.png' }
    ],
    [
      {
        id: '5_1',
        content:
          'If we hope to create something of lasting value, we need to start with what people want — not just with what’s technically possible.'
      },
      {
        id: '6_0',
        content:
          'Every Frame a Painting is officially dead. Nothing sinister; we just decided to end it, rather than keep on making stuff.'
      },
      {
        id: '3_1',
        content:
          'Being a designer means fighting the presumptive reflex, which takes disciplined reasoning and self awareness in order to truly understand the context of a problem'
      },
      {
        id: '1_0',
        content:
          'Last week a personal email I wrote was retweeted over 7,000 times, and liked by almost 30k people.'
      }
    ]
  ];
};
