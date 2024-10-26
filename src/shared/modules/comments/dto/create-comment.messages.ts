export const CreateCommentMessages = {
  text: {
    invalidFormat: 'text is required',
    lengthField: 'min length is 5, max is 2024'
  },
  offerId: {
    invalidFormat: 'offerId field must be a valid id'
  },
  rating: {
    invalidFormat: 'Rating must be an number, for example 3.5',
    minValue: 'Minimum rating is 1',
    maxValue: 'Maximum rating is 5',
  },
  userId: {
    invalidFormat: 'userId field must be a valid id'
  },
} as const;
