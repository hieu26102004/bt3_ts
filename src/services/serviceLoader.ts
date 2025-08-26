// Tự động chọn service phù hợp theo môi trường
export function getService() {
    const env = process.env.NODE_ENV || 'development';
    let service: any;
    if (env === 'development_mongo') {
        console.log('[serviceLoader] Using MongoCRUDService');
        service = require('./MongoCRUDService');
        if (service.default) service = service.default;
    } else {
        if (env !== 'development') {
            console.warn(`[serviceLoader] Unknown NODE_ENV: ${env}, defaulting to CRUDService (MySQL)`);
        } else {
            console.log('[serviceLoader] Using CRUDService (MySQL)');
        }
        service = require('./CRUDService');
        if (service.default) service = service.default;
    }
    return service;
}
