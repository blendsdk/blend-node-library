#!/bin/bash

semver=$1
mode=${2:dev}


if [ -n "$semver" ]; then
    rm -fR dist
    tsc
    npm version $semver --no-git-tag-version
    version=`node -e "console.log(require('./package.json').version);"`
    if [ "$mode" == "prod" ]; then
        git add .
        message="Savepoint before tagging to version $version"
        git commit -a -m"$message"
        git tag v$version
        git push origin master
        git push origin --tags
    fi
    npm publish
    git tag
else
    echo "Usage: ./publish.js <semver>"
fi