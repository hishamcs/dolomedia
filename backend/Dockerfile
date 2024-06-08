FROM python:3.8-slim

ENV PYTHONUNBUFFERED 1

WORKDIR /backend

COPY requirements.txt requirements.txt

RUN pip install -r requirements.txt

COPY . /backend/