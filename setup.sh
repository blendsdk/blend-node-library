#!/bin/bash

echo "Settin Proxy"
echo proxy="$HTTP_PROXY" > .typingsrc
echo "Installin NPM packages"
npm install
echo "Installing Typings"
typings install