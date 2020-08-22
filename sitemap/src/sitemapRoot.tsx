/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *  which is at the root directory of this source code repository.
 */

const { h } = require("preact");
const { render } = require("preact-render-to-string");

declare global {
  namespace JSX {
    interface IntrinsicElements {
      sitemapindex: any;
      sitemap: any;
      urlset: any;
    }
  }
}

const renderStaticDocumentationLinks = (allNodeUrls: string[]) =>
  allNodeUrls.map((pageUrl: string) => (
    <sitemap>
      <loc>{pageUrl}</loc>
      <lastmod>{new Date().toISOString()}</lastmod>
    </sitemap>
  ));

const renderRootDocument = async (allNodeUrls: string[]) => {
  return (
    <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      {renderStaticDocumentationLinks(allNodeUrls)}
    </sitemapindex>
  );
};

export const renderRootXmlAsync = async (allNodeUrls: string[]) => {
  return (
    '<?xml version="1.0" encoding="UTF-8"?>' +
    render(await renderRootDocument(allNodeUrls), { xml: true })
  );
};
