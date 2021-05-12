module.exports = {
  reactStrictMode: true,
  env: {
    IPFS: process.env.IPFS === "true" ? "true" : "false",
    COMMIT_SHA:
      process.env.VERCEL_GITHUB_COMMIT_SHA ||
      process.env.GITHUB_SHA ||
      "master",
    BLOCKNATIVE_KEY: "d83998fd-9c10-4dda-8f69-39e41b6e5f52",
    WEB3_PROVIDER_HTTPS:
      "https://mainnet.infura.io/v3/8763dd60f7d24aac89e892522f7dfa0a",
  },
};
