import { ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean, IsDateString, IsEnum, IsMongoId, IsNotEmpty, IsNumber, IsString, Max, MaxLength, Min, MinLength } from 'class-validator';
import { Amenity, City, HousingType, PlaceCoordinates } from '../../../types/index.js';
import { CreateOfferValidationMessage } from './create-offer.messages.js';

export class CreateOfferDto {
  @MinLength(10, { message: CreateOfferValidationMessage.title.minLength })
  @MaxLength(100, { message: CreateOfferValidationMessage.title.maxLength })
    title: string;

  @MinLength(20, { message: CreateOfferValidationMessage.description.minLength })
  @MaxLength(1024, { message: CreateOfferValidationMessage.description.maxLength })
    description: string;

  @IsDateString({}, { message: CreateOfferValidationMessage.publicationDate.invalidFormat })
    publicationDate: Date;

  @IsEnum(City, { message: CreateOfferValidationMessage.city.invalid })
    city: City;

  @IsString({ message: CreateOfferValidationMessage.previewPhotoPath.invalidFormat })
    previewPhotoPath: string;

  @IsArray({ message: CreateOfferValidationMessage.photos.invalidFormat })
  @IsString({ each: true, message: CreateOfferValidationMessage.photos.invalidFormat })
  @ArrayMinSize(6, { message: CreateOfferValidationMessage.photos.size })
  @ArrayMaxSize(6, { message: CreateOfferValidationMessage.photos.size })
    photos: string[];

  @IsBoolean()
    isPremium: boolean;

  @IsBoolean()
    isFavorite: boolean;

  @IsNotEmpty({ message: CreateOfferValidationMessage.rating.isNotEmpty })
  @IsNumber({ maxDecimalPlaces: 1 }, { message: CreateOfferValidationMessage.rating.invalid })
  @Min(1, { message: CreateOfferValidationMessage.rating.invalidFormat })
  @Max(1, { message: CreateOfferValidationMessage.rating.invalidFormat })
    rating: number;

  @IsEnum(HousingType)
    housingType: HousingType;

  @IsNotEmpty({ message: CreateOfferValidationMessage.rating.isNotEmpty })
  @IsNumber({ maxDecimalPlaces: 1 }, { message: CreateOfferValidationMessage.roomCount.invalidFormat })
  @Min(1, { message: CreateOfferValidationMessage.roomCount.minValue })
  @Max(8, { message: CreateOfferValidationMessage.roomCount.maxValue })
    roomCount: number;

  @IsNotEmpty({ message: CreateOfferValidationMessage.rating.isNotEmpty })
  @IsNumber({ maxDecimalPlaces: 1 }, { message: CreateOfferValidationMessage.guestCount.invalidFormat })
  @Min(1, { message: CreateOfferValidationMessage.guestCount.minValue })
  @Max(10, { message: CreateOfferValidationMessage.guestCount.maxValue })
    guestCount: number;

  @IsNumber({ maxDecimalPlaces: 1 }, { message: CreateOfferValidationMessage.cost.invalidFormat })
  @Min(100, { message: CreateOfferValidationMessage.cost.minValue })
  @Max(200000, { message: CreateOfferValidationMessage.cost.maxValue })
    cost: number;

  @IsNotEmpty({ message: CreateOfferValidationMessage.amenities.isNotEmpty })
  @IsArray({ message: CreateOfferValidationMessage.amenities.isArray })
  @ArrayMinSize(1, { message: CreateOfferValidationMessage.amenities.minSize })
  @IsEnum(Amenity, { each: true, message: CreateOfferValidationMessage.amenities.isStringArray })
    amenities: Amenity[];

  @IsMongoId({ message: CreateOfferValidationMessage.authorId.invalidId })
    authorId: string;

  commentCount: number;

  @IsNotEmpty({ message: CreateOfferValidationMessage.coordinates.isNotEmpty })
    coordinates: PlaceCoordinates;
}
