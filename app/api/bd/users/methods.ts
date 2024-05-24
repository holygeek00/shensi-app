import {connect} from "../../lib/db";
import bcrypt from 'bcrypt'

// 注册新用户
export async function register(username, password, email) {
    const client = connect();

    try {
        // 检查用户名和电子邮件是否已经存在
        const userCheckQuery = 'SELECT * FROM backend_users WHERE username = $1 OR email = $2';
        const userCheckResult = await client.query(userCheckQuery, [username, email]);

        if (userCheckResult.rows.length > 0) {
            throw new Error('Username or email already exists');
        }

        // 哈希密码
        const passwordHash = await bcrypt.hash(password, 10);

        // 插入新用户
        const insertQuery = `
            INSERT INTO backend_users (username, password_hash, email)
            VALUES ($1, $2, $3) RETURNING user_id, username, email, created_at, updated_at
        `;
        const insertValues = [username, passwordHash, email];
        const result = await client.query(insertQuery, insertValues);

        // 返回新用户的信息
        return result.rows[0];
    } catch (error) {
        console.error('Error registering user:', error.message);
        throw error;
    }
}

// 登录用户
export async function login(username, password) {
    const client = connect();

    try {
        // 查询用户
        const userQuery = 'SELECT * FROM backend_users WHERE username = $1';
        const userResult = await client.query(userQuery, [username]);

        if (userResult.rows.length === 0) {
            throw new Error('Invalid username or password');
        }

        const user = userResult.rows[0];

        // 验证密码
        const passwordMatch = await bcrypt.compare(password, user.password_hash);

        if (!passwordMatch) {
            throw new Error('Invalid username or password');
        }

        return user;
    }catch (e){

    }
}