import { IsNotEmpty } from "class-validator";

export class CreateBrandDto {
    @IsNotEmpty()
    name: string;
    description: string;
    tags: string[];
}
