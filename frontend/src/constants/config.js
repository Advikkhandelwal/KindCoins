// For iOS Simulator: http://localhost:5001/api
// For Android Emulator: http://10.0.2.2:5001/api
// For Physical Device: http://192.168.128.2:5001/api (Replace with your LAN IP)
// For Production: Replace with your deployed backend URL (e.g., https://kindcoins-backend.onrender.com/api)

const DEV_URL = 'http://localhost:5001/api';
const PROD_URL = ''; // Add your production URL here

export const API_BASE_URL = PROD_URL || DEV_URL;
