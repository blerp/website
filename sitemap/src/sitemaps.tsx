/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *  which is at the root directory of this source code repository.
 */

const { h } = require("preact");
const { render } = require("preact-render-to-string");
const { MONGO_URL } = require("./config");
const { ObjectID, MongoClient } = require("mongodb");
import { projectConfig } from "./config";

const HOST_NAME = projectConfig.hostName;
const MAX_SITEMAP_SIZE = 50000

function chunkArrayInGroups(arr: [], size: any) {
  var myArray = [];
  for(var i = 0; i < arr.length; i += size) {
    myArray.push(arr.slice(i, i+size));
  }
  return myArray;
}

function getArrayFromCollection(collectionName:any, db:any) :any {
  return new Promise(function(resolve, reject) {
     db.collection(collectionName).find().toArray( function(err: any, docs:any) {
      if (err) {
        // Reject the Promise with an error
        return reject(err)
      }
      // Resolve (or fulfill) the promise with data
      return resolve(docs)
    })
  })
}

const renderStaticDocumentationLinks :any = () =>
  [
    `${HOST_NAME}/legal`,
    `${HOST_NAME}/content-policy"`,
    `${HOST_NAME}/careers`,
    `${HOST_NAME}/terms-of-service`,
    `${HOST_NAME}/dmca-policy`,
    `${HOST_NAME}/privacy-policy`,
    `${HOST_NAME}/resources/terms-of-service`,
    `${HOST_NAME}/resources/dmca`,
    `${HOST_NAME}/resources/privacy`,
    `${HOST_NAME}/faq`,
    `${HOST_NAME}/support`,
    `${HOST_NAME}/discord-soundboard-bot`,
    `${HOST_NAME}/mobile-apps`,
    `${HOST_NAME}/soundboard-products`,
    `${HOST_NAME}/soundboard-products/twitch`,
    `${HOST_NAME}/soundboard-products/discord`,
    `${HOST_NAME}/soundboard-products/voice-assistants`,
    `${HOST_NAME}/videogame-meme-soundboards`,
    `${HOST_NAME}/making-money-on-twitch`,
    `${HOST_NAME}/how-to-make-money-playing-games`,
    `${HOST_NAME}/how-to/create-a-soundboard`,
    `${HOST_NAME}/best-games-to-stream-on-twitch`,
    `${HOST_NAME}/soundbites`,
    `${HOST_NAME}/streams`,
    `${HOST_NAME}/twitch-extension`,
    `${HOST_NAME}/twitch-setup`,
    `${HOST_NAME}/twitch-walkon`,
    `${HOST_NAME}/blerps`,
    `${HOST_NAME}/blerps/what-is-blerp`,
    `${HOST_NAME}/blerps/how-blerp-is-used`,
    `${HOST_NAME}/blerps/suggest-ways-to-blerp`,
    `${HOST_NAME}/company`,
    `${HOST_NAME}/company/podcast`,
    `${HOST_NAME}/company/about-us`,
    `${HOST_NAME}/company/company-profiles`,
    `${HOST_NAME}/company/company-picks`,
    `${HOST_NAME}/blog`,
    `${HOST_NAME}/resources`,
    `${HOST_NAME}/connect-with-us`,
    `${HOST_NAME}/connect-with-us/contact`,
    `${HOST_NAME}/connect-with-us/social-media`,
    `${HOST_NAME}/login`,
    `${HOST_NAME}/logout`,
    `${HOST_NAME}/upload`,
    `${HOST_NAME}/donate`,
    `${HOST_NAME}/donate/thank-you`,
    `${HOST_NAME}/donate/cancel`,
    `${HOST_NAME}/top-sounds`,
    `${HOST_NAME}/top-sounds/bernie-sanders-soundboard-top-bernie-sounds`,
    `${HOST_NAME}/top-sounds/six-donald-trump-soundboard-sounds`,
    `${
      HOST_NAME
    }/top-sounds/five-great-sound-quotes-from-south-park-soundboard`,
    `${HOST_NAME}/top-sounds/the-three-best-laugh-track-soundboard-sounds`,
    `${HOST_NAME}/top-sounds/top-sound-quotes-from-roblox-oof-soundboard`,
    `${HOST_NAME}/top-sounds/top-mario-and-luigi-nintendo-soundboards`,
    `${HOST_NAME}/top-sounds/top-star-wars-soundboards-lightsaber-sfx`,
    `${HOST_NAME}/top-sounds/top-warcraft-soundboards-from-videogame`,
    `${HOST_NAME}/twitch/streaming-guides`,
    `${HOST_NAME}/twitch/streaming-guides/obs`,
    `${HOST_NAME}/twitch/streaming-guides/streamlabs`,
    `${HOST_NAME}/twitch/streaming-guides/streamelements`,
    `${HOST_NAME}/twitch/streaming-guides/twitchstudios`,
    `${HOST_NAME}/twitch/streaming-guides/twitch`,
    `${HOST_NAME}/twitch/streaming-guides/xsplit`,
    `${HOST_NAME}/zoom-video-chat`
  ].map(page => (
    <url>
      <loc>{page}</loc>
      <changefreq>weekly</changefreq>
    </url>
  ));

