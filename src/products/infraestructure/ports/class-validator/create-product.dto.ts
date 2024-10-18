import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString, MaxLength, Min } from "class-validator";
import { CreateProductDtoI } from "src/products/domain/dtoI/create-product.dtoI";

export class CreateProductDto implements CreateProductDtoI {
    @ApiProperty()
    @IsString()
    name: string;
    @ApiProperty()
    @IsNumber({
        maxDecimalPlaces: 4,
    })
    @Min(0)
    @Type(() => Number)
    price: number;
    @ApiProperty()
    @IsString()
    @MaxLength(150)
    description: string;
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    @Type(() => Number)
    id_user: number;
}