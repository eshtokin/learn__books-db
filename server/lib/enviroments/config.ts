import * as fs from "fs"

// const paramConfig = {
//     issuer: "Igor Rosliakov",
//     subject: 'igor@sozdayka.com',
//     audience: 'http://sozdayka.com',
// }

export const userInfo = {
    nickname: 'Eshtokin',
    password: "BestOppai24!",
    collection: "book-db"
}

export const dbInfo = {
    mongoUrl: `mongodb+srv://${userInfo.nickname}:${userInfo.password}@${userInfo.collection}-lmley.mongodb.net/${userInfo.collection}?retryWrites=true&w=majority`,
    localMongoUrl: "mongodb://localhost/CRMdb"
}

export const AuthConfig = {
    privateKey: fs.readFileSync("./lib/private.key", "utf-8"),
    publicKey: fs.readFileSync("./lib/public.key", "utf-8")
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