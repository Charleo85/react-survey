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
