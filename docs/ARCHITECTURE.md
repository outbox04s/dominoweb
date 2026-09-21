# Architecture

GitHub is the source of truth for code, migrations and specifications. Vercel runs the Next.js application. Supabase provides PostgreSQL, Auth, Storage and RLS.

## Rules
- Server-first rendering.
- Client components only for real interaction.
- CMS content must not be hard-coded.
- Database DDL is version-controlled under supabase/migrations.
- Public clients use publishable credentials only; secret/service credentials are server-only.
