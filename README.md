# NextFree project

Requirements: docker, docker-compose, node >= 10

See boot instructions in `./boot`

### For Staff

Development server can be started with

`cd ./staff && PORT=8085 npm start`

### For Owner

Development server can be started with

`cd ./owner && PORT=8084 npm start`

### For Customer

Development server can be started with

`cd ./customer && PORT=8083 npm start`

### For Admin

Development server can be started with

`cd ./admin && PORT=8082 npm start`

### docker-compose.yml example

```yaml
version: '3'

services:

  www:
    build: ./www/env
    ports:
      - 8086:80
    networks:
      - backend
    volumes:
      - './www:/var/www'

  api:
    build: ./api/env
    ports:
      - 8081:80
    networks:
      - backend
    volumes:
      - './api:/var/www'

  db:
    image: mongo:4
    environment:
      - MONGO_INITDB_DATABASE=nextfree
    networks:
      - backend
    volumes:
      - '.persistency/mongo/data:/data/db'

  dbadmin:
    image: mongo-express:latest
    environment:
      - ME_CONFIG_MONGODB_SERVER=db
      - ME_CONFIG_OPTIONS_EDITORTHEME=ambiance
    ports:
      - 8079:8081
    networks:
      - backend

networks:
  backend:
    driver: "bridge"
```
