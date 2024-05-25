import {kv} from "@vercel/kv";
import {generateApiKey} from "./tools";
import {createPool} from "@vercel/postgres";
import {SignJWT} from "jose";

const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Max-Age": "86400"
}

export async function OPTIONS(request: Request) {
    return new Response(null, {
        status: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
            "Access-Control-Max-Age": "86400"
        }
    })
}

export async function POST(request: Request) {

    const {phoneNumber, smsCaptcha} = await request.json();

    let code = await kv.get(phoneNumber);
    if (code === Number(smsCaptcha) || code === smsCaptcha) {

        const pool = createPool({
            connectionString: process.env.DATABASE_URL,
        });

        // 查询当前用户是否已经注册
        let userRes = await pool.sql`
        SELECT * FROM users WHERE phone_number = ${phoneNumber}
        `;
        let token = await new SignJWT({
            phoneNumber: phoneNumber,
        }).setProtectedHeader({ alg: "HS256", typ: "JWT"})
            .setIssuedAt()
            .setIssuer('urn:shensiai:issuer')
            .setAudience('urn:shensiai:audience')
            .setExpirationTime('30d')
            .sign(new TextEncoder().encode(process.env.SECRET_KEY));
        if (userRes.rowCount === 0) {
            let key = "sk-" + generateApiKey()

            // 写入数据都数据库中
            let apiKeysRes = await pool.sql`
            INSERT INTO api_keys (api_key)
            VALUES (${key})
            `;
            let userRes = await pool.sql`
        INSERT INTO users (phone_number, api_key)
        VALUES (${phoneNumber}, ${key})
        `;
            console.log(userRes)
        }

        // 查询用户余额
        let data = await pool.sql`
        SELECT * FROM users WHERE phone_number = ${phoneNumber}
        `;

        // 返回登录成功信息
        return new Response(JSON.stringify({
            code: 200,
            body: {
                code: 200,
                message: "登录成功",
                data: {
                    phoneNumber: phoneNumber,
                    key: data.rows[0].api_key,
                    token: token,
                    quota: data.rows[0].quota,
                    time: new Date().getTime().toString()
                }
            }
        }), {
            status: 200,
            headers: headers
        })
    } else if (code === null) {
        return new Response(JSON.stringify({
            code: 500,
            body: {
                code: 500,
                message: "验证码过期"
            }
        }), {
            status: 500,
            headers
        })

    } else {
        return new Response(JSON.stringify({
            code: 400,
            body: {
                code: 400,
                message: "验证码错误"
            }
        }), {
            status: 400,
            headers
        })
    }
}