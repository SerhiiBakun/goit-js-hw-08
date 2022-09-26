import throttle from 'lodash.throttle';
import { save, load } from './storage.js';

const FORM_KEY = 'feedback-form-state';

const formFeedback = document.querySelector('.feedback-form');

let formData = {};
completeSavedForm();

formFeedback.addEventListener('input', throttle(onFormInput, 500));
formFeedback.addEventListener('submit', onFormSubmit);

function onFormInput(e) {
  formData[e.target.name] = e.target.value;
  save(FORM_KEY, formData);
}

function onFormSubmit(e) {
  e.preventDefault();

  if (!formFeedback['email'].value || !formFeedback['message'].value) {
    alert('Please fill in all fields of the form');
    return;
  }
  console.log(formData);
  e.currentTarget.reset();
  localStorage.removeItem(FORM_KEY);
  formData = {};
}

function completeSavedForm() {
  const savedData = load(FORM_KEY);
  if (savedData) {
    const keys = Object.keys(savedData);
    keys.forEach(key => {
      formData[key] = savedData[key];
      formFeedback[key].value = savedData[key];
    });
  }
}
