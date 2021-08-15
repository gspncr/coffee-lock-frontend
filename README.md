# Coffee Lock (frontend)

This is a project to provide an interface to the key holder for a coffee subscription service. Backend maintains the key and checks rules, frontend is for elegance and is an optional component.

### Run locally

Install dependencies `npm i`

Run with yarn `BROWSER=none yarn start`

This will run on localhost:3000

### Build

Build and host on AWS S3 `npm run build && aws s3 sync build/ s3://coffee.gspncr.com`

## Frontend benefits

1. slightly more elegant view of the backend state
2. remember your username (via cookie)

## Configured rules (backend)

1. the lock is assumed for 30 minutes at a time
2. the lock is not granted is after the fifth redemption of the day
3. the day is set with the first redemption of the day, else the day is the last access
4. storage is managed in a flat file in data/database.json
5. request the lock at `/redeemDrink/<username>`
