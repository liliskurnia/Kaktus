/**
 * Password validator for login pages
 */
import value from 'assets/styles/themes.scss';

// has number
const hasNumber = (number) => new RegExp(/[0-9]/).test(number);

// has mix of small and capitals
const hasMixed = (number) => new RegExp(/[a-z]/).test(number) && new RegExp(/[A-Z]/).test(number);

// has special chars
const hasSpecial = (number) => new RegExp(/[!#@$%^&*)(+=._-]/).test(number);

// set color based on password strength
export const strengthColor = (count) => {
  if (count < 2) return { label: 'Poor', color: value.poorPassword };
  if (count < 3) return { label: 'Weak', color: value.weakPassword };
  if (count < 4) return { label: 'Normal', color: value.normalPassword };
  if (count < 5) return { label: 'Good', color: value.goodPassword };
  if (count < 6) return { label: 'Strong', color: value.strongPassword };
  return { label: 'Poor', color: value.errorMain };
};

// password strength indicator
export const strengthIndicator = (number) => {
  let strengths = 0;
  if (number.length > 5) strengths += 1;
  if (number.length > 7) strengths += 1;
  if (hasNumber(number)) strengths += 1;
  if (hasSpecial(number)) strengths += 1;
  if (hasMixed(number)) strengths += 1;
  return strengths;
};