const makeBlogPostItems :any = () =>
  [
    `${HOST_NAME}/blog/post/c15476301976`,
    `${HOST_NAME}/blog/post/a2fe3ed09ae9`,
    `${HOST_NAME}/blog/post/95d761c3af39`,
    `${HOST_NAME}/blog/post/a22d5eda1f6`,
    `${HOST_NAME}/blog/post/9d335fbb8e5c`,
    `${HOST_NAME}/blog/post/8969a09e09e2`,
    `${HOST_NAME}/blog/post/31823125c2af`,
    `${HOST_NAME}/blog/post/8qcHx_b25`,
    `${HOST_NAME}/blog/post/gLlo_Q487`
  ].map(page => (
    <url>
      <loc>{page}</loc>
      <changefreq>weekly</changefreq>
    </url>
  ));

const renderBlogPostsDocument:any = async (client: any) => (
  [<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    {makeBlogPostItems()}
  </urlset>]
);

export const renderBlogDocumentXml : any = async () => {
  return await renderXmlAsync(renderBlogPostsDocument);
};

const renderStaticLinksDocument :any = async (client: any) => (
  [<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    {renderStaticDocumentationLinks()}
  </urlset>]
);

export const renderStaticLinksXmlAsync = async () => {
  return await renderXmlAsync(renderStaticLinksDocument);
};

const renderBites :any = async (client: any) => {
  const db = client.db();
  let allBites: [any?] = [] 

  try {
    console.log("Bites collection initiated grab");
    allBites = await getArrayFromCollection("bites", db)
    console.log("THERE ARE THIS MANY BITES", allBites.length);  
  } catch(err) {
    console.log("CHECKING ERROR", err)
  }

  return allBites.map((bite) => (
    <url>
      <loc>{`${HOST_NAME}/soundbites/${bite._id}`}</loc>
      <changefreq>daily</changefreq>
      {bite.updatedAt && (
        <lastmod>{new Date(bite.updatedAt).toISOString()}</lastmod>
      )}
    </url>
  ));
};

const renderCategories :any = async (client: any) => {
  const db = client.db();
  const collection = db.collection("categories");
  const allCategories: [any] = await collection.find({}).toArray();
  console.log("THERE ARE THIS MANY BOARDS", allCategories.length);
  return allCategories.map(category => (
    <url>
      <loc>{`${HOST_NAME}/categories/${category.urlKey}`}</loc>
      <changefreq>daily</changefreq>
      {category.updatedAt && (
        <lastmod>{new Date(category.updatedAt).toISOString()}</lastmod>
      )}
    </url>
  ));
};

