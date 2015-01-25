function * load() {
	var a = yield doload();
	return a;
}

// async function loadit() {
// 	var a = await doload();
// 	return a;
// }

function doload() {
	return function(done) {
		done();
	}
}

export = load;