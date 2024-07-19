### Client Gateway

This is the entry point between our clients and our microservices. It receives requests and routes them accordingly to provide a response.

### Dev

1. Clone repository.
2. Install dependencies
3. Create `.env` file based on `.env.template`.
4. Run NATS server

```
docker run -d --name nats-main -p 4222: 4222 -p 6222: 6222 -p 8222: 8222 nats
```

5. Run the required microservices depending on the need.
6. Run with `npm run start:dev` or `yarn start:dev`

### Prod

Run command

```
docker build -f Dockerfile.prod -t client-gateway .
```
