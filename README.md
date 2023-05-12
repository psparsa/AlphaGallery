![Banner](https://github.com/psparsa/AlphaGallery/assets/57572461/aff8122b-541e-4e3c-9a87-32e75d765bf9)

<p align="center">
A minimal image uploading website built with Next.js and Starpi, styled with Tailwind CSS and tested with Jest/RTL.
</p>

## Getting started:

Hint: If you run `npm install` in the root directory of the repository, both projects' dependencies will be installed and Husky will also be enabled!

#### Server:

```bash
cd source/server
# populate the .env file
cp .env.example .env
npm run develop
```

#### Client:

```bash
cd source/client
npm run dev
```

#### 🐳 Deployment:

```bash
# populate the .env file
cp .env.example .env
docker compose up
```

<hr />

### **❗️ Note:**

After running strapi server, you have to set some permissions for guest and authenticated users.

Settings Path:
_Strapi Admin Panel > Settings > Users & Permissions plugin > Roles_

| Roles         | Allowed Actions                                    |
| ------------- | -------------------------------------------------- |
| Authenticated | Post: create<br><br>Upload: upload                 |
| Public        | Post: find, findOne<br><br>Category: find, findOne |

**Example:**

https://user-images.githubusercontent.com/57572461/228605529-4ee769b0-2279-49da-b98b-80de8b0476a1.mp4
