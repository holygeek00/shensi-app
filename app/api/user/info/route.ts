import {execSql} from "../../lib/db";
import {jwtVerify} from "jose";

export async function GET(request: Request) {

    // 解析请求参数
    const url = new URL(request.url);
    const apiKey = url.searchParams.get('api_key');
    const token = request.headers.get('token');

    // 验证token
    if (!token) {
        return new Response(JSON.stringify({
            code: 401,
            message: 'Unauthorized',
            data: null
        }), {
            status: 401
        })
    }

    try{
        let result = await jwtVerify(token, new TextEncoder().encode(process.env.SECRET_KEY))
    }catch (e){
        return new Response(JSON.stringify({code: 401, message: '验证过期，请重新登录', data: {}}), {status: 401})
    }

    if (!apiKey){
        return new Response(JSON.stringify({
            code: 500,
            message: 'api_key is required',
            data: null
        }), {status: 500});
    }else {
        const result = await execSql('SELECT * FROM users WHERE api_key = $1', [apiKey]);

        if (result.rowCount === 0) {
            return new Response(JSON.stringify({
                code: 404,
                message: 'User not found',
                data: null
            }), {status: 404});
        }
        delete result.rows[0].is_admin
        delete result.rows[0].password
        return new Response(JSON.stringify({
            code: 200,
            message: 'Success',
            data: result.rows[0]
        }), {status: 200});
    }
}