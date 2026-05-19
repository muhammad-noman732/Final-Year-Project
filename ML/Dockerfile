FROM python:3.11-slim AS base

FROM base AS deps
WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libpq-dev \
    gcc \
    && rm -rf /var/lib/apt/lists/*

RUN python -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

COPY ML/requirements.txt .
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

FROM base AS builder
WORKDIR /app

COPY --from=deps /opt/venv /opt/venv
COPY ML/ .
RUN mkdir -p models

FROM base AS runner

RUN apt-get update && apt-get install -y --no-install-recommends \
    libpq5 \
    curl \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

ENV PATH="/opt/venv/bin:$PATH"
ENV NODE_ENV=production
ENV PORT=8000
ENV HOSTNAME=0.0.0.0
ENV HOME=/home/fastapi

RUN mkdir -p /home/fastapi
RUN groupadd --system --gid 1001 fastapi
RUN useradd --system --uid 1001 --gid fastapi --home /home/fastapi --shell /bin/false fastapi

COPY --from=builder /opt/venv /opt/venv
COPY --from=builder --chown=fastapi:fastapi /app /app

RUN chown -R fastapi:fastapi /app && chown -R fastapi:fastapi /home/fastapi

USER fastapi

EXPOSE 8000

HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
    CMD curl -f http://127.0.0.1:8000/health || exit 1

CMD ["python", "ml_server.py", "--port", "8000"]
