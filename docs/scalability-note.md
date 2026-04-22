# Scalability Note

## Current Readiness
- Modular architecture with separated auth, tasks, middlewares, and config enables independent scaling of features.
- API versioning (`/api/v1`) supports non-breaking evolution.
- Security middleware (rate limiting, sanitization, helmet) protects at gateway level.

## Horizontal Scaling Path
1. Put API behind a load balancer (Nginx or cloud LB) and run multiple Node instances.
2. Move to managed MongoDB with proper indexes on `email`, `owner`, and `createdAt`.
3. Add Redis for:
   - Caching heavy reads (`GET /tasks` for admin dashboards).
   - Token deny-list for secure logout in distributed deployments.

## Service Decomposition (Future)
- Split into microservices only when traffic justifies complexity:
  - `auth-service` for identity and token lifecycle.
  - `task-service` for task domain.
- Keep shared concerns in API gateway: auth verification, rate limiting, logging, tracing.
