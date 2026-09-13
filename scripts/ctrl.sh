#!/bin/bash
declare -A dcfiles=(
    ["api"]="backend/docker-compose-api.yml"
    ["client"]="frontend/docker-compose-client.yml"
)

if [[ -z $1 ]]; then
    echo "Usage: $0 <start|stop|down|build|restart|logs> <api|client|all>"
    echo "       $0 test api"
    exit 1
fi

if [[ $1 == "test" ]]; then
    if [[ $2 == "api" ]]; then
        docker exec mapofvienna-api python manage.py test threads
    else
        echo "Tests are only available for the api service."
        exit 1
    fi
    exit $?
fi

if [[ $1 == "start" ]]; then
    cmd="up -d"
else
    cmd=$1
fi

if [[ $2 == "all" ]]; then
    # api first (creates the shared network), then client
    docker compose -f ${dcfiles["api"]} $cmd
    docker compose -f ${dcfiles["client"]} $cmd
elif [[ $2 == "api" || $2 == "client" ]]; then
    docker compose -f ${dcfiles[$2]} $cmd
else
    echo "Usage: $0 <start|stop|down|build|restart|logs> <api|client|all>"
    echo "       $0 test api"
    exit 1
fi
