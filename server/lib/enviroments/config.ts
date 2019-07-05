import * as fs from "fs"

// const paramConfig = {
//     issuer: "Igor Rosliakov",
//     subject: 'igor@sozdayka.com',
//     audience: 'http://sozdayka.com',
// }

export const AuthConfig = {
    privateKey: fs.readFileSync("./lib/private.key", "utf-8"),
    // signOptions: {
        //         issuer: paramConfig.issuer,
        //         subject: paramConfig.subject,
        //         audience: paramConfig.audience,
        //         expiresIn: "24h",
        //         algorithm: "RS256"
        //     },
        //     verifyOptions: {
        //         issuer: paramConfig.issuer,
        //         subject: paramConfig.subject,
        //         audience: paramConfig.audience,
        //         expiresIn: "24h",
        //         algorithm: ["RS256"]
        //     }
}