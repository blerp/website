/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */

import express from "express";
import "isomorphic-fetch";
import next from "next";
import projectConfig from "./config";

import { initializeApollo } from "./lib/nextApollo";
import gql from "graphql-tag";

const compression = require("compression");
const apiHost = projectConfig.apiHost;
const currentHost = projectConfig.host;
const env = projectConfig.env;

// export interface Global extends NodeJS.Global {
//   document: Document;
//   window: Window;
//   DEVELOPMENT: any;
//   FOLDER: any;
// }

// declare var global: Global;

global.DEVELOPMENT = process.env.NODE_ENV === "development" ? true : false;

const dev = global.DEVELOPMENT ? true : false;
const folder = global.DEVELOPMENT ? "src" : "dist";

console.log("IS DEVELOPMENT", dev, "FOLDER", folder);

const app = next({ dev, dir: folder });

const handle = app.getRequestHandler();
const server = express();

server.use(compression());

server.use(
    "/static",
    express.static(__dirname + "/static", {
        maxAge: "365d",
    }),
);

server.get("/sitemap", (req, res) =>
    env === "PRODUCTION"
        ? res
              .header(
                  "Cache-Control",
                  "public, max-age=604800, s-max-age=2592000",
              )
              .sendFile("/static/blerp-main-sitemap.xml", {
                  root: __dirname,
              })
        : res
              .header(
                  "Cache-Control",
                  "public, max-age=604800, s-max-age=2592000",
              )
              .sendFile("/static/blerp-main-sitemap.xml", {
                  root: __dirname,
              }),
);

server.get("/sitemap.xml", (req, res) =>
    env === "PRODUCTION"
        ? res
              .header(
                  "Cache-Control",
                  "public, max-age=604800, s-max-age=2592000",
              )
              .sendFile("/static/blerp-main-sitemap.xml", {
                  root: __dirname,
              })
        : res
              .header(
                  "Cache-Control",
                  "public, max-age=604800, s-max-age=2592000",
              )
              .sendFile("/static/blerp-main-sitemap.xml", {
                  root: __dirname,
              }),
);

server.get("/manifest.json", (req, res) =>
    res
        .header("Cache-Control", "public, max-age=604800, s-max-age=2592000")
        .sendFile("/static/manifest.json", {
            root: __dirname,
        }),
);

server.get("/robot", (req, res) =>
    res
        .header("Cache-Control", "public, max-age=604800, s-max-age=2592000")
        .sendFile("/static/robots.txt", {
            root: __dirname,
        }),
);

server.get("/robot.txt", (req, res) =>
    res
        .header("Cache-Control", "public, max-age=604800, s-max-age=2592000")
        .sendFile("/static/robots.txt", {
            root: __dirname,
        }),
);

server.get("/robots.txt", (req, res) =>
    res
        .header("Cache-Control", "public, max-age=604800, s-max-age=2592000")
        .sendFile("/static/robots.txt", {
            root: __dirname,
        }),
);

server.get("/opensearch.xml", (req, res) =>
    res
        .header("Cache-Control", "public, max-age=604800, s-max-age=2592000")
        .sendFile("/static/opensearch.xml", {
            root: __dirname,
        }),
);

server.get(
    "/.well-known/apple-app-site-association",
    (req, res) => {
        return res.redirect(301, `${currentHost}/apple`);
    },
    // res
    //   // .header("Cache-Control", "public, max-age=604800, s-max-age=2592000")
    //   .sendFile("/static/apple-app-site-association.json", {
    //     root: __dirname
    //   })
);

server.get("/apple", (req, res) =>
    res
        // .header("Cache-Control", "public, max-age=604800, s-max-age=2592000")
        .sendFile("/static/apple-app-site-association.json", {
            root: __dirname,
        }),
);

server.get("/apple-app-site-association", (req, res) => {
    return res.redirect(301, `${currentHost}/apple`);
});

server.get("/favicon.ico", (req, res) =>
    res
        .header("Cache-Control", "public, max-age=604800, s-max-age=2592000")
        .sendFile("/static/images/favicon.ico", {
            root: __dirname,
        }),
);

server.get("/favicon.png", (req, res) =>
    res
        .header("Cache-Control", "public, max-age=604800, s-max-age=2592000")
        .sendFile("/static/images/favicon.png", {
            root: __dirname,
        }),
);

// server.get('/service-worker.js', (req, res) =>
//   res.header('Cache-Control', 'public, max-age=21600, s-max-age=86400').sendFile('/service-worker.js', {
//     root: __dirname
//   })
// );

