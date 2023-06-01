// config
if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({
        path: "config/.env",
    });
}

const DEV_CONFIGS = {
    SERVER_BASE_URL: "http://localhost:8080",
    FRONTEND_BASE_URL: "http://localhost:5173",
    ALLOWED_ORIGINS: ["http://localhost:5173","http://localhost:5174","http://localhost:3000"],
    SELLER_ACTIVATION_URL_TEMPLATE: "http://localhost:5173/seller/activation/${activationToken}",
    USER_ACTIVATION_URL_TEMPLATE: "http://localhost:5173/activation/${activationToken}",
    BYPASS_EMAIL_VERIFICATION: "TRUE",
    FILE_UPLOAD_ROOT_FOLDER: 'uploads'

}


const PROD_CONFIGS = {
    SERVER_BASE_URL: "https://shop-zone-dev.onrender.com",
    FRONTEND_BASE_URL: "https://shopzone-dev.web.app",
    ALLOWED_ORIGINS: ["https://shopzone-dev.web.app","https://shop-zone-seller.web.app"],
    SELLER_ACTIVATION_URL_TEMPLATE: "https://shop-zone-seller.web.app/seller/activation/${activationToken}",
    USER_ACTIVATION_URL_TEMPLATE: "https://shopzone-dev.web.app/activation/${activationToken}",
    BYPASS_EMAIL_VERIFICATION: "TRUE",
    FILE_UPLOAD_ROOT_FOLDER: 'uploads'
}



const AppConfigs = () => {
    switch (process.env.ENVIRONMENT) {
        case "DEV": {
            return DEV_CONFIGS

        }
        case "PRODUCTION": {
            return PROD_CONFIGS
        }
        default: {
            return DEV_CONFIGS
        }
    }
}

module.exports = { AppConfigs }