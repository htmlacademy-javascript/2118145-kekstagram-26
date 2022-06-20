
const ARRAY_OF_USER_NAMES = ['Алёна', 'Маша', 'Дима', 'Артём', 'Максим', 'Григорий', 'Георгий', 'Настя', 'Катя', 'Сергей', 'Даниил', 'Игорь', 'Юлия', 'Милана', 'Миша', 'Мирослава', 'Алексей', 'Александр', 'Александра', 'Диана', 'Ксения', 'Полина', 'Варя', 'Виталий', 'Антон', 'Станислав', 'Андрей', 'Вадим', 'Юлиана'];
const ARRAY_OF_USER_MESSAGES = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
const ARRAY_OF_IMAGES_DESCRIPTION = ['Отдыхаем в Сочи!', 'Какие красивые цветы!', 'Милые котики греются на солнышке', 'Всех с Новым годом.', 'Первый снег.', 'Отмечаем день рождения на даче', 'Первый раз в первый класс. Дочь идет в школу.', 'Катаемся на лыжах в сосновом лесу', 'Как похорошела Москва', 'Гуляем по Питеру!'];
const USER_PROFILE_MIN_COMMENTS_COUNT = 1;
const USER_PROFILE_MAX_COMMENTS_COUNT = 3;
const USER_PROFILE_MIN_LIKES_COUNT = 1;
const USER_PROFILE_MAX_LIKES_COUNT = 3;
const USER_PROFILES_MIN_ID_COUNT = 0;
const USER_PROFILES_MAX_ID_COUNT = 25;
const userProfileUrlIdUsed = [];
let commentId = 1;
let userProfileId = 1;

/** A function that returns a random integer from the given range
 * @param {number} min
 * @param {number} max
 * @return {number}
**/
function returnRandomNumber(min, max) {
  let randomNumber = Math.random() * -(max - min) + max;
  if (randomNumber < 0) {
    randomNumber = Math.abs(randomNumber);
  }
  if (typeof randomNumber !== 'number' || !Number.isFinite(randomNumber) || isNaN(randomNumber)) {
    throw new TypeError('Parameters not valid.');
  }
  return Math.round(randomNumber);
}

/** Function to check comment length
 * @param {string} checkStr
 * @param {number} maxLength
 * @return {boolean}
**/
const checkLengthString = (checkStr, maxLength) => checkStr.length <= maxLength;

/** Function is return random element from array(etc. message,name)
 * @return {string}
**/
function getRandomArrayElement(array) {
  return array[returnRandomNumber(0, array.length - 1)];
}

/** Function is generate comment
 * @param {number} commentId
 * @return {object}
**/
function generateComment() {
  return {
    id: commentId++,
    avatar: `img/avatar-${returnRandomNumber(0, 6)}.svg`,
    message: getRandomArrayElement(ARRAY_OF_USER_MESSAGES),
    name: getRandomArrayElement(ARRAY_OF_USER_NAMES)
  };
}

/**  Function to generate comments
 * @param {number} length
 * @return {array}
**/
function generateComments(length) {
  return Array.from({ length }, generateComment);
}

/**  Function to generate random index
 * @param {number} index
 * @return {number}
**/
function getProfileUrlId() {
  let index = 1;
  while (userProfileUrlIdUsed.includes(index)) {
    index = returnRandomNumber(USER_PROFILES_MIN_ID_COUNT, USER_PROFILES_MAX_ID_COUNT);
  }
  userProfileUrlIdUsed.push(index);
  return index;
}

/** Function is generate profile
 * @param {number} userProfileId
 * @return {object}
**/
function generateUserProfile() {
  return {
    id: userProfileId++,
    url: `photos/${getProfileUrlId()}.jpg`,
    description: getRandomArrayElement(ARRAY_OF_IMAGES_DESCRIPTION),
    likes: returnRandomNumber(USER_PROFILE_MIN_LIKES_COUNT, USER_PROFILE_MAX_LIKES_COUNT),
    comments: generateComments(returnRandomNumber(USER_PROFILE_MIN_COMMENTS_COUNT, USER_PROFILE_MAX_COMMENTS_COUNT))
  };
}

/**  Function to generate profiles
 * @param {number} length
 * @return {array}
**/
function generateUserProfiles(length) {
  return Array.from({ length }, generateUserProfile);
}
/* Для дебага */
// console.log(checkLengthString('Hello world!', 11));
// console.log(returnRandomNumber(-400, -100));
console.log(generateUserProfiles(USER_PROFILES_MAX_ID_COUNT));
