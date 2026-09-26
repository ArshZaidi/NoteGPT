from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import get_settings


@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Application startup/shutdown lifecycle.

    Database connections and other resources can be initialized here
    later when required.
    """

    print("NoteGPT backend starting...")

    yield

    print("NoteGPT backend shutting down...")


settings = get_settings()

app = FastAPI(
    title="NoteGPT API",
    description=(
        "Backend API for NoteGPT — a personal AI-powered "
        "academic workspace."
    ),
    version="0.1.0",
    lifespan=lifespan,
)

# --------------------------------------------------
# CORS
# --------------------------------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        settings.frontend_url,
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# --------------------------------------------------
# Root
# --------------------------------------------------

@app.get("/")
async def root():
    return {
        "name": "NoteGPT API",
        "version": "0.1.0",
        "status": "online",
    }


# --------------------------------------------------
# Health
# --------------------------------------------------

@app.get("/api/health")
async def health_check():
    return {
        "status": "healthy",
        "service": "notegpt-backend",
        "environment": settings.environment,
    }