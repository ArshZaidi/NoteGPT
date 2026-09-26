from supabase import Client, create_client
from app.core.config import get_settings

_settings = get_settings()

# Anon client — respects RLS. Used with a user's JWT for user-scoped reads.
anon_client: Client = create_client(
    _settings.supabase_url,
    _settings.supabase_anon_key,
)

# Service client — bypasses RLS. Use ONLY in trusted server code.
service_client: Client = create_client(
    _settings.supabase_url,
    _settings.supabase_service_role_key,
)


def user_client(access_token: str) -> Client:
    """Return a client that authenticates as the given user (RLS enforced)."""
    client = create_client(_settings.supabase_url, _settings.supabase_anon_key)
    client.postgrest.auth(access_token)
    return client