![AlphaGallery](https://github.com/psparsa/AlphaGallery/assets/57572461/dc2bba21-c6e7-4bad-92fa-ca915d042a81)

<p align="center">
A minimal image uploading website built with Next.js and Starpi, styled with Tailwind CSS and tested with Jest/RTL.
</p>

## 👼 First thing first:

#### Initialize GIT hooks:

```bash
npm install
npm run prepare
```

## 👷 Development:

#### Populate `.env` files:

```bash
cp .env.example .env

# And for strapi server:
cd source/server
cp .env.example .env
```

#### Build development container:

```bash
docker compose -f ./docker-compose.dev.yml up
```

## 📦 Deployment:

#### Populate `.env` files:

```bash
cp .env.example .env

# And for strapi server:
cd source/server
cp .env.example .env
```

#### Build production containers:

```bash
docker compose up
```
