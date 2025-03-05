import { FileReader } from './file-reader.interface.js';
import { readFileSync } from 'node:fs';
import { Offer, HousingType, City, Amenity } from '../../types/index.js';

export class TSVFileReader implements FileReader {
  private rawData = '';

  constructor(
    private readonly filename: string
  ) {}

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf-8' });
  }

  public toArray(): Offer[] {
    if (!this.rawData) {
      throw new Error('File was not read');
    }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim().length > 0)
      .map((line) => line.split('\t'))
      .map(([
        title, description, publicationDate, city,
        previewPhotoPath, photos, isPremium, isFavorite,
        rating, housingType, roomCount, guestCount,
        cost, amenities, authorName, authorEmail,
        authorAvatar, commentCount, coordinates
      ]) => ({
        title,
        description,
        publicationDate: new Date(publicationDate),
        city: City[city as 'Paris' | 'Cologne' | 'Brussels' | 'Amsterdam' | 'Hamburg' | 'Dusseldorf'],
        previewPhotoPath,
        photos: photos.split(';'),
        isPremium: isPremium === 'true',
        isFavorite: isFavorite === 'true',
        rating: Number.parseFloat(rating),
        housingType: HousingType[housingType as 'Apartment'| 'House' | 'Room' | 'Hotel'],
        roomCount: Number.parseInt(roomCount, 10),
        guestCount: Number.parseInt(guestCount, 10),
        cost: Number.parseInt(cost, 10),
        amenities: amenities.split(';')
          .map((amenity) => Amenity[
            amenity as 'Breakfast' | 'AirConditioning' | 'LaptopFriendlyWorkspace' | 'BabySeat' | 'Washer' | 'Towels' | 'Fridge'
          ]),
        author: {
          name: authorName,
          email: authorEmail,
          avatarPath: authorAvatar,
        },
        commentCount: Number(commentCount),
        coordinates: {
          latitude: coordinates.split(';')[0],
          longitude: coordinates.split(';')[1],
        },
      }));
  }
}