const renderBoards :any = async (client: any) => {
  const db = client.db();
  const playlistCollection = db.collection("playlists");
  const allPlaylists: [any] = await playlistCollection.find({}).toArray();
  console.log("THERE ARE THIS MANY BOARDS", allPlaylists.length);

  return allPlaylists.map(playlist => (
    <url>
      <loc>{`${HOST_NAME}/soundboard/${playlist._id}`}</loc>
      <changefreq>daily</changefreq>
      {playlist.updatedAt && (
        <lastmod>{new Date(playlist.updatedAt).toISOString()}</lastmod>
      )}
    </url>
  ));
};

const renderUsers :any = async (client: any) => {
  const db = client.db();
  const userCollection = db.collection("users");
  const allUsers: [any] = await userCollection.find({}).toArray();

  return allUsers.map(user => (
    <url>
      <loc>{`${HOST_NAME}/user/${user._id}`}</loc>
      <changefreq>daily</changefreq>
      {user.updatedAt && (
        <lastmod>{new Date(user.updatedAt).toISOString()}</lastmod>
      )}
    </url>
  ));
};

const renderSoundbitesDocument:any = async (client: any) => {
  const bitesDocument = await renderBites(client)
  const chunkedBitesArray = chunkArrayInGroups(bitesDocument, MAX_SITEMAP_SIZE)

  return chunkedBitesArray.map((chunkOfBites) => (
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      {chunkOfBites}
    </urlset>
  ));
}

export const renderSoundbitesXmlAsync:any = async () => {
  return await renderXmlAsync(renderSoundbitesDocument);
};

const renderSoundboardDocument:any = async (client: any) => {
  const boardsDocument = await renderBoards(client)
  const chunkedBoardsDocument = chunkArrayInGroups(boardsDocument, MAX_SITEMAP_SIZE)

  return chunkedBoardsDocument.map((chunkOfBite) => (
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      {chunkOfBite}
    </urlset>
  ))
}
export const renderSoundboardXmlAsync:any= async () => {
  return await renderXmlAsync(renderSoundboardDocument);
};

const renderUserDocument:any = async (client: any) => {
  const userDocuments = await renderUsers(client)
  const chunkedUsers = chunkArrayInGroups(userDocuments, MAX_SITEMAP_SIZE)

  return chunkedUsers.map((userChunk) => (
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      {userChunk}
    </urlset>
    )
  );
}

export const renderUserXmlAsync: any = async () => {
  return await renderXmlAsync(renderUserDocument);
};

const renderCategoryDocument:any = async (client: any) => {
  const categoriesDocument = await renderCategories(client)
  const chunkedCategoriys = chunkArrayInGroups(categoriesDocument, MAX_SITEMAP_SIZE)

  return chunkedCategoriys.map((chunkCategory) => (
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      {chunkCategory}
    </urlset>
  ))
}

export const renderCategoriesXmlAsync:any= async () => {
  return await renderXmlAsync(renderCategoryDocument);
};

export const renderXmlAsync: any = async (renderGenericAsync: any) => {
  const client = await MongoClient.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log("Mongo Connection: ",  !!client && !!client.topology && client.topology.isConnected())
  const documents = await renderGenericAsync(client);
  const allXmlDocuments = documents.map((xmlDoc: any) => ('<?xml version="1.0" encoding="UTF-8"?>' + render(xmlDoc, { xml: true })))

  return allXmlDocuments;
};

const renderFullDocument:any = async (client: any) => (
  [<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>{`${HOST_NAME}`}</loc>
      <changefreq>always</changefreq>
    </url>
    {renderStaticDocumentationLinks()}
    {await renderBites(client)}
    {await renderBoards(client)}
    {await renderUsers(client)}
  </urlset>]
);

export const renderFullXmlAsync = async () => {
  return await renderXmlAsync(renderFullDocument);
};
