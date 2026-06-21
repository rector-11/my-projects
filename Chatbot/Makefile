BACKEND_DIR := backend
FRONTEND_DIR := frontend/frontend
FRONTEND_URL := http://localhost:3000
FRONTEND_PORT := 3000
BACKEND_PORT := 8000

.PHONY: backend frontend dev open stop

backend:
	cd $(BACKEND_DIR) && ENABLE_SHUTDOWN=true python3 -m uvicorn agent:app --reload

frontend:
	(sleep 2 && open $(FRONTEND_URL)) &
	cd $(FRONTEND_DIR) && npm start

dev:
	$(MAKE) backend &
	$(MAKE) frontend

open:
	open $(FRONTEND_URL)

stop:
	-lsof -ti tcp:$(FRONTEND_PORT) | xargs kill
	-lsof -ti tcp:$(BACKEND_PORT) | xargs kill
