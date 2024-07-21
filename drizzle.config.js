/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
      url: 'postgresql://ai-interview-mocker_owner:8MaxpuLl7QzF@ep-tight-cherry-a5tzxd3x.us-east-2.aws.neon.tech/ai-interview-mocker?sslmode=require',
    }
  };
  