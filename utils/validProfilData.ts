const MAX_HEIGHT = 300;
const MIN_HEIGHT = 0;

const MAX_WEIGHT = 300;
const MIN_WEIGHT = 0;

const MAX_AGE = 150;
const MIN_AGE = 0;

const MAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

/**
 * Validates if the given weight is within the acceptable range.
 *
 * @param weight - The weight to be validated.
 * @returns `true` if the weight is greater than `MIN_WEIGHT` and less than `MAX_WEIGHT`, otherwise `false`.
 */
const validWeight = (weight: number) => {
  return weight > MIN_WEIGHT && weight < MAX_WEIGHT;
}

/**
 * Validates if the given weight is within the acceptable height range.
 *
 * @param weight - The weight to be validated.
 * @returns `true` if the weight is greater than `MIN_HEIGHT` and less than `MAX_HEIGHT`, otherwise `false`.
 */
const validHeight = (weight: number) => {
  return weight > MIN_HEIGHT && weight < MAX_HEIGHT;
}

/**
 * Validates if the given age is within the acceptable range.
 *
 * @param age - The age to validate.
 * @returns `true` if the age is greater than `MIN_AGE` and less than `MAX_AGE`, otherwise `false`.
 */
const validAge = (age: number) => {
  return age > MIN_AGE && age < MAX_AGE;
}

/**
 * Validates if the provided email address matches the specified regular expression pattern.
 *
 * @param mail - The email address to be validated.
 * @returns A boolean indicating whether the email address is valid.
 */
const validMail = (mail: string) => {
  return MAIL_REGEX.test(mail);
}

export { validWeight, validHeight, validAge, validMail };
