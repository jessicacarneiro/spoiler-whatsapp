.PHONY: build install integration-tests run tests unit-tests

build:
	npm run build

install:
	npm install

integration-tests:
	npm run test:integration

run:
	npm run dev

tests:
	npm test

unit-tests:
	npm run test:unit
