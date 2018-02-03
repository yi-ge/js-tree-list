#!/bin/bash
if [ $1 ]; then
  git add .
  git commit -m $1
  git push origin master
  git push gitee master
else
  git add .
  git commit -m "update - `date '+%Y-%m-%d %T'`"
  git push origin master
  git push gitee master
fi

