import { ConfigModuleOptions } from "@nestjs/config";

export const configFile: ConfigModuleOptions = {
    envFilePath: "environment-variables.env"
}