import { Amenity } from "./amenity.enum.js";
import { City } from "./city.enum.js";
import { HousingType } from "./housing-type.enum.js";
import { PlaceCoordinates } from "./place-coordinates.type.js";
import { User } from "./user.type.js";

export type Offer = {
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
  author: User;
  commentCount: number;
  coordinates: PlaceCoordinates;
}
