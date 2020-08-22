#!/bin/bash

if [ "$1" == "clean" ]
then
	rm -rf deploy/package.json
	rm -rf dist/
elif [ "$1" == "run" ]
then
	sudo docker container run --name web -d -p 1500:1500 web
elif [ "$1" == "deploy" ]
then
	mkdir -p dist/dist/

	npm run-script build

	cp package.json deploy/package.json
	cp deploy/* dist/

	cd dist/dist/
	ln -s ../.next .next
	cd ..
	npm install --production
elif [ "$1" == "stop" ]
then
	sudo docker container kill web
	sudo docker container rm web
elif [ "$1" == "install" ]
then
	#Assume Debian 10, cloned repository

	#install node14
	curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
	sudo apt-get install -y nodejs

	#install yarn
	# curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
	# echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
	# sudo apt update && sudo apt install yarn

	sudo npm install
else
	mkdir -p dist/dist/

	npm run-script build

	cp package.json deploy/package.json
	cp deploy/* dist/

	cd dist/dist/
	ln -s ../.next .next
	cd ..
	npm install
	sudo docker build -t web .
fi

