import { productionEnvironment } from "./environment.prod";
import { developmentEnvironment } from "./environment.dev";

export interface IEnvironment {
    mongoDbConnectionString: string;
}
export const environment = () => {
  switch (process.env.NODE_ENV) {
    case "development":
      return developmentEnvironment;
    case "production":
      return productionEnvironment;
    default:
      return developmentEnvironment;
  }
}