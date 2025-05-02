#!/usr/bin/env bash
set -o errexit  # エラーが出たらスクリプト終了

pip install -r requirements.txt
cd backend
python manage.py migrate