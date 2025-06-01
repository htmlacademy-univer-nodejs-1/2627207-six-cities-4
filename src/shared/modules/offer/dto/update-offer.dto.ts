import { ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean, IsDateString, IsEnum, IsNumber, IsString, Max, MaxLength, Min, MinLength } from 'class-validator';
import { Amenity, City, HousingType } from '../../../types/index.js';
import { CreateUpdateOfferMessage } from './update-offer.message.js';

export class UpdateOfferDto {
  @MinLength(10, { message: CreateUpdateOfferMessage.title.minLength })
  @MaxLength(100, { message: CreateUpdateOfferMessage.title.maxLength })
  public title?: string;

  @MinLength(20, { message: CreateUpdateOfferMessage.description.minLength })
  @MaxLength(1024, { message: CreateUpdateOfferMessage.description.maxLength })
  public description?: string;

  @IsDateString({}, { message: CreateUpdateOfferMessage.publicationDate.invalidFormat })
  public publicationDate?: Date;

  @IsNumber({ maxDecimalPlaces: 1 }, { message: CreateUpdateOfferMessage.cost.invalidFormat })
  @Min(100, { message: CreateUpdateOfferMessage.cost.minValue })
  @Max(200000, { message: CreateUpdateOfferMessage.cost.maxValue })
  public cost?: number;

  @IsEnum(City, { message: CreateUpdateOfferMessage.city.invalid })
  public city?: City;

  @IsString({ message: CreateUpdateOfferMessage.previewPhotoPath.invalidFormat })
  public previewPhotoPath?: string;

  @IsArray({ message: CreateUpdateOfferMessage.photos.invalidFormat })
  @IsString({ each: true, message: CreateUpdateOfferMessage.photos.invalidFormat })
  @ArrayMinSize(6, { message: CreateUpdateOfferMessage.photos.size })
  @ArrayMaxSize(6, { message: CreateUpdateOfferMessage.photos.size })
  public photos?: string[];

  @IsBoolean()
  public isPremium?: boolean;

  @IsEnum(HousingType)
  public housingType?: HousingType;

  @IsNumber({ maxDecimalPlaces: 1 }, { message: CreateUpdateOfferMessage.roomCount.invalidFormat })
  @Min(1, { message: CreateUpdateOfferMessage.roomCount.minValue })
  @Max(8, { message: CreateUpdateOfferMessage.roomCount.maxValue })
  public roomCount?: number;

  @IsNumber({ maxDecimalPlaces: 1 }, { message: CreateUpdateOfferMessage.guestCount.invalidFormat })
  @Min(1, { message: CreateUpdateOfferMessage.guestCount.minValue })
  @Max(10, { message: CreateUpdateOfferMessage.guestCount.maxValue })
  public guestCount?: number;

  @IsArray({ message: CreateUpdateOfferMessage.amenities.isArray })
  @ArrayMinSize(1, { message: CreateUpdateOfferMessage.amenities.minSize })
  @IsEnum(Amenity, { each: true, message: CreateUpdateOfferMessage.amenities.isStringArray })
  public amenities?: Amenity[];
}
