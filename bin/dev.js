const webpack = require("webpack");
const [webpackClientConfig, webpackServerConfig] = require("../webpack.config");
const nodemon = require("nodemon");
const path = require("path");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");
const express = require("express");

const hmrServer = express();
const clientCompiler = webpack(webpackClientConfig);


hmrServer.use(webpackDevMiddleware(clientCompiler, {
    publicPath: webpackClientConfig.output.publicPath,
    serverSideRender: true,
    noInfo: true,
    watchOptions: {
        ignore: /dist/,
    },
    writeToDisk: true,
    stats: "error-only",
}));

hmrServer.use(webpackHotMiddleware(clientCompiler, {
    path: "/static/__webpack_hmr",
}));

hmrServer.listen(3001, () => console.log("HMR server started on 3001"))

const compiler = webpack(webpackServerConfig);

compiler.watch({}, (err) => {
    if (err) {
        console.log(err)
    }

    console.log("Compilation success")
})

nodemon({
    script: path.resolve(__dirname, "../dist/server/server.js"),
    watch: [
        path.resolve(__dirname, "../dist/server"),
        path.resolve(__dirname, "../dist/client")
    ]
})