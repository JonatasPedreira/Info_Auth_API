import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { InternalTokenGuard } from "../guards/internal-token.guard";
import { ResolveAuthDto } from "./dto/resolve-auth.dto";
import { AuthService } from "./auth.service";
import { ApiTags, ApiBody, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Auth')
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

    @ApiBearerAuth()
    @Post('resolve')
    @UseGuards(InternalTokenGuard)
    @ApiOperation({
        summary: 'Resolve uma credencial'
    })
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                id: {
                    type: 'number',
                    example: 99
                },
                key: {
                    type: 'string',
                    example: 'minha-chave'
                }
            }
        }
    })
    @ApiResponse({
        status: 200,
        description: 'Autorização concedida'
    })
    @ApiResponse({
        status: 401,
        description: 'Key inválida ou ID não encontrado'
    })
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