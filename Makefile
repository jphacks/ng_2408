.PHONY: run/frontend

code:
	code websocket-sample.code-workspace

run/frontend:
	cd frontend && npm install
	cd frontend && npm run dev
	
run/backend:
	cd backend && npm install
	cd backend && npm run dev
