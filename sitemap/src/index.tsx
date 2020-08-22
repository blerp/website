/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *  which is at the root directory of this source code repository.
 */

import * as express from "express";
import { Storage } from "@google-cloud/storage";
import { projectConfig } from "./config";

const gcs = new Storage();
const siteMapbucket = gcs.bucket(projectConfig.bucket);

export const sitemap = async (req: express.Request, res: express.Response) => {
  const fileResult = await siteMapbucket.file(projectConfig.rootSitemap);
  const fileExists = await fileResult.exists();
  const fileExistsResult = fileExists[0];

  if (fileExistsResult) {
    res.header("Cache-Control", "public, max-age=604800, s-max-age=31536000");
    const [fileMetadata] = await fileResult.getMetadata();
    res.contentType(fileMetadata.contentType);
    fileResult.createReadStream().pipe(res);
  } else {
    return res.send(404);
  }
};
