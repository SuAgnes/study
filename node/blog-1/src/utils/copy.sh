#!/bin/sh

cd /Users/rachel/Documents/my-github/study/node/blog-1/logs
cp access.log $(date +%Y-%m-%d-%H).access.log
echo "" > access.log