server.get("/auth-success/:jwt", async (req, res) => {
    res.header("Cache-Control", "public, max-age=3600, s-max-age=21600");
    await app.render(req, res, "/auth-success", {
        ...req.query,
        ...req.params,
    });
});

// TODO: for now to get rid of errors in the future maybe just remove?
server.get("/file", async (req, res) => {
    return res.redirect(301, `${currentHost}`);
});

server.get("/file/:name", async (req, res) => {
    return res.redirect(301, `${currentHost}`);
});

server.get("/categories/:key", async (req, res) => {
    res.header("Cache-Control", "public, max-age=3600, s-max-age=21600");
    // NOTE: This + UrlChanger component will allow us to do history changing urls
    await app.render(req, res, "/categories", { key: req.query.key });
});

server.get("/soundbites", async (req, res) => {
    res.header("Cache-Control", "public, max-age=3600, s-max-age=21600");
    await app.render(req, res, "/soundbites", { ...req.query, ...req.params });
});

server.get("/soundbites/:id", async (req, res) => {
    res.header("Cache-Control", "public, max-age=3600, s-max-age=21600");
    // NOTE: This + UrlChanger component will allow us to do history changing urls
    const truncatedIdItems = req.query.id
        ? req.query.id.split("-")
        : req.params.id.split("-");
    const truncatedId = truncatedIdItems[truncatedIdItems.length - 1];
    await app.render(req, res, "/bite", { id: truncatedId });
});

server.get("/twitch-setup", async (req, res) => {
    res.header("Cache-Control", "public, max-age=3600, s-max-age=21600");
    return res.redirect(301, `${currentHost}/twitch/streaming-guides`);
});

server.get("/twitch/streaming-guides/:guideName", async (req, res) => {
    res.header("Cache-Control", "public, max-age=3600, s-max-age=2c600");
    await app.render(req, res, "/twitch/streaming-guides", {
        guideName: req.params.guideName,
    });
});

server.get("/bites/:id", async (req, res) => {
    res.header("Cache-Control", "public, max-age=3600, s-max-age=21600");
    const HOST = req.get("Host");

    if (!req.query.id && !req.params.id) {
        return app.render(req, res, "/index", { ...req.query, ...req.params });
    }

    const truncatedIdItems = req.query.id
        ? req.query.id.split("-")
        : req.params.id.split("-");
    const truncatedId = truncatedIdItems[truncatedIdItems.length - 1];

    if (
        HOST === "https://staging.blerp.com" ||
        truncatedId.length === 25 ||
        truncatedId.length === 10
    ) {
        return res.redirect(301, currentHost);
    }

    return res.redirect(301, `${currentHost}/soundbites/${truncatedId}`);
});

server.get("/bite/:id", async (req, res) => {
    res.header("Cache-Control", "public, max-age=3600, s-max-age=21600");
    const HOST = req.get("Host");

    const truncatedIdItems = req.query.id
        ? req.query.id.split("-")
        : req.params.id.split("-");
    const truncatedId = truncatedIdItems[truncatedIdItems.length - 1];

    if (
        HOST === "https://staging.blerp.com" ||
        truncatedId.length === 25 ||
        truncatedId.length === 10
    ) {
        return res.redirect(301, currentHost);
    }

    return res.redirect(301, `${currentHost}/soundbites/${truncatedId}`);
});

// NOTE: probably gone forever
// server.get("/beat/:id", async (req, res) => {
//   res.header("Cache-Control", "public, max-age=3600, s-max-age=21600");
//   await app.render(req, res, "/beat", { ...req.query, ...req.params });
// });

const GRAB_BLERP_BY_ID = gql`
    query websiteGetOembedPage($id: MongoID!) {
        web {
            biteById(_id: $id) {
                ...ombedPageBite
            }
        }
    }

    fragment ombedPageBite on Bite {
        _id
        title
        userKeywords
        keywords
        color
        image {
            original {
                url
            }
        }
        transcription
        favorited
        playCount
        visibility
        audienceRating
        ownerObject {
            _id
            username
        }
        giphy {
            mp4
            gif
        }
        audio {
            mp3 {
                url
            }
        }
    }
`;

// Requires ID
server.get("/embed", async (req, res) => {
    res.status(404) // HTTP status 404: NotFound
        .send("Not found");
});

// Twitter iframe page
server.get("/iframe/soundbites/:id", async (req, res) => {
    res.header("Cache-Control", "public, max-age=3600, s-max-age=21600");
    // NOTE: This + UrlChanger component will allow us to do history changing urls
    const truncatedIdItems = req.query.id
        ? req.query.id.split("-")
        : req.params.id.split("-");
    const truncatedId = truncatedIdItems[truncatedIdItems.length - 1];
    await app.render(req, res, "/twitter_iframe", { id: truncatedId });
});

