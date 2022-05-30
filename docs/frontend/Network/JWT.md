# JWT 基础

Author: Connor Zhao

## 什么是 JWT？

JSON Web Token（JWT）是一个开放标准（[RFC 7519](https://datatracker.ietf.org/doc/html/rfc7519)），它定义了一种紧凑的、独立的、URL 安全的编码方式，用于在各系统之间传输 JSON 对象格式的信息。该信息是具有数字签名的，可以被接收端验证和信任。

JWT 包含三个部分：`Header`、`Payload`、`Signature`。将三个部分用 `.` 连接就形成了一个标准的 JWT 令牌。

格式为： `${Header}.${Payload}.${Signature}`

可以在[官网](https://jwt.io/)进行 debug 与获取 JWT 签名验证的第三方库列表。

## Header

Header 通常由俩部分组成，token 类型和签名算法名称。

例如：

```js
{
  'alg': "HS256",
  'typ': "JWT",
}
```

## Payload

Payload 通常由三部分组成，registered，public，private：

- registered：注册声明，包含 token 的一些基础属性。
    - iss: JWT 签发者
    - sub: JWT 所面向的用户
    - aud: 接收 JWT 的一方
    - exp: JWT 的过期时间，这个过期时间必须要大于签发时间
    - nbf: 定义在什么时间之前，该 JWT 都是不可用的.
    - iat: JWT 的签发时间
    - jti: JWT 的唯一身份标识，主要用来作为一次性 token，从而回避重放攻击。
- public & private：用户自行定义，可以存放用户公开信息，用户授权范围之类，但不要存放例如密码之类的敏感信息。

例如：

```js
{
	iat: 1628139780;
	exp: 1628146980;
	name: "connor.zhao";
	phone: "17860785522";
}
```

tips：JWT 中，Payload 部分只通过 Base64URL，可以认为这部分是完全明文的，所以不建议存放敏感信息。JWT 的职责的保证数据不被篡改，但不会负责数据的加密传输。

## Signature

Signature 是对 Header 和 payload 的数字签名，用以确保信息的可靠性：

常见的签名算法有：

- HS256(HMAC-SHA256) ：HMAC（Hash-based Message Authentication Code）基于加盐 Hash。
- RS256(RSA-SHA256) ：RSA（Rivest-Shamir-Adleman Scheme） 基于大素数的分解因子。
- ES256(ECDSA-SHA256)：ECDSA（Elliptic Curve Digital Signature Algorithm） 基于椭圆曲线密码。

签名算法选择建议：

- HS256 适合数据传输等场景，因为对称秘钥所以持有秘钥的双方是可以做出相同的签名，故需要保证双方系统对外应该是等价的，不然会出现安全问题。
- RS256 与 ES256 同属非对称加密，适用于分布式系统和对第三方提供，使用私钥加密并开放公钥，其他系统无法签署同样的签名，但是所有人都可以验证签名的真伪性。
- RSA 与 ECDSA 具体选择可以参考如下参数（单核单线程下测试运算时间）：

  |           | Verify | Sign    |
  | --------- | ------ | ------- |
  | RSA-1024  | 12 us  | 511 us  |
  | RSA-2048  | 30 us  | 3270 us |
  | ECDSA-192 | 590 us | 490 us  |

  即除特殊情况下，RSA 都是优于 ECDSA 的，因为数字签名普遍形式为，单次签发多次校验，ECDSA 在校验签名时显得不太友好。

## 简单实现

以下代码是在 js 中对 JWT 标准的粗略实现：

```js
import md5 from "js-md5";
import { Base64 } from "js-base64";
import { encrypt, decrypt } from "./rsa";

const Header = Base64.encodeURI(JSON.stringify({ alg: "RS256", typ: "JWT" }));

export const sign = (info) => {
	const payload = Base64.encodeURI(JSON.stringify(info));
	const signature = encrypt(md5.hex(`${Header}.${payload}`));
	const jwt = `${Header}.${payload}.${signature}`;
	return jwt;
};

export const verify = (token) => {
	const [Header, payload, signature] = token.split(".");
	const original = decrypt(signature);
	return original === md5.hex(`${Header}.${payload}`);
};

export const getPayload = (token) => {
	return JSON.parse(Base64.decode(token.split(".")[1]));
};
```

## JWT 可以做什么？

- Authentication & Authorization （认证与授权）

这是使用 JWT 的最常见场景。一旦用户登录，后续每个请求都将包含 JWT，允许用户访问该令牌允许的路由、服务和资源。例如群脉的一些 API 会在 HTTP 请求的 header 中，添加一条 `x-access-token` 用于存放 token 信息。

- Information Exchange（信息交换）

对于安全的在各方之间传输信息而言，JSON Web Tokens 无疑是一种很好的方式，可以通过验证签名来验证信息是否被篡改。

## 参考资料

- [Introduction to JSON Web Tokens](https://jwt.io/introduction)
