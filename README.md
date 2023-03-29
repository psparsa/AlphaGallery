# Alpha Gallery

A minimalistic image uploading website built with Next.js and Starpi, styled with Tailwind CSS and tested with Jest/RTL.

<hr />

## How to start dev server:

Hint: If you run `npm install` in the root directory of the repository, both projects' dependencies will be installed and Husky will also be enabled!

#### Server:

```bash
cd source/server
#Initalizing .env file
cp .env.example .env
npm run develop
```

#### Client:

```bash
cd source/client
npm run dev
```

<hr />

### **Note:**

After running strapi server, you have to set some permissions for guest and authenticated users.

Settings Path:
_Strapi Admin Panel > Settings > Users & Permissions plugin > Roles_

| Roles         | Allowed Actions                                    |
| ------------- | -------------------------------------------------- |
| Authenticated | Post: create<br><br>Upload: upload                 |
| Public        | Post: find, findOne<br><br>Category: find, findOne |

**Example:**

https://user-images.githubusercontent.com/57572461/228605529-4ee769b0-2279-49da-b98b-80de8b0476a1.mp4

<hr />

## TODO:

- Implement E2E test with Cypress
- Dockerize server
- Configure the docker compose
