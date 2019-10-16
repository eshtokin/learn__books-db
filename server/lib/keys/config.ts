import * as fs from "fs"

export const keys = {
    privateKey: fs.readFileSync("./lib/keys/private.key", "utf-8"),
    publicKey: fs.readFileSync("./lib/keys/public.key", "utf-8"),
    userInfo: {
        nickname: 'Eshtokin',
        password: "BestOppai24!",
        collection: "book-db"
    }
}