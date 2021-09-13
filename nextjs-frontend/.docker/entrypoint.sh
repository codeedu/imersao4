#!/bin/bash

if [ ! -f ".env.local" ]; then
    cp .env.local.example .env.local
fi

npm install

npm run dev