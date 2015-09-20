import RpcClient from 'jrpc2/lib/client';
import AjaxTransport from 'jrpc2-ajax';
import proxy from 'jrpc2-proxy';

var ajax = new AjaxTransport({path: "/api/"});
var client = new RpcClient(ajax);

export default proxy.createService(client, [
	"getCard",
	"getBid"
]);
