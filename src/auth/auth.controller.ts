import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { InternalTokenGuard } from "../guards/internal-token.guard";
import { ResolveAuthDto } from "./dto/resolve-auth.dto";
import { AuthService } from "./auth.service";


@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('cadastro')
    async cadastro(
        @Body() body: {
            id: number;
            password:string;
        }
    ) {
        return this.authService.cadastro(
            body.id,
            body.password
        );
    }

    @Post('resolve')
    @UseGuards(InternalTokenGuard)
    async resolve(@Body() body: ResolveAuthDto,){
        return this.authService.resolve(
            body.id,
            body.key,
        );
    }

    @Post('consulta')
    async consulta(@Body() body: { id: number; key: string }) {
        return this.authService.resolve(body.id, body.key);
    }
}