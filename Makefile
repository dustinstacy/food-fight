.PHONY: start-all


CONCURRENTLY_ARGS := --names "FRONTEND,CONTRACTS,BACKEND" -c "bgBlue.bold,bgMagenta.bold,bgGreen.bold"
FRONTEND_CMD := "npm run dev"
CONTRACTS_CMD := "npm:dev --prefix ../food-fight-contracts"
BACKEND_CMD := "npm:dev --prefix ../food-fight-backend"


# Start dev environment for all services
start-all:
	@echo "Starting all services..."
	npx concurrently $(CONCURRENTLY_ARGS) $(FRONTEND_CMD) $(CONTRACTS_CMD) $(BACKEND_CMD)