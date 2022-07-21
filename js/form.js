import { initPopup } from './popup.js';
import { sendData } from './query.js';
import { showSuccessMessage, showErrorMessage } from './messages.js';
import { MAX_COUNT_HASHTAGS, MAX_LENGTH_HASHTAG, MIN_LENGTH_HASHTAG, MAX_LENGTH_DESCRIPTION } from './constants.js';
import { resetEffect } from './effects.js';
const uploadPopupForm = document.querySelector('.img-upload__overlay');
const uploadInput = document.querySelector('#upload-file');

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
    this.pristine.addValidator(this.input, (value) => value.length <= 140, () => lengthTagErrorMessage);
  }
  getErrorMessages() {
    return Array.from(this.errorMessages).join(', ');
  }
  validateTags(value) {
    const tags = value.split(' ').filter(Boolean);
    this.tagsTwiceControlSet.clear();
    this.errorMessages.clear();
    const isCountValid = this.validCountTags(tags);
    return isCountValid && tags.reduce((status, value) => status && this.validateTag(value), true);
  }
  validateTag(value) {
    const isTagNeedFormat = this.validateRegexTag(value);
    const isTagNotRepeat = this.validateTwiceTag(value);
    const isLengthValid = this.validLengthTag(value);
    return isTagNeedFormat && isTagNotRepeat && isLengthValid;
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
  validCountTags(hashtags) {
    if (hashtags.length > MAX_COUNT_HASHTAGS) {
      this.error(this.getCountsTagsErrorMessage());
      return false;
    }
    return true;
  }
  validLengthTag(value) {
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
    this.lengthDescrErrorMessage = ' Длина описания должна быть в пределах 140 символов';
    this.addValidation();
  }
  validate() {
    this.pristine.validate(this.textarea);
  }
  addValidation() {
    this.pristine.addValidator(this.textarea, (value) => this.validateDescr(value), () => this.getErrorMessages());
  }
  getErrorMessages() {
    return Array.from(this.errorMessages).join(', ');
  }
  validateDescr(value) {
    this.errorMessages.clear();
    const isLengthValid = this.validLengthDescr(this.textarea);
    return !value || isLengthValid;
  }
  getLengthDescrErrorMessage() {
    return this.lengthDescrErrorMessage;
  }
  validLengthDescr(value) {
    if (value.length > MAX_LENGTH_DESCRIPTION) {
      this.error(this.getLengthDescrErrorMessage());
      return false;
    }
    return true;
  }
  error(message) {
    this.errorMessages.add(message);
  }
}
function initValid() {
  const hashtag = document.querySelector('.img-upload__field-wrapper  .text__hashtags');
  const description = document.querySelector('.img-upload__field-wrapper  .text__description');
  const form = document.querySelector('.img-upload__form');
  const pristine = new Pristine(form, {
    classTo: 'img-upload__field-wrapper',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextClass: 'img-upload__field-wrapper',
  });
  const hashtagValidator = new HashTagValidator(pristine, hashtag);
  const descriptionValidator = new DescriptionValidator(pristine, description);

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
const { openPopup, closePopup } = initPopup(uploadPopupForm, {
  onClose: () => {
    uploadInput.value = '';
    resetEffect();
  }
});
export { openPopup as showUploadForm, initValid };

