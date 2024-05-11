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
    if (code === Number(smsCaptcha)) {

        const pool = createPool({
            connectionString: process.env.DATABASE_URL,
        });

        // 创建api_keys数据表
        //     let apiKeyRes = await pool.sql`
        //     CREATE TABLE IF NOT EXISTS api_keys (
        //         id SERIAL PRIMARY KEY,
        //         api_key VARCHAR(255) UNIQUE
        // );
        // `;

        // console.log(apiKeyRes)

        // 创建用户数据表
        //     let r = await pool.sql`
        //     CREATE TABLE IF NOT EXISTS users (
        //         id SERIAL PRIMARY KEY,
        //         phone_number VARCHAR(255) NOT NULL,
        //         email VARCHAR(255) UNIQUE,
        //         password VARCHAR(255),
        //         api_key VARCHAR(255) NOT NULL,
        //         quota FLOAT DEFAULT 1000,
        //         is_active BOOLEAN DEFAULT true,
        //         is_admin BOOLEAN DEFAULT false,
        //         created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        //         FOREIGN KEY (api_key) REFERENCES api_keys(api_key),
        //         UNIQUE(phone_number, api_key)
        // );
        // `;

        // console.log(r)

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
            .setExpirationTime('1d')
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