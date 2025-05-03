import { Amenity, City, HousingType, PlaceCoordinates } from '../../../types/index.js';

export class CreateOfferDto {
  title: string;
  description: string;
  publicationDate: Date;
  city: City;
  previewPhotoPath: string;
  photos: string[];
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  housingType: HousingType;
  roomCount: number;
  guestCount: number;
  cost: number;
  amenities: Amenity[];
  authorId: string;
  commentCount: number;
  coordinates: PlaceCoordinates;
}
