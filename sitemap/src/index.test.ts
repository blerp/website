// /*
//  * BLERP LLC ("BLERP") CONFIDENTIAL
//  * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
//  * This file is subject to the terms and conditions defined in the file 'LICENSE',
//  *  which is at the root directory of this source code repository.
//  */
//
// import datastore = require("@google-cloud/datastore");
// import express = require("express");
// import isXML = require("is-xml");
// import request = require("supertest");
// import formatXML = require("xml-formatter");
// import { sitemap } from "./";
//
// expect.addSnapshotSerializer({
//   print: val => formatXML(val),
//   test: isXML
// });
//
// const app = express();
//
// app.get("/sitemap", sitemap);
//
// describe("Sitemap Generator Service", () => {
//   beforeEach(() => {
//     (datastore as any).__addToMockData("Bite:aBcEfGhIjK", {
//       audioKey: {
//         id: 1234567890,
//         kind: "Audio"
//       },
//       color: "#FF0000",
//       createdAt: "2016-10-01T00:00:00.000Z",
//       imageKey: {
//         id: 1234567890,
//         kind: "Image"
//       },
//       keywords: ["random", "random1", "random2", "random3"],
//       playCount: 100,
//       title: "Random Title",
//       updatedAt: "2016-10-02T00:00:00.000Z"
//     });
//
//     (datastore as any).__addToMockData("Topic:aBcEfGhIjK", {
//       content: [],
//       createdAt: "2016-10-01T00:00:00.000Z",
//       title: "Random Title",
//       updatedAt: "2016-10-02T00:00:00.000Z"
//     });
//
//     (datastore as any).__addToMockData("Topic:lMnOpQrStU", {
//       content: [],
//       createdAt: "2016-10-03T00:00:00.000Z",
//       title: "Super Random Title",
//       updatedAt: "2016-10-04T00:00:00.000Z"
//     });
//
//     (datastore as any).__addToMockData("Topic:vWxYzAbCdE", {
//       content: [],
//       createdAt: "2016-10-05T00:00:00.000Z",
//       title: "Mega Random Title",
//       updatedAt: "2016-10-06T00:00:00.000Z"
//     });
//
//     (datastore as any).__addToMockData("Topic:fGhIjKlMnO", {
//       content: [],
//       createdAt: "2016-10-07T00:00:00.000Z",
//       title: "Really Really REALLY Random Title",
//       updatedAt: "2016-10-08T00:00:00.000Z"
//     });
//   });
//
//   afterEach(() => {
//     (datastore as any).__clearMockData();
//   });
//
//   it("serves a sitemap", async () => {
//     const response = await request(app).get("/sitemap");
//
//     expect(response.status).toBe(200);
//     expect(response.text).toMatchSnapshot();
//   });
// });
