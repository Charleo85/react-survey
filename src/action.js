const url = '';//'https://hcdm.cs.virginia.edu:8088';

export const fetchData = (callback, fail) =>
	fetch(url + '/loadquestions', {
	mode: 'same-origin',
	headers: { 'content-type': 'application/json' },
	method: 'GET'
})
		.then(response => {
			console.log("loadquestion status "+ response.status)
		})
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
