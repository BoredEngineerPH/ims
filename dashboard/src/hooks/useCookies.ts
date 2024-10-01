import nookies, { setCookie } from 'nookies';

export function set_cookie(key: string, value: string, expires_in: number, path?: string, ctx?: any){
    setCookie((ctx ? ctx : null), key, value, {
        maxAge: expires_in,
        path: (path ? path : '/'),
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict',
    });
}

export function get_cookie(key: string){

}
