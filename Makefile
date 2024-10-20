default: help

.PHONY: help  ## Show this help message
help:
	@echo "Available commands:"
	@grep -E '^\.PHONY: [a-zA-Z_-]+.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ": | ## "}; {printf "  make %-15s %s\n", $$2, $$3}'

.PHONY: enter-container  ## Build and enter the dev container
enter-container:
	@echo "Building and entering the dev container..."
	./devcontainer/enter_dev_container.sh

.PHONY: run-dev  ## Run/Deploy the app in DEV mode
run-dev:
	npx expo start

.PHONY: run  ## Run/Deploy the app
run:
	npx expo start --no-dev --minify

.PHONY: lint  ## Lint the code
lint:
	npm run lint

.PHONY: format  ## Format the code
format:
	npm run format

.PHONY: test  ## Run the tests
test:
	npm run test

.PHONY: ci  ## Run the CI "pipeline"
ci: lint test
	@echo "CI pipeline completed successfully"

.PHONY: deplopy  ## Deploy the app
deploy:
	npx expo run:android --variant release