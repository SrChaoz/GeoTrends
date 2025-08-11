#!/bin/bash
# Start script para Render.com
cd service
exec gunicorn --bind 0.0.0.0:$PORT --workers 2 --timeout 120 app:app
