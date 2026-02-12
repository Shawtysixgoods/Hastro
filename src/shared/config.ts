export const config = {
  port: Number(process.env.PORT) || 3000,
  isDev: process.env.NODE_ENV !== "production"
};
