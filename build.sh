#!/bin/bash

rm -fR dist
rm -fR tests/dist

tsc
packfile=`npm pack`
mv $packfile latest-package.tgz
cd tests
touch typings.json
rm -fR node_modules
rm -fR typings
npm install file:../latest-package.tgz
typings install
typings install --save file:node_modules/blend-node-library/dist/blend-node-library.d.ts
tsc
cd ..
rm latest-package.tgz

