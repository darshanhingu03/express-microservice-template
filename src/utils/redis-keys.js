import redis from './config/redis';
import { env } from '../../config/env.js';
const { SERVICE } = env;

export function buildCacheKey(tenantId, scope, id) {
  return `tenant:${tenantId}:${scope}:${id}`;
}

export async function cachePage(tenantId, pageId, payload) {
  const key = buildCacheKey(tenantId, SERVICE, pageId);
  await redis.set(key, JSON.stringify(payload), 'EX', 60 * 5); // 5m TTL
}

export async function getCachedPage(tenantId, pageId) {
  const key = buildCacheKey(tenantId, SERVICE, pageId);
  const data = await redis.get(key);
  return data ? JSON.parse(data) : null;
}
