SERVER_SERVICE=server

.PHONY: bash
bash: ## gets inside a container
	docker-compose exec server sh

.PHONY: start
start: down up logs ## start the project

.PHONY: up
up: ## up all containers
	docker-compose up -d --remove-orphans

.PHONY: logs
logs:
	docker-compose logs -f server

.PHONY: stop
stop: ## stop all containers
	docker-compose stop

.PHONY: down
down: ## down all containers
	docker-compose down

.PHONY: build
build: ## docker-compose build
	docker-compose build

.PHONY: ps
ps: ## status from all containers
	docker-compose ps

.PHONY: logsf
logsf: ## gets server log
	docker-compose logs -f ${SERVER_SERVICE}
