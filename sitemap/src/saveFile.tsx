const fs = require("fs");
const { renderRootXmlAsync } = require("./sitemapRoot");
import { projectConfig } from "./config";
const MEDIA_HOST = projectConfig.mediaHost;

import {
  renderSoundbitesXmlAsync,
  renderSoundboardXmlAsync,
  renderStaticLinksXmlAsync,
  renderCategoriesXmlAsync,
  renderBlogDocumentXml,
  renderUserXmlAsync
} from "./sitemaps";

export const saveDocument = async (document: any, fileName: any) => {
  const filePathToWrite = `./tmp/${fileName}`;
  fs.writeFile(filePathToWrite, document, { flag: "w" }, (err: any) => {
    if (!!err) {
      return console.log(err);
    }
    console.log(`Sitemap saved to ${filePathToWrite}`);
  });
  return `${MEDIA_HOST}/sitemap/${fileName}`;
};

// Saves the root document in website so that
export const saveRootDocumentInWebsite = async (
  document: any,
  fileName: any
) => {
  const filePathToWrite = `../src/static/${fileName}`;
  fs.writeFile(filePathToWrite, document, { flag: "w" }, (err: any) => {
    if (!!err) {
      return console.log(err);
    }
    console.log(`Sitemap saved to ${filePathToWrite}`);
  });
  return filePathToWrite;
};

export const saveNodeDocument = async (
  makeGenericDocumentsAsync: any,
  globalCount: any
) => {
  const documents = await makeGenericDocumentsAsync();
  const nodeUrls = []

  for(const doc of documents) {
    let fileName = `${projectConfig.sitemapBaseName}-${globalCount}.xml`
    console.log(`Made generic document for ${fileName}`, doc);
    const url = await saveDocument(doc, fileName);
    nodeUrls.push(url)
    globalCount++;
  }
  return nodeUrls
};

export const saveRootDocument = async (nodeUrls: string[]) => {
  console.log("check all noe urls", nodeUrls);
  const doc = await renderRootXmlAsync(nodeUrls);
  await saveDocument(doc, projectConfig.rootSitemap);
  return await saveRootDocumentInWebsite(doc, projectConfig.rootSitemap);
};

(async () => {
  let globalCount = 0

  const nodeUrls = await Promise.all([
    await saveNodeDocument(
      renderStaticLinksXmlAsync,
      0
    ),    
    await saveNodeDocument(
      renderSoundbitesXmlAsync,
      10
    ),
    await saveNodeDocument(
      renderSoundboardXmlAsync,
      30
    ),
    await saveNodeDocument(
      renderBlogDocumentXml,
      50
    ),
    await saveNodeDocument(
      renderUserXmlAsync,
      100
    ),
    await saveNodeDocument(
      renderCategoriesXmlAsync,
      200
    )
  ]);

  console.log("CHECKING URLS", nodeUrls);
  const flattenURls = Array.prototype.concat.apply([], nodeUrls);
  const checkSitemap = await saveRootDocument(flattenURls);
  console.log("FINISHED SAVING ALL AT", checkSitemap);
})();
