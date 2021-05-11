sample script to create migration;

NODE_ENV=dev BETTER_SERVICE_DEV_DATABASE_URL=postgresql://postgres@127.0.0.1:5432/better-product db-migrate create usertable --sql-file



