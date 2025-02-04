@echo off
set CMD=%1

if "%CMD%"=="docker:rm-volume" (
    rmdir /S /Q docker\db\volume
) else if "%CMD%"=="docker-dev:up" (
    docker-compose -f docker-dev-compose.yaml --env-file .env.local up --force-recreate
) else if "%CMD%"=="docker-dev:down" (
    docker-compose -f docker-dev-compose.yaml down
) else if "%CMD%"=="docker-dev:start" (
    docker-compose -f docker-dev-compose.yaml start
) else if "%CMD%"=="docker-dev:stop" (
    docker-compose -f docker-dev-compose.yaml stop
) else if "%CMD%"=="docker-build:image" (
    docker-compose -f docker-build-compose.yaml --env-file .env.build build --no-cache
) else if "%CMD%"=="docker-build:up" (
    docker-compose -f docker-build-compose.yaml --env-file .env.build up --force-recreate
) else if "%CMD%"=="docker-build:down" (
    docker-compose -f docker-build-compose.yaml down
) else if "%CMD%"=="docker-build:start" (
    docker-compose -f docker-build-compose.yaml start
) else if "%CMD%"=="docker-build:stop" (
    docker-compose -f docker-build-compose.yaml stop
) else (
    echo Commande inconnue. Utiliser :
    echo - docker:rm-volume
    echo - docker-dev:up, docker-dev:down, docker-dev:start, docker-dev:stop
    echo - docker-build:image, docker-build:up, docker-build:down, docker-build:start, docker-build:stop
)
