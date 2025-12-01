#!/usr/bin/env sh
set -e

echo "Waiting for database to be ready..."
MAX_RETRIES=30
RETRY=0

while [ $RETRY -lt $MAX_RETRIES ]
do
  if nc -z "$(echo $DATABASE_URL | sed -E 's/^.*@([^:]+):([0-9]+).*$/\1/')" $(echo $DATABASE_URL | sed -E 's/^.*@[^:]+:([0-9]+).*$/\1/'); then
    echo "Database host is reachable"
    break
  fi
  RETRY=$((RETRY+1))
  echo "Database not ready yet — retrying ($RETRY/$MAX_RETRIES)..."
  sleep 1
done

if [ $RETRY -ge $MAX_RETRIES ]; then
  echo "Database did not become ready in time"
  exit 1
fi

echo "Running migrations..."
npx prisma migrate deploy || true

echo "Seeding database (if empty)..."
node prisma/seed.js || true

echo "Starting app..."
exec npm start
