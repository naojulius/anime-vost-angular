import { GenderEnum } from "src/@cores/enumerations/gender-enum";

export class RegistrationInfo{
    "name": string;
    "surname": string;
    "birthDate": Date;
    "address": string;
    "gender": GenderEnum;
    "password": string;
    "password_confirm": string;
    "email": string;
}