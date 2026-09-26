from datetime import datetime
from typing import Any
from pydantic import BaseModel, EmailStr


class ProfileOut(BaseModel):
    id: str
    name: str
    email: EmailStr
    avatar_url: str | None = None
    university: str | None = None
    program: str | None = None
    year: int | None = None
    preferences: dict[str, Any] = {}
    created_at: datetime
    updated_at: datetime


class ProfileUpdate(BaseModel):
    name: str | None = None
    university: str | None = None
    program: str | None = None
    year: int | None = None
    preferences: dict[str, Any] | None = None


class MeOut(BaseModel):
    id: str
    email: EmailStr
    profile: ProfileOut