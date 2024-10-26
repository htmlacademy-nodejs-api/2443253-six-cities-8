export const UpdateOfferValidationMessage = {
  title: {
    minLength: 'Minimum title length must be 10',
    maxLength: 'Maximum title length must be 100',
  },
  description: {
    minLength: 'Minimum description length must be 20',
    maxLength: 'Maximum description length must be 1024',
  },
  postDate: {
    invalidFormat: 'postDate must be a valid ISO date',
  },
  previewImage: {
    invalidFormat: 'previewImage must be a valid URL',
    maxLength: 'Too short for field «image»',
  },
  images: {
    invalidFormat: 'Field images must be an array',
    invalidId: 'Categories field must be an array of valid urls',
  },
  city: {
    invalidFormat: `City must be for one of the following values:
                      "Paris", "Cologne", "Brussels","Amsterdam","Hamburg",Dusseldorf`,
  },
  type: {
    invalidFormat: `Type be for one of the following values:
              "Apartment","House","Room","Hotel"`,
  },
  price: {
    invalidFormat: 'Price must be an integer',
    minValue: 'Minimum price is 100',
    maxValue: 'Maximum price is 100000',
  },
  isPremium: {
    invalidFormat: 'Field isPremium must be a boolean value',
  },
  isFavorite: {
    invalidFormat: 'Field isPremium must be a boolean value',
  },
  rating: {
    invalidFormat: 'Price must be an number, for example 3.5',
    minValue: 'Minimum rating is 1',
    maxValue: 'Maximum rating is 5',
  },
  bedRooms: {
    invalidFormat: 'Price must be an integer',
    minValue: 'Minimum price is 1',
    maxValue: 'Maximum price is 8',
  },
  maxAdults: {
    invalidFormat: 'Price must be an integer',
    minValue: 'Minimum price is 1',
    maxValue: 'Maximum price is 10',
  },
  goods: {
    invalidFormat: 'Field goods must be an array',
    invalidId: `Goods field must be an array of valid values for goods:
              "Breakfast","Air conditioning","Laptop friendly workspace",
              "Baby seat","Washer","Fridge"`,
  },
  userId: {
    invalidId: 'userId field must be a valid id',
  },
  location: {
    invalidFormat: 'Field location must be an object',
    invalidId: 'Location field must be an object with two keys: latitude and longitude',
  },

} as const;
