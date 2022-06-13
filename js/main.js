/** A function that returns a random integer from the given range
 * @param {number} min
 * @param {number} max
 * @param {number} randomNumber
 * @return {boolean}
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
**/
const checkLengthString = (checkStr, maxLength) => checkStr.length <= maxLength;

/**  Function to generate comments
 * @param {array} ARRAY_OF_USER_COMMENTS
 * @param {array} ARRAY_OF_USER_NAMES
 * @param {array} ARRAY_OF_USER_MESSAGES
 * @param {object} objUserComment
 * @param {number} idImg
 * @return {array}
**/
function toGenerateComments(countComments) {
  const ARRAY_OF_USER_COMMENTS = [];
  const ARRAY_OF_USER_NAMES = ['Алёна', 'Маша', 'Дима', 'Артём', 'Максим', 'Григорий', 'Георгий', 'Настя', 'Катя', 'Сергей', 'Даниил', 'Игорь', 'Юлия', 'Милана', 'Миша', 'Мирослава', 'Алексей', 'Александр', 'Александра', 'Диана', 'Ксения', 'Полина', 'Варя', 'Виталий', 'Антон', 'Станислав', 'Андрей', 'Вадим', 'Юлиана'];
  const ARRAY_OF_USER_MESSAGES = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
  let objUserComment = Object.create(null);
  for (let i = 0; i < countComments; i++) {
    if (typeof ARRAY_OF_USER_NAMES[i] !== 'string') {
      throw new TypeError('Value username or message is not string.');
    }
    const idImg = returnRandomNumber(1, 6);
    objUserComment = Object.create(Object.prototype, {
      id: { get: function () { return returnRandomNumber(1, 25); } },
      avatar: { get: function () { return `img/avatar-${idImg}.svg`; } },
      message: { get: function () { return ARRAY_OF_USER_MESSAGES[returnRandomNumber(0, ARRAY_OF_USER_MESSAGES.length - 1)]; } },
      name: { get: function () { return ARRAY_OF_USER_NAMES[returnRandomNumber(0, ARRAY_OF_USER_NAMES.length)]; } },
    });
    ARRAY_OF_USER_COMMENTS.push(objUserComment.id, objUserComment.avatar, objUserComment.message, objUserComment.name);
  }
  return ARRAY_OF_USER_COMMENTS;
}

/**  Function generates objects
 * @param {array} ARRAY_OF_USER_PROFILE
 * @param {array} ARRAY_OF_IMAGES_DESCRIPTION
 * @param {object} objUserProfile
 * @return {array}
**/
function toGenerateObjects() {
  const ARRAY_OF_USER_PROFILE = [];
  const ARRAY_OF_IMAGES_DESCRIPTION = ['Отдыхаем в Сочи!', 'Какие красивые цветы!', 'Милые котики греются на солнышке', 'Всех с Новым годом.', 'Первый снег.', 'Отмечаем день рождения на даче', 'Первый раз в первый класс. Дочь идет в школу.', 'Катаемся на лыжах в сосновом лесу', 'Как похорошела Москва', 'Гуляем по Питеру!'];
  let objUserProfile = Object.create(null);
  for (let i = 0; i < 25; i++) {
    objUserProfile = Object.create(Object.prototype, {
      id: { get: function () { return returnRandomNumber(1, 25); } },
      url: { get: function () { return `photos/${this.id}.jpg`; } },
      description: { get: function () { return ARRAY_OF_IMAGES_DESCRIPTION[returnRandomNumber(0, ARRAY_OF_IMAGES_DESCRIPTION.length - 1)]; } },
      likes: { get: function () { return returnRandomNumber(15, 200); } },
      comments: { get: function () { return Object.assign(toGenerateComments(3)); } },
    });
    ARRAY_OF_USER_PROFILE.push(objUserProfile.id, objUserProfile.url, objUserProfile.description, objUserProfile.likes, objUserProfile.comments);
  }
  return ARRAY_OF_USER_PROFILE;
}
/* Для дебага */
// console.log(checkLengthString('Hello world!', 11));
// console.log(returnRandomNumber(-400, -100));
// console.log(toGenerateObjects());
