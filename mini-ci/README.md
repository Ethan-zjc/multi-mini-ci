# mini-ci

## 名称

小程序自动化上传工具（微信、qq、百度、快手、抖音、支付宝、uc、夸克）

## 安装

```javascript
npm i -g mini-ci
```

## 快速开始

```javascript
// 查询工具是否安装成功
mini-ci --version

// 初始化配置文件
mini-ci init
```

## 项目结构示例

```
.
├── weixin
|   ├── components
|   ├── pages
|   └── utils
├── qq
|   ├── components
|   ├── pages
|   └── utils
├── dist
|   ├── weixin_appid.png
|   └── qq_appid.png
├── key
|   ├── private.wx********.key
|   └── private.ks********.key
|
├── ci.config.js
|
└── README.md
```

## 配置文件说明

### 微信

| 属性      | 类型   | 必填 | 说明                                                                                                    |
| --------- | ------ | ---- | ------------------------------------------------------------------------------------------------------- |
| appName   | string | 是   | 小程序项目名称                                                                                          |
| appId     | string | 是   | 小程序项目 appId                                                                                        |
| keyPath   | string | 是   | 当前项目 key 文件相对路径 [key 获取](https://developers.weixin.qq.com/miniprogram/dev/devtools/ci.html) |
| entry     | string | 是   | 当前项目相对路径入口                                                                                    |
| platform  | string | 是   | 当前项目平台                                                                                            |
| projectId | string | 是   | 当前项目唯一标识，自定义，例如小程序 1（projectId: 1）、小程序 2（projectId: 2)                         |

### 示例

```javascript
// ci.config.js
{
    appName: "微信小程序",
    appId: "wx**********",
    keyPath: "/key/private.wx********.key",
    entry: "/weixin",
    platform: "weixin",
    projectId: 1
}
```

### QQ

| 属性       | 类型    | 必填 | 说明                                                                                                                                                                            |
| ---------- | ------- | ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| appName    | string  | 是   | 小程序项目名称                                                                                                                                                                  |
| appId      | string  | 是   | 小程序项目 appId                                                                                                                                                                |
| appToken   | string  | 是   | 当前项目 token,用于小程序构建过程中的身份验证 ([打开管理端](https://q.qq.com/#/) -> 登录 -> 进入设置页面 -> 进入开发设置页 -> 点击生成 appToken -> 管理员扫码 -> 得到 appToken) |
| entry      | string  | 是   | 当前项目相对路径入口                                                                                                                                                            |
| platform   | string  | 是   | 当前项目平台                                                                                                                                                                    |
| experience | Boolean | 否   | 是否设置为体验版本，默认 true                                                                                                                                                   |
| firstPage  | string  | 否   | 首页路径                                                                                                                                                                        |
| projectId  | string  | 是   | 当前项目唯一标识，自定义，例如小程序 1（projectId: 1）、小程序 2（projectId: 2)                                                                                                 |

### 示例

```javascript
// ci.config.js
{
    appName: "QQ小程序",
    appId: "********",
    entry: "/qq",
    platform: "qq",
    appToken: "******",
    projectId: 2
}
```

### 注意事项

- QQ 构建依赖 docker 环境

### 百度

| 属性           | 类型   | 必填 | 说明                                                                                                                                          |
| -------------- | ------ | ---- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| appName        | string | 是   | 小程序项目名称                                                                                                                                |
| appId          | string | 是   | 小程序项目 appId                                                                                                                              |
| appToken       | string | 是   | 当前项目 token,用于小程序发布权限的登录密钥（在百度智能小程序开发者工具（版本高于 2.4.1）中登录后，可通过“菜单 -> 关于 -> 复制登录密钥”获取。 |
| entry          | string | 是   | 当前项目相对路径入口                                                                                                                          |
| platform       | string | 是   | 当前项目平台                                                                                                                                  |
| minSwanVersion | string | 否   | 构建时最低基础库版本号，默认 3.310.35                                                                                                         |
| projectId      | string | 是   | 当前项目唯一标识，自定义，例如小程序 1（projectId: 1）、小程序 2（projectId: 2)                                                               |

### 示例

```javascript
// ci.config.js
{
    appName: "百度小程序",
    appId: "********",
    entry: "/baidu",
    platform: "baidu",
    appToken: "****",
    projectId: 3
}
```

### 快手

