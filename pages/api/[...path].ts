import type { NextApiRequest, NextApiResponse } from 'next';
import httpProxy from "http-proxy";
import { baseURL } from '../../api-client/axios';

const proxy = httpProxy.createProxyServer();
export const config = {
    api: {
        bodyParser: {
            sizeLimit: false,
        },
    },
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const API_URL = baseURL?.slice(0, baseURL?.length - 4)
    return new Promise((resolved) => {
        req.headers.cookie = "";
        proxy.web(req, res, {
            target: API_URL,
            changeOrigin: true,
            selfHandleResponse: false,
        })
        proxy.once("proxyRes", () => {
            resolved(true)
        })
    })
}