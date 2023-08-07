import { GenderEnum } from "../enumerations/gender-enum";
import { Authentication } from "./authentication";

export class User{
    "_id": string;
    "name": string;
    "surname":  string;
    "email":  string;
    "address":  string;
    "birthDate": Date;
    "gender": string;
    "authentication": Authentication;
    "disabled": boolean;
    "createDate": Date;
    "roles": Array<string>;
}