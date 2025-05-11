import { Amenity, City, HousingType } from '../../../types/index.js';

export class UpdateOfferDto {
  public title?: string;
  public description?: string;
  public publicationDate?: Date;
  public cost?: number;
  public city?: City;
  public previewPhotoPath?: string;
  public photos?: string[];
  public isPremium?: boolean;
  public housingType?: HousingType;
  public roomCount?: number;
  public guestCount?: number;
  public amenities?: Amenity[];
}
