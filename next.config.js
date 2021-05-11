module.exports = {
  reactStrictMode: true,
  env: {
    IPFS: process.env.IPFS === "true" ? "true" : "false",
    COMMIT_SHA:
      process.env.VERCEL_GITHUB_COMMIT_SHA ||
      process.env.GITHUB_SHA ||
      "master",
    BLOCKNATIVE_KEY: "5e6298d7-6c07-4571-87a1-e11b2fb6d6ce",
  },
};
