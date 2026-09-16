import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AuthEntity } from "./entities/auth.entity";
import { CryptoService } from "../crypto/crypto.service";
import { ConfigService } from "@nestjs/config";


@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(AuthEntity)
        private readonly authRepository: Repository<AuthEntity>,
        private readonly cryptoService: CryptoService,
        private readonly configService: ConfigService,
    ) {}


    async cadastro(id:number, password: string) {
        const existeuser = await this.authRepository.findOne({
            where: {
                id,
            },
        });

        if (existeuser){
            throw new NotFoundException('Id já cadastrado');
        }

        const senhaEncrypt = this.cryptoService.encrypt(password)

        const user = this.authRepository.create({
            id,
            password: senhaEncrypt,
        });

        await this.authRepository.save(user);

        return {
            id: user.id,
            message: 'Cadastro realizado com sucesso'
        }
    }

    async resolve(id: number, key: string){
        const senhaCriptografada = this.configService.get<string>(`P_${id}`);
        if(!senhaCriptografada){
            throw new UnauthorizedException("Id não encontrado");
        }
        
        const masterKey = this.configService.get<string>('MASTER_KEY');

        if (!key || key !== masterKey) {
            throw new UnauthorizedException('Key inválida');
        }

        const senha = this.cryptoService.decrypt(senhaCriptografada);

        return {
            authorized: true,
            id: id,
            senha,
            message: 'Autorização Concedida.',
        };
    }
    
}