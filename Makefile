.PHONY: enter-container
enter-container:
	@echo "Building and entering the dev container..."
	./devcontainer/enter_dev_container.sh

# Run/Deploy the app in DEV mode
.PHONY: run-dev
run-dev:
	npx expo start

# Run/Deploy the app
.PHONY: run
run:
	npx expo start --no-dev --minify
