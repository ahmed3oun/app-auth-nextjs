import '@/drizzle/envConfig';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
    schema: './src/drizzle/schema.ts',
    driver: 'pglite',
    out: './migrations',
    dbCredentials: {
        url: process.env.POSTGRES_URL!,
    },
    dialect: 'postgresql'
});
