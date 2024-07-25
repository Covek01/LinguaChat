import { ConfigModuleOptions } from "@nestjs/config";

export const configFile: ConfigModuleOptions = {
    envFilePath: ".env",
    isGlobal: true
}