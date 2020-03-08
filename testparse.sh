#!/bin/sh

./node_modules/.bin/jscodeshift -t proto-transform.js --extensions=ts --parser=ts $1 --print --dry