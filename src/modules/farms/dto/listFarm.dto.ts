import { FarmDto } from "./farm.dto";

export class ListFarmDto extends FarmDto {
    public drivingDistance: number;

    public drivingDistanceText: string;

    constructor(farm: Partial<FarmDto>) {
        super(farm);
    }
}
