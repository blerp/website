We use ts-node to run files https://github.com/TypeStrong/ts-node

# Steps to update sitemap

Plug the correct mongoDB in the config.ts
mongodb://username:password@ipaddress:27017/blerpdb

make sure you are in the right google bucket set in config.ts
run `yarn save` to save the files locally | This will run against the db and pull all the content and also create a sitemap in the `../static` folder
run `yarn upload` to upload the files to the correct google bucket | This will run against the db and pull all the content

