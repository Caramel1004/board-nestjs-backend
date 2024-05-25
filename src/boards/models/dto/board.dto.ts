import { IsNotEmpty } from 'class-validator';

export class BoardDto {

    @IsNotEmpty()
    title: String;

    @IsNotEmpty()
    description: String;

    @IsNotEmpty()
    status: String;
}