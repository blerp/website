const { renderRootXmlAsync } = require("./sitemapRoot");

import { Storage } from "@google-cloud/storage";
import { projectConfig } from "./config";

import {
  renderSoundbitesXmlAsync,
  renderSoundboardXmlAsync,
  renderStaticLinksXmlAsync,
  renderCategoriesXmlAsync,
  renderUserXmlAsync,
  renderBlogDocumentXml
} from "./sitemaps";

const MEDIA_HOST = projectConfig.mediaHost;

const gcs = new Storage();
const siteMapbucket = gcs.bucket(projectConfig.bucket);

const uploadDocument = async (doc: any, fileName: string) => {
  const fileResult = siteMapbucket.file(fileName);
  const writeStream = fileResult.createWriteStream({
    metadata: {
      contentType: "application/xml"
    },
    resumable: false
  });

  return new Promise((resolve, reject) => {
    writeStream.on("error", (err: any) => {
      console.log("ERROR UPLOADING TO PLACE", err);
      reject(err);
    });

    writeStream.on("finish", async (chunk: any) => {
      await fileResult.makePublic();
      console.log("Successfully UPLOADING TO PLACE", fileName);
      resolve(fileName);
    });

    writeStream.end(doc);
  });
};

export const uploadSingleXml = async (
  makeDocumentAsync: any,
  globalCount: any
) => {
  console.log("Start Uploading Single Document");
  const docs = await makeDocumentAsync();
  const nodeUrls = []

  for(const doc of docs) {
    let fileName = `${projectConfig.sitemapBaseName}-${globalCount}.xml`
    await uploadDocument(doc, fileName);
    const url = `${MEDIA_HOST}/sitemap/${fileName}`
    nodeUrls.push(url)
    globalCount++;
  }

  return nodeUrls;
};

export const uploadRootXML = async (allNodeUrls: string[]) => {
  const doc = await renderRootXmlAsync(allNodeUrls);
  await uploadDocument(doc, projectConfig.rootSitemap);
  console.log(
    "Root alternate domain",
    `${MEDIA_HOST}/sitemap/${projectConfig.rootSitemap}`
  );
  return `https://storage.googleapis.com/${projectConfig.bucket}/${
    projectConfig.rootSitemap
  }`;
};

(async () => {
  const nodeUrls = await Promise.all([
    await uploadSingleXml(
      renderStaticLinksXmlAsync,
      0
    ),
    await uploadSingleXml(
      renderSoundbitesXmlAsync,
      50
    ),
    await uploadSingleXml(
      renderBlogDocumentXml,
      100
    ),
    await uploadSingleXml(
      renderCategoriesXmlAsync,
      200
    ),
    await uploadSingleXml(
      renderUserXmlAsync,
      300
    ),
    await uploadSingleXml(
      renderSoundboardXmlAsync,
      400
    ),
  ]);

  console.log("CHECKING URLS", nodeUrls);
  console.log("START UPLOADING ROOT");
  const flattenURls = Array.prototype.concat.apply([], nodeUrls);
  const checkSitemap = await uploadRootXML(flattenURls);
  console.log("FINISHED UPLOADING ALL", checkSitemap);
})();
