install:
	npm install

start:
	npm run dev

docker-dev:
	docker-compose -f docker-compose.dev.yml up --build

import-data:
	docker exec walledhd-backend-dev-api node _data/seeder.js -i

delete-data:
	docker exec walledhd-backend-dev-api node _data/seeder.js -d

reset-data:
	make delete-data
	make import-data