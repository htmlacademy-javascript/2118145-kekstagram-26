import {initPopup} from './popup.js';
import {sendData} from './query.js';
import {checkLengthString} from './util.js';
import {showErrorMessage, showSuccessMessage} from './messages.js';
import {FILE_TYPES, MAX_COUNT_HASHTAGS, MAX_LENGTH_DESCRIPTION, MAX_LENGTH_HASHTAG, MIN_LENGTH_HASHTAG} from './constants.js';
import {resetEffect} from './effects.js';
import {resetScale} from './scale.js';

const uploadPopupForm = document.querySelector('.img-upload__overlay');
const uploadInput = document.querySelector('#upload-file');
const imgUploadPreview = document.querySelector('.img-upload__preview img');
const effectsPreviews = document.querySelectorAll('.effects__preview');


class HashTagValidator {
  constructor(pristine, input) {
    this.pristine = pristine;
    this.input = input;
    this.regExSymbol = /^#[A-Za-zА-Яа-яЁё0-9]{1,999}$/;
    this.tagsTwiceControlSet = new Set();
    this.errorMessages = new Set();
    this.countTagsErrorMessage = 'Превышено допустимое количество хэштегов';
    this.lengthTagErrorMessage = 'Длина хэштега должна быть в пределах от 2 до 21 символов';
    this.addValidation();
  }

  validate() {
    this.pristine.validate(this.input);
  }

  addValidation() {
    this.pristine.addValidator(this.input, (value) => this.validateTags(value), () => this.getErrorMessages());
    this.pristine.addValidator(this.input, (value) => value.length <= 140, () => this.lengthTagErrorMessage);
  }

  getErrorMessages() {
    return Array.from(this.errorMessages).join(', ');
  }

  validateTags(value) {
    const tags = value.split(' ').filter(Boolean);
    this.tagsTwiceControlSet.clear();
    this.errorMessages.clear();
    const isCountValidate = this.validateCountTags(tags);
    return isCountValidate && tags.reduce((status, tag) => status && this.validateTag(tag), true);
  }

  validateTag(value) {
    const isTagNeedFormat = this.validateRegexTag(value);
    const isTagNotRepeat = this.validateTwiceTag(value);
    const isLengthValidate = this.validateLengthTag(value);
    return isTagNeedFormat && isTagNotRepeat && isLengthValidate;
  }

  validateRegexTag(value) {
    if (!this.regExSymbol.test(value)) {
      this.error(`Данный тэг ${value} содержит недопустимые символы`);
      return false;
    }
    return true;
  }

  validateTwiceTag(value) {
    if (this.tagsTwiceControlSet.has(value.toUpperCase())) {
      this.error(`Данный тэг ${value} повторяется`);
      return false;
    }
    this.tagsTwiceControlSet.add(value.toUpperCase());
    return true;
  }

  getCountsTagsErrorMessage() {
    return this.countTagsErrorMessage;
  }

  validateCountTags(hashtags) {
    if (hashtags.length > MAX_COUNT_HASHTAGS) {
      this.error(this.getCountsTagsErrorMessage());
      return false;
    }
    return true;
  }

  validateLengthTag(value) {
    if (value.length > MAX_LENGTH_HASHTAG || value.length < MIN_LENGTH_HASHTAG) {
      this.error(this.lengthTagErrorMessage);
      return false;
    }
    return true;
  }

  error(message) {
    this.errorMessages.add(message);
  }
}
class DescriptionValidator {
  constructor(pristine, textarea) {
    this.pristine = pristine;
    this.textarea = textarea;
    this.errorMessages = new Set();
    this.lengthDescriptionErrorMessage = ' Длина описания должна быть в пределах 140 символов';
    this.addValidation();
  }

  validate() {
    this.pristine.validate(this.textarea);
  }

  addValidation() {
    this.pristine.addValidator(this.textarea, (value) => this.validateDescription(value), () => this.getErrorMessages());
  }

  getErrorMessages() {
    return Array.from(this.errorMessages).join(', ');
  }

  validateDescription() {
    this.errorMessages.clear();
    return this.validateLengthDescription(this.textarea.value);
  }

  getLengthDescriptionErrorMessage() {
    return this.lengthDescriptionErrorMessage;
  }

  validateLengthDescription(value) {
    if (!checkLengthString(value, MAX_LENGTH_DESCRIPTION)) {
      this.error(this.getLengthDescriptionErrorMessage());
      return false;
    }
    return true;
  }

  error(message) {
    this.errorMessages.add(message);
  }
}

const hashtag = document.querySelector('.img-upload__field-wrapper  .text__hashtags');
const description = document.querySelector('.img-upload__field-wrapper  .text__description');
const form = document.querySelector('.img-upload__form');


const { openPopup, closePopup } = initPopup(uploadPopupForm, {
  onClose: () => {
    uploadInput.value = '';
    hashtag.value = '';
    description.value = '';

    resetEffect();
    resetScale();
  }
});

function initValid() {
<<<<<<< HEAD
=======
  const hashtag = document.querySelector('.img-upload__field-wrapper  .text__hashtags');
  const description = document.querySelector('.img-upload__field-wrapper  .text__description');
  const form = document.querySelector('.img-upload__form');

>>>>>>> 77812450262519e5e36395b45831b591fb1ab79c
  const pristine = new Pristine(form, {
    classTo: 'img-upload__field-wrapper',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextClass: 'img-upload__field-wrapper',
  });
  new HashTagValidator(pristine, hashtag);
  new DescriptionValidator(pristine, description);

  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (pristine.validate()) {
      sendData(form)
        .then(() => {
          closePopup();
          showSuccessMessage('Удачная загрузка');
        })
        .catch(() => {
          showErrorMessage('Неудачная загрузка');
        });
    }
  });
  hashtag.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      evt.stopPropagation();
    }
  });
  description.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      evt.stopPropagation();
    }
  });
}
<<<<<<< HEAD

const showUploadForm = function () {
  const file = uploadInput.files[0];
  const fileName = file.name.toLowerCase();
  const matchTypes = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (uploadInput.files.length && matchTypes) {
    openPopup();
    showUploadImage();
  } else {
    showErrorMessage('Данный тип изображения не поддерживается');
  }
};

/** The function upload our big image and preview
**/
function showUploadImage() {
  imgUploadPreview.src = URL.createObjectURL(uploadInput.files[0]);

  effectsPreviews.forEach((effectsPreview) => {
    effectsPreview.style.backgroundImage = `url(${imgUploadPreview.src})`;
  });
}
export { showUploadForm, initValid };
=======
const { openPopup, closePopup } = initPopup(uploadPopupForm, {
  onClose: () => {
    uploadInput.value = '';
    resetEffect();
  }
});

export { openPopup as showUploadForm, initValid };
>>>>>>> 77812450262519e5e36395b45831b591fb1ab79c

