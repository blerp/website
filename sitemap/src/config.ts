export const MONGO_URL = "ENTER SECRET HERE";

const config = {
  production: {
    bucket: "sitemap-production",
    hostName: "https://blerp.com",
    mediaHost: "https://media.blerp.com",
    rootSitemap: "blerp-main-sitemap.xml",
    sitemapBaseName: "blerp-audio-sounds-sitemap"
  },
  staging: {
    bucket: "sitemap-staging", // bucket of google where the sitemaps will be uplaoded to
    hostName: "https://web-test.blerp.live", // domain of the main website using the sitemap
    mediaHost: "https://ffmpeg-stage.blerp.live", // domain of ffmpeg server hosting the sitemap
    rootSitemap: "blerp-staging-sitemap.xml", // name the root site
    sitemapBaseName: "blerp-audio-sounds-sitemap" // base name of all the sitemaps besides root
  }
};

export const projectConfig = {
  ...config.production
};
