import { Amenity, City, HousingType, Offer, PlaceCoordinates, User } from '../types/index.js';

export function createOffer(offerData: string): Offer {
  const [
    title,
    description,
    publicationDate,
    city,
    previewPhoto,
    photos,
    isPremium,
    isFavorite,
    rating,
    housingType,
    roomCount,
    guestCount,
    cost,
    amenities,
    authorName,
    authorEmail,
    authorAvatar,
    auhtorType,
    commentCount,
    latitude,
    longitude,
  ] = offerData.replace('\n', '').split('\t');

  const user = {
    name: authorName || '',
    email: authorEmail || '',
    avatarPath: authorAvatar || '',
    userType: auhtorType || '',
  } as User;

  return {
    title: title || '',
    description: description || '',
    publicationDate: new Date(publicationDate) || new Date(),
    city: (city as City) || City.Paris,
    previewPhotoPath: previewPhoto || '',
    photos: photos.split(',') || [],
    isPremium: Boolean(isPremium) || false,
    isFavorite: Boolean(isFavorite) || false,
    rating: Number(rating) || 0,
    housingType: (housingType as HousingType) || HousingType.Apartment,
    roomCount: Number(roomCount) || 0,
    guestCount: Number(guestCount) || 1,
    cost: Number(cost) || 0,
    amenities: amenities.split(',').map((amenity) => amenity as Amenity) || [],
    author: user,
    commentCount: Number(commentCount) || 0,
    coordinates: {
      latitude: latitude || 0,
      longitude: longitude || 0,
    } as PlaceCoordinates,
  };
}
