export const environment = {
  production: true,
  BACKEND_API_BASE_URL: process.env?.['BACKEND_API_BASE_URL'],
  NGROK_API_BASE_URL: process.env?.['NGROK_API_BASE_URL'],
  SECRET_KEY: process.env?.['SECRET_KEY']
};
