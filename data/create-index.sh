#!/bin/bash

curl -XPUT http://localhost:9200/elk2021_news \
  -H "Content-Type: application/json" \
  -d'{
  "mappings": {
    "properties": {
      "title": {
        "type": "text",
        "fields": {
          "ik_max_word": {
            "type": "text",
            "analyzer": "ik_max_word"
          },
          "keyword": {
            "type": "keyword"
          }
        }
      },
      "content": {
        "type": "text",
        "analyzer": "ik_max_word"
      },
      "posted_at": {
        "type": "date"
      },
      "images": {
        "type": "nested",
        "properties": {
          "url": {
            "type": "keyword"
          },
          "description": {
            "type": "text",
            "fields": {
              "ik_max_word": {
                "type": "text",
                "analyzer": "ik_max_word"
              },
              "keyword": {
                "type": "keyword"
              }
            }
          }
        }
      },
      "source": {
        "type": "object",
        "properties": {
          "url": {
            "type": "keyword"
          },
          "site": {
            "type": "keyword"
          }
        }
      }
    }
  }
}'
