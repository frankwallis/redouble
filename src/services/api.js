let api = process.env.__BROWSER__ ? require("./client") : require("./server");

//for (var prop in api)
//	console.log(prop);

export default api;
