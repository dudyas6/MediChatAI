// utils.js
const specialChars = [
  '!',
  '@',
  '#',
  '$',
  '%',
  '^',
  '&',
  '*',
  '(',
  ')',
  '_',
  '-',
  '+',
  '=',
  '[',
  '{',
  ']',
  '}',
  ':',
  ';',
  '<',
  '>',
];

export const validateRegisterForm = (username, password, confirmPassword) => {
  // Check if the First Name is an Empty string or not.
  let errorMsg = '';

  if (username.length === 0) {
    errorMsg += 'Username can not be empty\n';
  }

  if (password !== confirmPassword) {
    errorMsg += "Passwords doesn't match!\n";
  }
  // if password length is less than 8 characters, alert invalid form.
  if (password.length < 8) {
    errorMsg += 'Password length should be atleast 8 characters\n';
  }

  let countUpperCase = 0;
  let countLowerCase = 0;
  let countDigit = 0;
  let countSpecialCharacters = 0;

  for (let i = 0; i < password.length; i++) {
    if (specialChars.includes(password[i])) {
      countSpecialCharacters++;
    } else if (!isNaN(password[i] * 1)) {
      countDigit++;
    } else {
      if (password[i] === password[i].toUpperCase()) {
        countUpperCase++;
      }
      if (password[i] === password[i].toLowerCase()) {
        countLowerCase++;
      }
    }
  }

  if (countLowerCase === 0) {
    errorMsg += 'Password must contain atleast one lowercase character\n';
  }

  if (countUpperCase === 0) {
    errorMsg += 'Password must contain atleast one uppercase character\n';
  }

  if (countDigit === 0) {
    errorMsg += 'Password must contain atleast one digit\n';
  }

  if (countSpecialCharacters === 0) {
    // invalid form, 0 special characters characters
    errorMsg += 'Password must contain atleast one special character\n';
  }
  return errorMsg;
};

export const generateRandomLoremIpsum = () => {
  const words = [
    'lorem',
    'ipsum',
    'dolor',
    'sit',
    'amet',
    'consectetur',
    'adipiscing',
    'elit',
    'sed',
    'do',
    'eiusmod',
    'tempor',
    'incididunt',
    'ut',
    'labore',
    'et',
    'dolore',
    'magna',
    'aliqua',
    'ut',
    'enim',
    'ad',
    'minim',
    'veniam',
    'quis',
    'nostrud',
    'exercitation',
    'ullamco',
    'laboris',
    'nisi',
    'ut',
    'aliquip',
    'ex',
    'ea',
    'commodo',
    'consequat',
    'duis',
    'aute',
    'irure',
    'dolor',
    'in',
    'reprehenderit',
    'in',
    'voluptate',
    'velit',
    'esse',
    'cillum',
    'dolore',
    'eu',
    'fugiat',
    'nulla',
    'pariatur',
    'excepteur',
    'sint',
    'occaecat',
    'cupidatat',
    'non',
    'proident',
    'sunt',
    'in',
    'culpa',
    'qui',
    'officia',
    'deserunt',
    'mollit',
    'anim',
    'id',
    'est',
    'laborum',
  ];

  const sentenceLength = Math.floor(Math.random() * 10) + 5; // Random sentence length between 5 and 15 words
  let sentence = '';

  for (let i = 0; i < sentenceLength; i++) {
    const randomWord = words[Math.floor(Math.random() * words.length)];
    sentence +=
      (i === 0
        ? randomWord.charAt(0).toUpperCase() + randomWord.slice(1)
        : randomWord) + ' ';
  }

  return sentence.trim() + '.';
};
