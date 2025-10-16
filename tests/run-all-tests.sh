rm "../tmp/*.pow"

docker compose run --remove-orphans php php /justnocaptcha/tests/tests-php.php
docker compose run --remove-orphans nodejs node /justnocaptcha/tests/tests-node.js
docker compose run --remove-orphans bun bun /justnocaptcha/tests/tests-node.js
docker compose run --remove-orphans bun bun /justnocaptcha/tests/tests-ts.ts
docker compose run --remove-orphans -w /justnocaptcha/tests golang /usr/local/go/bin/go run tests-go.go

docker compose run --remove-orphans php php /justnocaptcha/tests/tests-php-cross.php
docker compose run --remove-orphans nodejs node /justnocaptcha/tests/tests-node-cross.js
docker compose run --remove-orphans bun bun /justnocaptcha/tests/tests-node-cross.js
docker compose run --remove-orphans bun bun /justnocaptcha/tests/tests-ts-cross.ts
docker compose run --remove-orphans -w /justnocaptcha/tests golang /usr/local/go/bin/go run tests-go-cross.go

docker compose run --remove-orphans playwright bash /justnocaptcha/tests/playwright-tests.sh