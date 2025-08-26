// Tự động chọn service phù hợp theo môi trường
export function getService() {
    const env = process.env.NODE_ENV || 'development';
    console.log(`Current NODE_ENV: ${env}`);
    let service: any;
    if (env === 'development_mongo') {
        service = require('./MongoCRUDService');
        if (service.default) service = service.default;
    } else {
        service = require('./CRUDService');
        if (service.default) service = service.default;
    }
    return service;
}
