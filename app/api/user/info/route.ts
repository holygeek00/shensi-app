import {execSql} from "../../lib/db";

export async function GET(request: Request) {

    // 解析请求参数
    const url = new URL(request.url);
    const apiKey = url.searchParams.get('api_key');

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