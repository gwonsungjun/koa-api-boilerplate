# <%= name %>

<%= description %>

## Get Started

Get started developing...

```shell
# docker build
docker build . -t api:latest

# copy docker-compose.example.yml
cp docker-compose.example.yml docker-compose.yml

# copy .env.example
cp .env.example .env

# docker run
docker-compose up

# run tests
npm run test

# run in development mode (nodemon)
npm run dev

# run in production mode
npm run prod

# lint
npm run lint
```

## Install Dependencies

Install all package dependencies (one time operation)

```shell
npm install
```

## Try It

- Open you're browser to [http://localhost:9000](http://localhost:9000)
- Invoke the `/products` endpoint

### API

- Health-check

```shell
curl --location --request GET 'localhost:9000/healthcheck'
```

- GET

```shell
curl --location --request GET 'localhost:9000/products'
```

- POST

```shell
curl --location --request POST 'localhost:9000/products' \
--header 'Content-Type: application/json' \
--data-raw '{
    "productName": "test",
    "description": "test",
    "price": 1000,
    "isDisplay": false
}'
```

- PATCH

```shell
curl --location --request PATCH 'localhost:9000/products/1' \
--header 'Content-Type: application/json' \
--data-raw '{
    "productName": "test2",
    "description": "test2",
    "price": 2000,
    "isDisplay": false
}'
```

- DELETE

```shell
curl --location --request DELETE 'localhost:9000/products/1'
```
