import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

export * from './schema';

export function createDb(databaseURL: string) {
    const sql = neon(databaseURL);
 
    return drizzle({client: sql})
}