#!/bin/bash

set -e

PACKAGE_JSON=$1

if [ -z "$PACKAGE_JSON" ]; then
  echo "Usage: $0 <package-json-path>"
  exit 1
fi

VERSION=$(jq -r .version "$PACKAGE_JSON")
NAME=$(jq -r .name "$PACKAGE_JSON")

if ! [[ "$VERSION" =~ ^[0-9]+\.[0-9]+\.[0-9]+ ]]; then
  echo "Invalid Version: $VERSION"
  exit 1
fi

echo "Checking if $PACKAGE_JSON should be released..."
echo "NEW VERSION: $VERSION"

REMOTE_VERSION=$(npm view "$NAME" version 2>/dev/null || echo "")

echo "REMOTE VERSION: $REMOTE_VERSION"

if [ "$VERSION" = "$REMOTE_VERSION" ] || { [[ "$REMOTE_VERSION" =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]] && [ "$(printf '%s\n%s' "$REMOTE_VERSION" "$VERSION" | sort -V | tail -n1)" != "$VERSION" ]; }; then
  echo "Version already published, skipping..."
  echo true > .skip-release
  exit 0
fi

echo false > .skip-release