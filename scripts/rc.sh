#!/bin/bash

set -e

PACKAGE_JSON=$1

if [ -z "$PACKAGE_JSON" ]; then
  echo "Usage: $0 <package-json-path>"
  exit 1
fi

VERSION=$(jq -r .version "$PACKAGE_JSON")

RC_VERSION=$(npm view @eduzz/ui-layout versions --json | jq -r '.[]' | grep "4.3.0-rc" | sort -V | tail -1 | awk -F'-rc.' '{print $1"-rc."($2+1)}')

if [ -z "$RC_VERSION" ]; then
  RC_VERSION="${VERSION}-rc.0"
fi

jq --arg version "$RC_VERSION" '.version = $version' "$PACKAGE_JSON" > temp.json && mv temp.json "$PACKAGE_JSON"

echo "Updated version to: $RC_VERSION"