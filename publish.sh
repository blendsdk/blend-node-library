#!/bin/bash

semver=$1
message=$2

if [ -n "$semver" ]; then
    rm -fR dist
    tsc
    npm version $semver --no-git-tag-version
    version=`node -e "console.log(require('./package.json').version);"`
    #git add .
    #if [ -z "$message" ]; then
    #    message="Savepoint before tagging to version $version"
    #fi
    #git commit -a -m"$message"
    #git tag v$version
    #git push origin master
    #git push origin --tags
    npm publish
    #git tag
else
    echo "Usage: ./publish.js <semver>"
fi