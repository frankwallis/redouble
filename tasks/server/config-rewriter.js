var rewrite = require('connect-body-rewrite');

function configRewriter(bridgeAddress) {
    var script = "\n\t" + "<script>" + "\n\t" +
                    "window.v2config = { bridge_address: '" + bridgeAddress + "' };" + "\n\t" + "</script>\n";

    return rewrite({
        accept: function (res) {
            return (res.getHeader('content-type') || '').match(/text\/html/);
        },
        rewrite: function (body) {
            return body.replace(/(<head>)/, "$1" + script);
        }
    });
};

module.exports = configRewriter;