server.get("/embed/:id", async (req, res) => {
    res.header("Cache-Control", "public, max-age=3600, s-max-age=21600");
    // NOTE: This + UrlChanger component will allow us to do history changing urls
    const truncatedIdItems = req.query.id
        ? req.query.id.split("-")
        : req.params.id.split("-");
    const truncatedId = truncatedIdItems[truncatedIdItems.length - 1];
    await app.render(req, res, "/embed", { id: truncatedId });
});

server.get("/oembed", async (req, res) => {
    const url = req.query.url;
    const truncatedUrlItems = url.split("/");
    const truncatedIdItems = truncatedUrlItems[truncatedUrlItems.length - 1];
    const truncatedFinalItems = truncatedIdItems.split("-");
    const truncatedId = truncatedFinalItems[truncatedFinalItems.length - 1];
    // const isJson = true; TODO: implement json or xml
    const apolloClient = initializeApollo();

    const biteQuery = await apolloClient.query({
        ssr: false,
        query: GRAB_BLERP_BY_ID,
        variables: {
            id: truncatedId,
        },
    });

    const bite = biteQuery.data.web && biteQuery.data.web.biteById;
    const biteOwner =
        biteQuery.data.web &&
        biteQuery.data.web.biteById &&
        biteQuery.data.web.biteById.ownerObject;

    if (bite) {
        const biteImageUrl = bite.image
            ? bite.image.original.url
            : "https://storage.googleapis.com/blerp-public-images/branding/BlerpyLeftIbisRed.svg";
        const JSON_DATA = {
            author_url: `${currentHost}/user/${biteOwner._id}`,
            thumbnail_width: 480,
            width: 459,
            height: 400,
            thumbnail_url: biteImageUrl,
            version: "1.0",
            type: "rich",
            title: bite.title,
            provider_name: "Blerp",
            html: `<iframe width="459" height="400" src="${currentHost}/embed/${truncatedId}?feature=oembed" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
            thumbnail_height: 360,
            provider_url: `${currentHost}/`,
            author_name: biteOwner.username,
        };

        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(JSON_DATA));
    } else {
        res.status(404) // HTTP status 404: NotFound
            .send("Not found");
    }
});

server.get("/soundboard", async (req, res) => {
    res.header("Cache-Control", "public, max-age=3600, s-max-age=21600");
    return res.redirect(301, `${currentHost}/soundbites`);
});

server.get("/post", async (req, res) => {
    res.header("Cache-Control", "public, max-age=3600, s-max-age=21600");
    return res.redirect(301, `${currentHost}/blog`);
});

server.get("/postNew", async (req, res) => {
    res.header("Cache-Control", "public, max-age=3600, s-max-age=21600");
    await app.render(req, res, "/post-create", { ...req.query, ...req.params });
});

server.get("/postCreate", async (req, res) => {
    res.header("Cache-Control", "public, max-age=3600, s-max-age=21600");
    await app.render(req, res, "/post-create", { ...req.query, ...req.params });
});

server.get("/blog/:tag", async (req, res) => {
    res.header("Cache-Control", "public, max-age=3600, s-max-age=21600");
    await app.render(req, res, "/blog", {
        tag: req.query.tag ? req.query.tag : req.params.tag,
    });
});

server.get("/blog/post/:id", async (req, res) => {
    const truncatedIdItems = req.query.id
        ? req.query.id.split("-")
        : req.params.id.split("-");
    // NOTE: This + UrlChanger component will allow us to do history changing urls
    const truncatedId = truncatedIdItems[truncatedIdItems.length - 1];
    res.header("Cache-Control", "public, max-age=3600, s-max-age=21600");
    await app.render(req, res, "/post", { id: truncatedId });
});

server.get("/postUpdate/:id", async (req, res) => {
    const truncatedIdItems = req.query.id
        ? req.query.id.split("-")
        : req.params.id.split("-");
    // NOTE: This + UrlChanger component will allow us to do history changing urls
    const truncatedId = truncatedIdItems[truncatedIdItems.length - 1];
    res.header("Cache-Control", "public, max-age=3600, s-max-age=21600");
    await app.render(req, res, "/post-update", { id: truncatedId });
});

server.get("/board/:id", async (req, res) => {
    res.header("Cache-Control", "public, max-age=3600, s-max-age=21600");
    const truncatedIdItems = req.query.id
        ? req.query.id.split("-")
        : req.params.id.split("-");
    const truncatedId = truncatedIdItems[truncatedIdItems.length - 1];
    return res.redirect(301, `${currentHost}/soundboard/${truncatedId}`);
});

server.get("/soundboard/:id", async (req, res) => {
    res.header("Cache-Control", "public, max-age=3600, s-max-age=21600");
    // NOTE: This + UrlChanger component will allow us to do history changing urls
    const truncatedIdItems = req.query.id
        ? req.query.id.split("-")
        : req.params.id.split("-");
    const truncatedId = truncatedIdItems[truncatedIdItems.length - 1];
    await app.render(req, res, "/soundboard", { id: truncatedId });
});

server.get("/soundboards/:id", async (req, res) => {
    res.header("Cache-Control", "public, max-age=3600, s-max-age=21600");
    return res.redirect(
        301,
        `${currentHost}/soundboard/${
            req.query.id ? req.query.id : req.params.id
        }`,
    );
});

server.get("/category/:id", async (req, res) => {
    res.header("Cache-Control", "public, max-age=3600, s-max-age=21600");
    await app.render(req, res, "/category", { ...req.query, ...req.params });
});

server.get("/user/:username", async (req, res) => {
    res.header("Cache-Control", "public, max-age=3600, s-max-age=21600");
    await app.render(req, res, "/user", { ...req.query, ...req.params });
});

server.get("/search/:q", async (req, res) => {
    res.header("Cache-Control", "public, max-age=3600, s-max-age=21600");
    await app.render(req, res, "/search", { ...req.query, ...req.params });
});

server.get("/apps", async (req, res) => {
    res.header("Cache-Control", "public, max-age=3600, s-max-age=21600");
    await app.render(req, res, "/mobile-apps");
});

// ===================== REDIRECTS SO THAT IT'REAL =========================

server.get("/scholarship", async (req, res) => {
    res.header("Cache-Control", "public, max-age=3600, s-max-age=21600");
    return res.redirect(301, `/emerging-media-scholarship`);
});

server.get("/terms", async (req, res) => {
    res.header("Cache-Control", "public, max-age=3600, s-max-age=21600");
    return res.redirect(301, `/legal`);
});

server.get("/discord", async (req, res) => {
    res.header("Cache-Control", "public, max-age=3600, s-max-age=21600");
    return res.redirect(301, `/discord-soundboard-bot`);
});

server.get("/discord-bot", async (req, res) => {
    res.header("Cache-Control", "public, max-age=3600, s-max-age=21600");
    return res.redirect(301, `/discord-soundboard-bot`);
});

server.get("/bite", async (req, res) => {
    res.header("Cache-Control", "public, max-age=3600, s-max-age=21600");
    return res.redirect(301, `${currentHost}/`);
});

// ===================== SUPER NAV DEEPER LEVEL PAGES =========================
server.get("/twitch", async (req, res) => {
    res.header("Cache-Control", "public, max-age=3600, s-max-age=21600");
    return res.redirect(301, `${currentHost}/twitch-extension`);
});

server.get("/soundboard-products/discord", async (req, res) => {
    res.header("Cache-Control", "public, max-age=3600, s-max-age=21600");
    return res.redirect(301, `/discord-soundboard-bot`);
});

server.get("/soundboard-products/mobile-apps", async (req, res) => {
    res.header("Cache-Control", "public, max-age=3600, s-max-age=21600");
    await app.render(req, res, "/mobile-apps");
});

server.get("/soundboard-products/voice-assistants", async (req, res) => {
    res.header("Cache-Control", "public, max-age=3600, s-max-age=21600");
    await app.render(req, res, "/voice-assistants");
});

server.get("/blerps/what-is-blerp", async (req, res) => {
    res.header("Cache-Control", "public, max-age=3600, s-max-age=21600");
    await app.render(req, res, "/what-is-blerp");
});

server.get("/blerps/how-blerp-is-used", async (req, res) => {
    res.header("Cache-Control", "public, max-age=3600, s-max-age=21600");
    await app.render(req, res, "/how-blerp-is-used");
});

server.get("/blerps/suggest-ways-to-blerp", async (req, res) => {
    res.header("Cache-Control", "public, max-age=3600, s-max-age=21600");
    await app.render(req, res, "/suggest-ways-to-blerp");
});

server.get("/company/about-us", async (req, res) => {
    res.header("Cache-Control", "public, max-age=3600, s-max-age=21600");
    await app.render(req, res, "/about");
});

server.get("/company/company-profiles", async (req, res) => {
    res.header("Cache-Control", "public, max-age=3600, s-max-age=21600");
    await app.render(req, res, "/company-profiles");
});

server.get("/company/company-picks", async (req, res) => {
    res.header("Cache-Control", "public, max-age=3600, s-max-age=21600");
    await app.render(req, res, "/company-picks");
});

server.get("/contact", async (req, res) => {
    res.header("Cache-Control", "public, max-age=3600, s-max-age=21600");
    await app.render(req, res, "/support");
});

// LEGAL PAGES
server.get("/content-policy", async (req, res) => {
    res.header("Cache-Control", "public, max-age=3600, s-max-age=21600");
    await app.render(req, res, "/content-policy");
});

server.get("/privacy", async (req, res) => {
    res.header("Cache-Control", "public, max-age=3600, s-max-age=21600");
    await app.render(req, res, "/legal");
});

server.get("/privacy-policy", async (req, res) => {
    res.header("Cache-Control", "public, max-age=3600, s-max-age=21600");
    await app.render(req, res, "/legal");
});

server.get("/terms-of-service", async (req, res) => {
    res.header("Cache-Control", "public, max-age=3600, s-max-age=21600");
    await app.render(req, res, "/legal");
});

server.get("/dmca", async (req, res) => {
    res.header("Cache-Control", "public, max-age=3600, s-max-age=21600");
    await app.render(req, res, "/legal");
});

// LEGAL PAGES

server.get("/connect-with-us/contact", async (req, res) => {
    res.header("Cache-Control", "public, max-age=3600, s-max-age=21600");
    await app.render(req, res, "/support");
});

server.get("/company/podcast", async (req, res) => {
    res.header("Cache-Control", "public, max-age=3600, s-max-age=21600");
    return res.redirect(301, `${currentHost}/connect-with-us/podcast`);
});

server.get("/connect-with-us/podcast", async (req, res) => {
    res.header("Cache-Control", "public, max-age=3600, s-max-age=21600");
    await app.render(req, res, "/podcast");
});

server.get("/connect-with-us/social-media", async (req, res) => {
    res.header("Cache-Control", "public, max-age=3600, s-max-age=21600");
    await app.render(req, res, "/social-media");
});

// ===================== SUPER NAV DEEPER LEVEL PAGES END ======================
server.get("/company-profiles", async (req, res) => {
    res.header("Cache-Control", "public, max-age=3600, s-max-age=21600");
    return res.redirect(301, `${currentHost}/company/company-profiles`);
});

server.get("/contact", async (req, res) => {
    res.header("Cache-Control", "public, max-age=3600, s-max-age=21600");
    return res.redirect(301, `${currentHost}/connect-with-us/contact`);
});

server.get("/social-media", async (req, res) => {
    res.header("Cache-Control", "public, max-age=3600, s-max-age=21600");
    return res.redirect(301, `${currentHost}/connect-with-us/contact`);
});

server.get("/dmca", async (req, res) => {
    res.header("Cache-Control", "public, max-age=3600, s-max-age=21600");
    return res.redirect(301, `${currentHost}/dmca`);
});

server.get("/contact", async (req, res) => {
    res.header("Cache-Control", "public, max-age=3600, s-max-age=21600");
    return res.redirect(301, `${currentHost}/connect-with-us/contact`);
});

server.get("/privacy", async (req, res) => {
    res.header("Cache-Control", "public, max-age=3600, s-max-age=21600");
    return res.redirect(301, `${currentHost}/privacy`);
});

server.get("/podcast", async (req, res) => {
    res.header("Cache-Control", "public, max-age=3600, s-max-age=21600");
    return res.redirect(301, `${currentHost}/company/podcast`);
});

server.get("/app", async (req, res) => {
    res.header("Cache-Control", "public, max-age=3600, s-max-age=21600");
    return res.redirect(301, `${currentHost}/mobile-apps`);
});

server.get("/videogame-soundboards", async (req, res) => {
    res.header("Cache-Control", "public, max-age=3600, s-max-age=21600");
    return res.redirect(301, `${currentHost}/videogame-meme-soundboards`);
});

// === end of redirects

server.get("*", async (req, res) => {
    res.header("Cache-Control", "public, max-age=3600, s-max-age=21600");
    await handle(req, res);
});

export const serverlessFunction = async () => {
    await app.prepare();
    return server;
};

export const mainApp = async (req, res) => {
    // NOTE: Calling the function without slash causes a problem
    req.url = req.url || "/";

    await app.prepare();

    server(req, res);
};

const allExports = {
    mainApp,
    serverlessFunction,
};

export default allExports;