| 属性      | 类型   | 必填 | 说明                                                                                                     |
| --------- | ------ | ---- | -------------------------------------------------------------------------------------------------------- |
| appName   | string | 是   | 小程序项目名称                                                                                           |
| appId     | string | 是   | 小程序项目 appId                                                                                         |
| keyPath   | string | 是   | 当前项目 key 文件相对路径 [key 获取](https://mp.kuaishou.com/) -> 开发 -> 开发者设置 -> 下载代码上传密钥 |
| entry     | string | 是   | 当前项目相对路径入口                                                                                     |
| platform  | string | 是   | 当前项目平台                                                                                             |
| projectId | string | 是   | 当前项目唯一标识，自定义，例如小程序 1（projectId: 1）、小程序 2（projectId: 2)                          |

### 示例

```javascript
// ci.config.js
{
    appName: "快手小程序",
    appId: "ks*********",
    keyPath: "/key/private.ks********.key",
    entry: "/kuaishou",
    platform: "kuaishou",
    projectId: 4
}
```

### 支付宝

| 属性      | 类型   | 必填 | 说明                                                                                            |
| --------- | ------ | ---- | ----------------------------------------------------------------------------------------------- |
| appName   | string | 是   | 小程序项目名称                                                                                  |
| appId     | string | 是   | 小程序项目 appId                                                                                |
| keyPath   | string | 是   | 当前项目 key 文件相对路径 [key 获取](https://opendocs.alipay.com/mini/02q29w)                   |
| appToken  | string | 是   | 当前项目 token,用于小程序发布权限的登录密钥 [key 获取](https://opendocs.alipay.com/mini/02q29w) |
| entry     | string | 是   | 当前项目相对路径入口                                                                            |
| platform  | string | 是   | 当前项目平台 （支付宝、夸克、UC 等）                                                            |
| source    | string | 是   | 来源平台,支付宝系小程序,该值固定为 alipay                                                       |
| projectId | string | 是   | 当前项目唯一标识，自定义，例如小程序 1（projectId: 1）、小程序 2（projectId: 2)                 |

### key&token 获取说明

#### 1、生成

```
// 进入项目
cd alipay

// 生成配置文件
minidev login
```

#### 2、路径

```
MacOS/Linux： ~/.minidev/config.json
Windows C:\User\你的用户名\.minidev\config.json
```

#### 3、生成 config.json 内容

```
{
    "alipay": {
        "authentication": {
            "privateKey": "*********",
            "toolId": "********"
        }
    }
}
```

#### 4、转换

```
toolId属性值对应配置文件中appToken；
key文件夹下新建private.alipay**********.key文件, privateKey属性值填入新建文件中即可
```

### 示例

```javascript
// ci.config.js
{
    appName: "支付宝小程序",
    appId: "**********",
    keyPath: "/key/private.alipay************.key",
    appToken: "************",
    source: "alipay",
    entry: "/alipay",
    platform: "alipay",
    projectId: 5
}
```

### 抖音

| 属性      | 类型   | 必填 | 说明                                                                                           |
| --------- | ------ | ---- | ---------------------------------------------------------------------------------------------- |
| appName   | string | 是   | 小程序项目名称                                                                                 |
| appId     | string | 是   | 小程序项目 appId                                                                               |
| appToken  | string | 是   | 当前项目管理端账号密码 base64 加密后字符串: base64.encode({email: **\*\***, password: 123456}) |
| entry     | string | 是   | 当前项目相对路径入口                                                                           |
| platform  | string | 是   | 当前项目平台                                                                                   |
| projectId | string | 是   | 当前项目唯一标识，自定义，例如小程序 1（projectId: 1）、小程序 2（projectId: 2)                |

### 示例

```javascript
// ci.config.js
{
    appName: "抖音小程序",
    appId: "tt************",
    appToken: "*************",
    keyPath: "/key",
    entry: "/douyin",
    platform: "douyin",
    projectId: 6
}
```

## build

### 用法

```javascript
mini-ci build [options]
```

### 参数

1. `--project`, `-p` (类型: number | string, 默认值: 1):
   指定项目唯一标识。与配置文件 ci.config.js 中 projectId 映射

2. `--ver`, `-v` (类型: string, 默认值: 1.0.0):
   指定上传版本号。如果未指定，将使用默认版本。

3. `--environment`, `-e` (类型: string, 默认值: stag):
   指定项目环境。如果未指定，将使用默认环境。

### 示例

```javascript
mini-ci build --project wx --ver 1.0.0 --environment stag
或
mini-ci build -p wx -v 1.0.0 -e stag
```

### 输出

- 构建产生的体验二维码输出在根目录 ci_dist 文件夹中
- 二维码图片格式 png，名称为项目唯一标识 projectId

### 注意事项

- mini-ci build 不携带任何参数，将执行本地选择构建模式，携带参数便于持续部署
- 抖音平台和阿里平台，上传版本号存在限制，构建时，若传入版本号需符合平台规范，若不传入默认使用平台版本号


## LICENSE

[MIT](LICENSE)
