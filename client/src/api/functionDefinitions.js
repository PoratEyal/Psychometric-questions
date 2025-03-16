// src/api/functionDefinitions.js

export const psychometricFunction = [
    {
      name: 'generate_psychometric_questions',
      description:
        'Return a list of psychometric questions in Hebrew, each with 4 multiple-choice options, and a correct answer index.',
      parameters: {
        type: 'object',
        properties: {
          questions: {
            type: 'array',
            description:
              'An array of questions in Hebrew, each with text, 4 options, and the index of the correct option.',
            items: {
              type: 'object',
              properties: {
                question_text: {
                  type: 'string',
                  description: 'The text of the question (in Hebrew).',
                },
                options: {
                  type: 'array',
                  description: 'An array of 4 answer options (in Hebrew).',
                  items: {
                    type: 'string',
                  },
                  minItems: 4,
                  maxItems: 4,
                },
                correct_option: {
                  type: 'number',
                  description:
                    'The index (0-3) of the correct answer in the options array.',
                },
              },
              required: ['question_text', 'options', 'correct_option'],
            },
          },
        },
        required: ['questions'],
      },
    },
  ];
  