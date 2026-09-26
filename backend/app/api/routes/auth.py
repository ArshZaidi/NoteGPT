from fastapi import APIRouter, Depends, HTTPException, status
from supabase import Client

from app.api.deps import CurrentUser, get_current_user, get_user_supabase
from app.schemas.auth import MeOut, ProfileOut, ProfileUpdate

router = APIRouter(prefix="/auth", tags=["auth"])


@router.get("/me", response_model=MeOut)
async def get_me(
    user: CurrentUser = Depends(get_current_user),
    db: Client = Depends(get_user_supabase),
) -> MeOut:
    res = db.table("profiles").select("*").eq("id", user.id).maybe_single().execute()
    if not res.data:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Profile not found",
        )
    profile = ProfileOut(**res.data)
    return MeOut(id=user.id, email=user.email, profile=profile)


@router.patch("/me", response_model=ProfileOut)
async def update_me(
    patch: ProfileUpdate,
    user: CurrentUser = Depends(get_current_user),
    db: Client = Depends(get_user_supabase),
) -> ProfileOut:
    update_data = patch.model_dump(exclude_none=True)
    if not update_data:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No fields to update",
        )

    res = (
        db.table("profiles")
        .update(update_data)
        .eq("id", user.id)
        .execute()
    )
    if not res.data:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Profile not found",
        )
    return ProfileOut(**res.data[0])