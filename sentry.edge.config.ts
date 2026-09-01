// Edge Sentry initialization disabled to avoid bundling heavy
// `@sentry/nextjs` code into Next.js middleware/Edge runtime.
// If you need Sentry for Edge functions, re-enable carefully
// and ensure the package and config are compatible with the
// Edge runtime and Vercel limits.

// noop export to keep file present but avoid importing Sentry
export {};
