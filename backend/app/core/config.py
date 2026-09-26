from functools import lru_cache

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """
    Central configuration for the NoteGPT backend.

    Values are loaded from environment variables and backend/.env.
    """

    # Application
    environment: str = Field(
        default="development",
        validation_alias="ENVIRONMENT",
    )

    # Frontend
    frontend_url: str = Field(
        default="http://localhost:3000",
        validation_alias="FRONTEND_URL",
    )

    # Backend
    backend_host: str = Field(
        default="127.0.0.1",
        validation_alias="BACKEND_HOST",
    )

    backend_port: int = Field(
        default=8000,
        validation_alias="BACKEND_PORT",
    )

    # Supabase
    supabase_url: str = Field(
        default="",
        validation_alias="SUPABASE_URL",
    )

    supabase_service_role_key: str = Field(
        default="",
        validation_alias="SUPABASE_SERVICE_ROLE_KEY",
    )

    # AI
    ai_api_key: str = Field(
        default="",
        validation_alias="AI_API_KEY",
    )

    # Web research
    research_api_key: str = Field(
        default="",
        validation_alias="RESEARCH_API_KEY",
    )

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
        extra="ignore",
    )


@lru_cache
def get_settings() -> Settings:
    """
    Return a cached Settings instance.

    Caching prevents repeatedly parsing the environment
    variables during the lifetime of the application.
    """
    return Settings()