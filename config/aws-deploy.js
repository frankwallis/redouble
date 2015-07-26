var s3 = require("s3");
var client = s3.createClient();

var params = {
	localDir: "dist",
	deleteRemoved: true, // syncs directory, removing stale objects from remote
	s3Params: {
		Bucket: "smart-bridge.co.uk"
	}
};

client.uploadDir(params)
	.on('error', function(err) {
		console.error("unable to deploy to AWS:", err.stack);
	})
	.on('progress', function() {
		console.log("upload progress", this.progressAmount, "/", this.progressTotal);
	})
	.on('end', function() {
		console.log("deployed to AWS successfully");
	});
