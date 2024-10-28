import { APP_GUARD } from "@nestjs/core";
import { JwtAuthGuard } from "src/modules/auth/jwt-auth.guard";

export const jwtAuthGuardObject = {
    provide: APP_GUARD,
    useClass: JwtAuthGuard,
}