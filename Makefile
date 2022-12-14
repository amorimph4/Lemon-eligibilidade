CONTAINER_NAME=nestjs_api_dev

up:
	docker-compose up dev -d

down:
	docker-compose down

.PHONY:test
test:
	make up
	docker exec -it $(CONTAINER_NAME) npm run test

.PHONY:coverage
coverage:
	make up
	docker exec -it $(CONTAINER_NAME) npm run test:cov

logs:
	docker-compose logs --follow

bash:
	make up
	docker exec -it $(CONTAINER_NAME) sh

build:
	docker-compose build
