install-deps:
	cd app && npm i
serve:
	cd app && npm run serve
build:
	cd app && npm run build

check: lint test

test: test-unit test-e2e

test-unit:
	cd app && npm run test:unit

test-e2e:
	cd app && npm run test:e2e

lint:
	cd app && npm run lint

lint-fix:
	cd app && npm run lint:fix
