#!/bin/bash

echo proxy="$HTTP_PROXY" > .typingsrc
npm install
typings install