import { DeleteResult, FindManyOptions, Repository } from "typeorm";
import dataSource from "orm/orm.config";
import { Farm } from "./entities/farm.entity";
import { FarmDto } from "./dto/farm.dto";
import { getCoordintesByAddress } from "integrations/positionstack";
import { User } from "modules/users/entities/user.entity";
import { ListFarmQuery } from "./interfaces/list-query.interface";
import { getDrivingDistance } from "integrations/distancematrixai";
import { ListFarmDto } from "./dto/listFarm.dto";

export class FarmsService {
    private readonly farmsRepository: Repository<Farm>;
    private readonly usersRepository: Repository<User>;

    constructor() {
      this.farmsRepository = dataSource.getRepository(Farm);
      this.usersRepository = dataSource.getRepository(User);
    }

    public async createFarm(farm: FarmDto, id: string): Promise<Farm> {
        const newFarm = this.farmsRepository.create(farm);

        const user = await this.usersRepository.findOneBy({ id });

        if (user instanceof User) {
          newFarm.owner = farm.owner ?? user.email;
          newFarm.user = user;
        }

        const { data } = await getCoordintesByAddress(farm.address);
        if (data?.length) {
          const mostConfident = data.reduce((p, c) => (p.confidence > c.confidence) ? p : c);
          newFarm.lat = mostConfident.latitude;
          newFarm.long = mostConfident.longitude;
        }

        return this.farmsRepository.save(newFarm);
    }

    public deleteFarm(id: number): Promise<DeleteResult> {
      return this.farmsRepository.delete(id);
    }

    public async list(params: ListFarmQuery, id: string): Promise<ListFarmDto[]> {
      const query: FindManyOptions = {
        order: {}
      };

      if (query.order) {
        if (params.name) query.order["name"] = params.name;
        if (params.date) query.order["createdAt"] = params.date;
      }

      const user = await this.usersRepository.findOneBy({ id });
      const farms = await this.farmsRepository.find(query);
      const wait = async () => new Promise(resolve => setTimeout(resolve, 1000));

      const list: ListFarmDto[] = [];

      if (user?.lat && user?.long) {
        for(let i = 0; i < farms.length; i++) {
          const row = new ListFarmDto(farms[i]);
          const { text, value } = await getDrivingDistance({ 
              from: { lat: user.lat, long: user.long },
              to: { lat: farms[i].lat, long: farms[i].long }
          })
          row.drivingDistanceText = text;
          row.drivingDistance = value;
          list.push(row);

          await wait();
        }
      }

      return list;
    }

}
