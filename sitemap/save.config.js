/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *  which is at the root directory of this source code repository.
 */

const path = require("path");
const nodeExternals = require("webpack-node-externals");

module.exports = {
  entry: "./src/saveFile",
  externals: [nodeExternals()],
  mode: "production",
  module: {
    rules: [
      {
        loader: "ts-loader",
        test: /\.tsx?$/
      }
    ]
  },
  output: {
    filename: "saveFile.js",
    libraryTarget: "commonjs",
    path: path.join(__dirname, "dist")
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  target: "node"
};
