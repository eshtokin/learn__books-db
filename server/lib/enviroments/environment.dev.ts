import { IEnvironment } from "./environment";

export const developmentEnvironment: IEnvironment = {
    mongoDbConnectionString: `mongodb://localhost/${process.env.BASE}`
}