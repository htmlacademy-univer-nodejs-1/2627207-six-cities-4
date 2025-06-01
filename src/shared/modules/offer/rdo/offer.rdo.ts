import { Expose, Type } from 'class-transformer';
import { UserRdo } from '../../user/rdo/user.rdo.js';
import { PlaceCoordinates } from '../../../types/index.js';

export class OfferRdo {
  @Expose()
  public id: string;

  @Expose()
  public title: string;

  @Expose()
  public description: string;

  @Expose()
  public previewPhotoPath: string;

  @Expose()
  public photos: string[];

  @Expose()
  public rating: number;

  @Expose()
  public roomCount: number;

  @Expose()
  public guestCount: number;

  @Expose()
  public amenities: string[];

  @Expose()
  public publicationDate: string;

  @Expose()
  public cost: number;

  @Expose()
  public housingType: string;

  @Expose()
  public commentCount: number;

  @Expose()
  public coordinates: PlaceCoordinates;

  @Expose({ name: 'userId'})
  @Type(() => UserRdo)
  public user: UserRdo;
}
