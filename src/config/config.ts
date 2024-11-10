process.loadEnvFile();

export const config = {
    PORT: process.env.PORT || 3001,
    STAGE_API: process.env.STAGE_API || "v1",
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_SECRET_MSV_USER: process.env.JWT_SECRET_MSV_USER,
}