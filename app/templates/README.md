# <%= name %>

<%= description %>

## Get Started

Get started developing...

```shell
# install deps
npm install

# cpoy .env.example
cp .env.example .env

# run locally
npm start

# run tests
npm run test

# run in development mode (nodemon)
npm run dev

# run in production mode (pm2)
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
* Open you're browser to [http://localhost:9000](http://localhost:9000)
* Invoke the `/products` endpoint 
  ```shell
  curl -d '{ "productName": "test product", "description": "test product description", "price": 30000 }' -H "Content-Type: application/json" -X POST http://localhost:9000/products
  ```
