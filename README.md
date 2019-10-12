# nanokey
🌲A beautiful, functional, stateless key-value garden 🌸🌹 come stay awhile...🌲
This API is fully stateless and uses the filesystem to do extremely fast and efficient key-value lookups in the internal database service. The design of this system is for quick-access cached values (like a token revocation list). This uses Nestjs singletons to maintain a consistent access pool to the shared resource. With performance being a consideraiton here, there is still a distribution orchestrator which can make `n` replicas of the service (incubating).

## Documentation
Start this app and go to `localhost:6900/_docs` and you'll see the whole api!

## Installation

```bash
$ yarn install
```

## Running the app
### Running in docker (preferred)
```bash
$ docker-compose up
```

### Running locally
```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```

