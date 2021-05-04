#!/usr/bin/env bash
docker build -t todo-app-react .
docker run --init -p 3000:3000 -p 3001:3001 -it todo-app-react