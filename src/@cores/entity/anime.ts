import { CategoryEnum } from "../enumerations/category-enum";
import { Trailer } from "./trailer";

export class Anime{

    "_id": string ;
    "cover": string;
    "title": string;
    "synopsys": string;
    "rating": number;
    "trending": boolean;
    "category": CategoryEnum;
    "trailer": Trailer;
    "keyCode": string;
}
