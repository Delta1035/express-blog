const path = require('path');
export const UPLOAD_PATH = path.resolve(__dirname,'../public/upload');
export const BASE_PATH = process.env.NODE_ENV === "development" ? "src" : "dist"
