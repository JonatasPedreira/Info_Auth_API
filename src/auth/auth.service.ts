import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AuthEntity } from "./entities/auth.entity";
import { CryptoService } from "../crypto/crypto.service";


@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(AuthEntity)
        private readonly authRepository: Repository<AuthEntity>,
        private readonly cryptoService: CryptoService,
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
        const user = await this.authRepository.findOne({
            where: {
                id,
            },
        });

        if(!user){
            throw new NotFoundException('Registro não encontrado.');
        }
        
        if (!key || key !== "minha-palavra-chave") {
            throw new UnauthorizedException('Key inválida');
        }

        const senha = this.cryptoService.decrypt(user.password);
        

        return {
            authorized: true,
            id: user.id,
            senha,
            message: 'Autorização Concedida.',
        };
    }

    
}