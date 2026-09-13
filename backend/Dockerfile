FROM python:3.11

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

COPY requirements.txt /app/

WORKDIR /app

RUN pip install --upgrade pip
RUN pip install -r requirements.txt
