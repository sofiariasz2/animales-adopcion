import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Animal } from './entities/animal.entity';
import { Location } from '../locations/entities/location.entity';
import { User } from '../users/entities/user.entity';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';
import { FilterAnimalDto } from './dto/filter-animal.dto';

@Injectable()
export class AnimalsService {
  private readonly logger = new Logger('AnimalsService');

  constructor(
    @InjectRepository(Animal)
    private readonly animalRepo: Repository<Animal>,
    @InjectRepository(Location)
    private readonly locationRepo: Repository<Location>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async create(dto: CreateAnimalDto) {
    try {
      const { locationId, registeredById, ...rest } = dto;

      const location = locationId
        ? await this.locationRepo.findOne({ where: { id: locationId } })
        : null;
      if (locationId && !location)
        throw new NotFoundException(`Location ${locationId} no encontrada`);

      const registeredBy = registeredById
        ? await this.userRepo.findOne({ where: { id: registeredById } })
        : null;
      if (registeredById && !registeredBy)
        throw new NotFoundException(`User ${registeredById} no encontrado`);

      const animal = this.animalRepo.create({
        ...rest,
        location: location ?? undefined,
        registeredBy: registeredBy ?? undefined,
      });
      return await this.animalRepo.save(animal);
    } catch (err) {
      this.handleError(err);
    }
  }

  async findAll(filters: FilterAnimalDto) {
    return this.animalRepo.find({
      where: {
        ...(filters.especie && { especie: filters.especie }),
        ...(filters.estado && { estado: filters.estado }),
      },
      relations: ['registeredBy'],
    });
  }

  async findOne(id: string) {
    const animal = await this.animalRepo.findOne({
      where: { id },
      relations: ['location', 'registeredBy', 'interestedUsers'],
    });
    if (!animal) throw new NotFoundException(`Animal ${id} no encontrado`);
    return animal;
  }

  async update(id: string, dto: UpdateAnimalDto) {
    const animal = await this.findOne(id);
    const { locationId, registeredById, ...rest } = dto;

    if (locationId) {
      const location = await this.locationRepo.findOne({
        where: { id: locationId },
      });
      if (!location)
        throw new NotFoundException(`Location ${locationId} no encontrada`);
      animal.location = location;
    }

    if (registeredById) {
      const registeredBy = await this.userRepo.findOne({
        where: { id: registeredById },
      });
      if (!registeredBy)
        throw new NotFoundException(`User ${registeredById} no encontrado`);
      animal.registeredBy = registeredBy;
    }

    this.animalRepo.merge(animal, rest);
    return this.animalRepo.save(animal);
  }

  async remove(id: string) {
    const animal = await this.findOne(id);
    await this.animalRepo.remove(animal);
    return { message: 'Animal eliminado' };
  }

  private handleError(err: any) {
    if (err instanceof NotFoundException) throw err;
    if (err.code === '23505')
      throw new BadRequestException(`Animal duplicado: ${err.detail}`);
    this.logger.error(err);
    throw new InternalServerErrorException('Error inesperado');
  }
}
