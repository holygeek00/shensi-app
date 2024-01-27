# 使用官方Node.js作为基础镜像
FROM node:alpine

# 设置工作目录
WORKDIR /usr/src/app

# 复制package.json和package-lock.json（或yarn.lock）
COPY package*.json yarn.lock ./

# 安装项目依赖
RUN yarn install

# 复制项目文件到工作目录
COPY . .

# 构建应用程序（如果您的应用需要构建步骤）
RUN yarn build

# 设置环境变量
ENV PORT 3000

# 暴露端口3000
EXPOSE 3000

# 启动应用程序
CMD ["yarn", "start"]