export const HOST = window.location.host;
export const PROTOCOL = window.location.protocol;
export function getSubdomainURL(subdomain) {
    return PROTOCOL + "//" + subdomain + "." + HOST
}

