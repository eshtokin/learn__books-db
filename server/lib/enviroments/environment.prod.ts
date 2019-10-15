import { IEnvironment } from "./environment"
import { keys } from "./../keys/config"

export const productionEnvironment:IEnvironment={
    mongoDbConnectionString: `mongodb+srv://${keys.userInfo.nickname}:${keys.userInfo.password}@${keys.userInfo.collection}-lmley.mongodb.net/${keys.userInfo.collection}?retryWrites=true&w=majority`,
}