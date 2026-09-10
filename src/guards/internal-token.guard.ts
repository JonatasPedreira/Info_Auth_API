import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class InternalTokenGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        
        const authorization = request.headers.authorization;

        if(!authorization) {
            throw new UnauthorizedException(
                'Token de Autorização não informado',
            );
        }

        const [type, token] = authorization.split(' ');

        
        if(type != 'Bearer') {  // Se o token não tiver dá erro
            throw new UnauthorizedException(
                'Tipo de autorização inválido',
            );
        }

        if(token != process.env.INTERNAL_TOKEN) { //Se o token for diferente do informado
            throw new UnauthorizedException(
                'Token inválido',
            );
        }

        return true;
    }
}