const webpack = require("webpack");

module.exports = {
  entry: "./src/StellarLedger.js",
  output: {
    path: __dirname + "/dist/",
    filename: "StellarLedger.js",
    library: "StellarLedger",
    libraryTarget: "umd"
  },
  devtool: "source-map"
};
