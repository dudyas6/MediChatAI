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
]

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

  let countUpperCase = 0
  let countLowerCase = 0
  let countDigit = 0
  let countSpecialCharacters = 0

  for (let i = 0; i < password.length; i++) {
    if (specialChars.includes(password[i])) {
      countSpecialCharacters++
    } else if (!isNaN(password[i] * 1)) {
      countDigit++
    } else {
      if (password[i] === password[i].toUpperCase()) {
        countUpperCase++
      }
      if (password[i] === password[i].toLowerCase()) {
        countLowerCase++
      }
    }
  }

  if (countLowerCase === 0) {
    errorMsg += 'Password must contain atleast one lowercase character\n'
  }

  if (countUpperCase === 0) {
    errorMsg += 'Password must contain atleast one uppercase character\n'
  }

  if (countDigit === 0) {
    errorMsg += 'Password must contain atleast one digit\n'
  }

  if (countSpecialCharacters === 0) {
    // invalid form, 0 special characters characters
    errorMsg += 'Password must contain atleast one special character\n'
  }
  return errorMsg;
}

