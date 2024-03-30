install:
	npm install

start:
	npm run dev

docker-dev:
	docker-compose -f docker-compose.dev.yml up --build