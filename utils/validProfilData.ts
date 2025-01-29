const MAX_HEIGHT = 300;
const MIN_HEIGHT = 0;

const MAX_WEIGHT = 300;
const MIN_WEIGHT = 0;

const MAX_AGE = 150;
const MIN_AGE = 0;

const MAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


const validWeight = (weight: number) => {
  return weight > MIN_WEIGHT && weight < MAX_WEIGHT;
}

const validHeight = (weight: number) => {
  return weight > MIN_HEIGHT && weight < MAX_HEIGHT;
}

const validAge = (age: number) => {
  return age > MIN_AGE && age < MAX_AGE;
}

const validMail = (mail: string) => {
  return MAIL_REGEX.test(mail);
}


export { validWeight, validHeight, validAge, validMail };
