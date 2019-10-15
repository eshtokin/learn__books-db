import * as fs from "fs"

// export const userInfo = {
//     nickname: 'Eshtokin',
//     password: "BestOppai24!",
//     collection: "book-db"
// }

// export const dbInfo = {
//     mongoUrl: `mongodb+srv://${userInfo.nickname}:${userInfo.password}@${userInfo.collection}-lmley.mongodb.net/${userInfo.collection}?retryWrites=true&w=majority`,
//     localMongoUrl: "mongodb://localhost/CRMdb"
// }

export const keys = {
    privateKey: fs.readFileSync("./lib/keys/private.key", "utf-8"),
    publicKey: fs.readFileSync("./lib/keys/public.key", "utf-8"),
    userInfo: {
        nickname: 'Eshtokin',
        password: "BestOppai24!",
        collection: "book-db"
    }
}