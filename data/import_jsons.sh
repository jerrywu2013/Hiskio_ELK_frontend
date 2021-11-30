#!/bin/bash

for jfile in $(ls *.json); do
  curl -XPOST http://localhost:9200/elk2021_news/_doc/ \
    -H "Content-Type: application/json" \
    -d @${jfile}
done
