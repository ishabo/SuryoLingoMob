import changeObjectCase from 'change-object-case';

export const changeCase = (data: object, direction: 'snake' | 'camel') => {
  const caseFunction = Array.isArray(data) ? `Array` : `Keys`;
  const options = { recursive: true, arrayRecursive: true };
  return changeObjectCase[`${direction}${caseFunction}`](data, options);
};

export const replaceCharsByPatterns = (sentence: string, patterns: object) => {
  let str: string;
  let modifiedSentence = sentence;

  for (str of Object.keys(patterns)) {
    modifiedSentence = modifiedSentence.replace(new RegExp(str, 'g'), patterns[str]);
  }

  return modifiedSentence;
};
