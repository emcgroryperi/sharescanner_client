#!/bin/sh
ROOT_DIR=./dist
# Replace env vars in files served by NGINX
for file in $ROOT_DIR/*.*
do
  sed -i 's|VUE_APP_BACKEND_URL_PLACEHOLDER|'${VUE_APP_BACKEND_URL}'|g' $file
  # Your other variables here...
done