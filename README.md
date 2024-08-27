This is a homework project of The Odin Project.
I need to build a file uploader web app where authenticated user can CRUD folders and upload files.
Requirements: https://www.theodinproject.com/lessons/nodejs-file-uploader.

Database is on local.
File storage is on supabase.

How to deploy?
1.git colne the repo.

2.install dependencies.

3.Create project and storage in supabase.
My bucket name is 'files'. If you change bucket name, you should change it in js files accordingly.

4.set env variables.
DATABASE_URL
//this is connected to database to store user, folder, file information.

SUPABASE_URL
SUPABASE_ANON_KEY
//these two are used to store and download files from storage. you can get them in supabase website.

5. Prisma generate and migrate

6.Use node to run app.js
