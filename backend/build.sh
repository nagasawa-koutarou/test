#!/usr/bin/env bash
set -o errexit  # エラーが出たらスクリプト終了

pip install -r requirements.txt
python manage.py migrate
python manage.py collectstatic --noinput
