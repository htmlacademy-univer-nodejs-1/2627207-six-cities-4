export const CreateUpdateOfferMessage = {
  title: {
    minLength: 'Minimum title length must be 10',
    maxLength: 'Maximum title length must be 100',
  },
  description: {
    minLength: 'Minimum description length must be 20',
    maxLength: 'Maximum description length must be 1024',
  },
  publicationDate: {
    invalidFormat: 'publicationDate must be a valid ISO date',
  },
  city: {
    invalid: 'City is required and should be from 6 cities',
  },
  previewPhotoPath: {
    invalidFormat: 'previewPhotoPath must be a string'
  },
  photos: {
    size: 'photos must have 6 elements',
    invalidFormat: 'photos must be a string array',
  },
  roomCount: {
    invalidFormat: 'roomCount must be an integer',
    minValue: 'Minimum cost is 1',
    maxValue: 'Maximum cost is 8',
  },
  guestCount: {
    invalidFormat: 'guestCount must be an integer',
    minValue: 'Minimum cost is 1',
    maxValue: 'Maximum cost is 10',
  },
  cost: {
    invalidFormat: 'Cost must be an integer',
    minValue: 'Minimum cost is 100',
    maxValue: 'Maximum cost is 200000',
  },
  amenities: {
    isNotEmpty: 'Amenities are required',
    isArray: 'Amenities must be an array',
    minSize: 'At least one amenity is required',
    isStringArray: 'Each good must be one of the allowed values',
  }
} as const;
