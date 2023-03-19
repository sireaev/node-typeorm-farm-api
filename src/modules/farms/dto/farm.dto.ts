import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Farm } from "../entities/farm.entity";

export class FarmDto {
  constructor(partial?: Partial<FarmDto>) {
    Object.assign(this, partial);
  }

  @IsString()
  @IsOptional()
  public readonly id: string;

  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsString()
  @IsNotEmpty()
  public address: string;

  @IsEmail()
  @IsNotEmpty()
  public owner: string;

  @IsNumber()
  @IsNotEmpty()
  public size: number;

  @IsNumber()
  @IsNotEmpty()
  public yield: number;

  public static createFromEntity(farm: Partial<Farm> | null): FarmDto | null {
    if (!farm) {
      return null;
    }

    return new FarmDto({ ...farm });
  }
}
