import {jwtVerify, SignJWT} from "jose";

export function generateApiKey(length = 32) {
    // 定义可能出现在API Key中的字符
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let apiKey = '';
    const charactersLength = characters.length;

    // 生成指定长度的随机字符串
    for (let i = 0; i < length; i++) {
        apiKey += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return apiKey;
}

// 构建token
export async function generateToken(payload, secretKey, options) {
    return await new SignJWT(payload).setProtectedHeader({ alg: "HS256", typ: "JWT"})
        .setIssuedAt()
        .setIssuer('urn:shensiai:issuer')
        .setAudience('urn:shensiai:audience')
        .setExpirationTime('1h')
        .sign(new TextEncoder().encode(process.env.SECRET_KEY));
}

// 验证token
export function verifyToken(token, secretKey) {
    return jwtVerify(token, secretKey);
}
