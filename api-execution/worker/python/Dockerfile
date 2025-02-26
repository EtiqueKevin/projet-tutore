FROM node:22-alpine

ENV VIRTUAL_ENV=/usr/src/worker/venv

RUN apk add --no-cache \
    ca-certificates \
    bash \
    python3 \
    py3-pip

WORKDIR /usr/src/worker

COPY requirements.txt .

RUN python3 -m venv $VIRTUAL_ENV && \
    $VIRTUAL_ENV/bin/pip install --no-cache-dir -r requirements.txt

ENV PATH="$VIRTUAL_ENV/bin:$PATH"
