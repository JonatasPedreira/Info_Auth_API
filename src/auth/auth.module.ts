import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthEntity } from "./entities/auth.entity";
import { AuthService } from "./auth.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CryptoModule } from "../crypto/crypto.module";


@Module({
    imports: [
        TypeOrmModule.forFeature([AuthEntity]),
        CryptoModule,
    ],

    controllers: [
        AuthController,
    ],

    providers: [
        AuthService
    ]
})

export class AuthModule {}