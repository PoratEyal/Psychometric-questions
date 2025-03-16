// src/api/generateQuestions.js
import { OpenAI } from 'openai';
import { getSystemPrompt, getUserPrompt } from './prompts';
import { psychometricFunction } from './functionDefinitions';

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export const generatePsychometricQuestions = async (topic, difficulty, numberOfQuestions) => {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: getSystemPrompt(),
        },
        {
          role: 'user',
          content: getUserPrompt(numberOfQuestions, topic, difficulty),
        },
      ],
      functions: psychometricFunction,
      function_call: {
        name: 'generate_psychometric_questions',
      },
    });

    console.log('OpenAI raw response:', response);

    const choice = response.choices?.[0];
    const functionCall = choice?.message?.function_call;

    if (!functionCall) {
      throw new Error('No function call returned from OpenAI.');
    }

    console.log('function_call:', functionCall);

    const functionCallArgs = JSON.parse(functionCall.arguments);
    console.log('functionCall arguments:', functionCallArgs);

    const maybeQuestions = functionCallArgs.questions;
    if (maybeQuestions && Array.isArray(maybeQuestions)) {
      return maybeQuestions;
    } else {
      throw new Error('No valid "questions" array returned.');
    }
  } catch (err) {
    throw err;
  }
};
