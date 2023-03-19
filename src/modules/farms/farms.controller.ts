import { NextFunction, Request, Response } from "express";
import { FarmDto } from "./dto/farm.dto";
import { FarmsService } from "./farms.service";
import { CreateFarmRequest } from "./interfaces/create-request.interface";
import { ListFarmQuery } from "./interfaces/list-query.interface";

export class FarmsController {
  private readonly farmsService: FarmsService;

  constructor() {
    this.farmsService = new FarmsService();
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const farm = await this.farmsService.createFarm(req.body as FarmDto, (<CreateFarmRequest<FarmDto>><unknown>req).token.id);
      res.status(201).send(FarmDto.createFromEntity(farm));
    } catch (error) {
      next(error);
    }
  }

  public async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await this.farmsService.deleteFarm(+req.params.id);
      res.status(201).send({ success: true });
    } catch (error) {
      next(error);
    }
  }

  public async list(req: Request, res: Response, next: NextFunction) {
    try {
      const farms = await this.farmsService.list(
        req.query as unknown as ListFarmQuery, 
        (<CreateFarmRequest<FarmDto>><unknown>req).token.id
      );

      res.status(200).send(farms);
    } catch (error) {
      next(error);
    }
  }
}
