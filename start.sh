#!/bin/sh

echo "Install `pnpm` if required -> "
pnpm -v || npm install -g pnpm@7.14

case $NODE_ENV in
    development )
        echo "Starting $NODE_ENV Server -> "
        pnpm run start:dev
        ;;
    * )
        echo "Starting $NODE_ENV Server -> "
        pnpm run start:prod
        ;;
esac
