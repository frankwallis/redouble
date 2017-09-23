import RpcClient from 'jrpc2/lib/client';
import AjaxTransport from 'jrpc2-ajax';
import JrpcProxy from 'jrpc2-proxy';

var ajax = new AjaxTransport({path: "/api/"});
var client = new RpcClient(ajax);

const proxy = JrpcProxy.createService(client, [
	"getCard",
	"getBid"
]);

/* Workaround for jrpc not being able to send falsy values */
/* TODO - replace jrpc! */
export default {
  getCard: (board) => proxy.getCard(board).then(response => response.payload),
  getBid: (board) => proxy.getBid(board).then(response => response.payload)
}
