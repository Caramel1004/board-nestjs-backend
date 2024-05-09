import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { BoardStatus } from "../boards.model";

export class BoardStatusValidationPipe implements PipeTransform {

    readonly StatusOptions = [
        BoardStatus.PUBLIC,
        BoardStatus.PRIVATE
    ]

    private isStatusValid(status: any): boolean {
        return this.StatusOptions.includes(status);
    }

    transform(value: String, metadata: ArgumentMetadata) {

        value = value.toUpperCase();

        if (!this.isStatusValid(value)) {
            throw new BadRequestException('잘못된 상태 입니다.');
        }
        return value;
    }
}