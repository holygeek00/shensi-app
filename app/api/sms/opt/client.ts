import { kv, createClient } from "@vercel/kv";

import Dysmsapi20170525, * as $Dysmsapi20170525 from '@alicloud/dysmsapi20170525';
import OpenApi, * as $OpenApi from '@alicloud/openapi-client';
import Util, * as $Util from '@alicloud/tea-util';
import * as $tea from '@alicloud/tea-typescript';


export default class SMSClient {

    /**
     * 使用AK&SK初始化账号Client
     * @return Client
     * @throws Exception
     */
    static createClient(): Dysmsapi20170525 {
        // 工程代码泄露可能会导致 AccessKey 泄露，并威胁账号下所有资源的安全性。以下代码示例仅供参考。
        // 建议使用更安全的 STS 方式，更多鉴权访问方式请参见：https://help.aliyun.com/document_detail/378664.html。
        let config = new $OpenApi.Config({
            // 必填，请确保代码运行环境设置了环境变量 ALIBABA_CLOUD_ACCESS_KEY_ID。
            accessKeyId: process.env['ALIBABA_ACCESS_KEY_ID'],
            // 必填，请确保代码运行环境设置了环境变量 ALIBABA_CLOUD_ACCESS_KEY_SECRET。
            accessKeySecret: process.env['ALIBABA_ACCESS_KEY_SECRET'],
        });
        // Endpoint 请参考 https://api.aliyun.com/product/Dysmsapi
        config.endpoint = `dysmsapi.aliyuncs.com`;
        return new Dysmsapi20170525(config);
    }

    static async sendMessageCode(phoneNumber: string): Promise<any> {
        let client = SMSClient.createClient();
        // 生成随机4位验证码
        let code = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
        let sendSmsRequest = new $Dysmsapi20170525.SendSmsRequest({
            phoneNumbers: phoneNumber,
            signName: "南昌深斯科技",
            templateCode: "SMS_295210044",
            templateParam: `{\"code\":\"${code}\"}`,
        });
        console.log("验证码", phoneNumber,code)
        let runtime = new $Util.RuntimeOptions({});
        let result = await client.sendSmsWithOptions(sendSmsRequest, runtime);
        const { statusCode, headers, body } = result
        if (statusCode === 200 && body.code === 'OK') {
            const kv = createClient({
                url: process.env.KV_REST_API_URL,
                token: process.env.KV_REST_API_TOKEN,
            });
            let result = await kv.set(phoneNumber, code, {
                ex: 86400, // 设置过期时间，单位为秒
            });
            console.log(result);
            return {
                status: 200,
                body: {
                    code: 200,
                    message: "短信发送成功",
                    data: {}
                }
            }
        } else {
            return {
                status: 500,
                body: body
            }
        }
    } catch(error) {
        return {
            status: error.statusCode,
            body: error
        }
    }
}