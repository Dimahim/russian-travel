// Переменные  для попапа просмотра фотографий
const popupElement = document.querySelectorAll('.popup');
const elementPopupShowImage = document.querySelector('.popup__show_image');
const buttonClosePopup =  document.querySelector('.popup__button');
const imagePopupElement = document.querySelector('.popup__image');
const elementImages = document.querySelectorAll('.page__image');
const elementButton = document.querySelectorAll('.photo-grid__button');

// Переменные для попапа добавления карточек.

const buttonOpenePopup = document.querySelector('.intro__button');
const popupAddCards = document.querySelector('.popup_container_cards'); 
const formAddCards = document.querySelector('.form');

const test = document.querySelectorAll

// добавляем всем элементам атирбуты дата id

let i = 0 ;
elementImages.forEach(function (item) {
  item.setAttribute('data-id', i++);
  
})

// добавляем всем элементам класс
elementImages.forEach(function (item) {
  item.classList.add('photo-item');
});


//функция открытия попапа
function openedPopup (popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc );
  popup.addEventListener('mousedown', closePopupOverlay);
};

//функция закрытия попапа

function closePopup (popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEsc );
  popup.removeEventListener('mousedown', closePopupOverlay);
};


//слушатель открытие попапа всех картинок
  elementImages.forEach(function (element) {
  element.addEventListener('click', showOpenPopup )
});

//Событие на кнопку удаление карточки
elementButton.forEach(function (element){
  element.addEventListener('click',deleteCardsGrid )
})

//пробегаемся по кнопкаам удаления карточек
elementButton.forEach(function (element) {
  element.addEventListener('click', deleteCardsGrid )
});

//функция открытия попапа по конкретной  карточке

function showOpenPopup (event) {
  imagePopupElement.src = event.target.src;
  imagePopupElement.alt = event.target.alt;
  imagePopupElement.data = event.target.getAttribute('data-id');
  openedPopup (elementPopupShowImage);
  
  
};

//функция закрытия попапа по Ecc
function closePopupEsc (evt) {
  const key = evt.key;
  if (key === 'Escape') {
    popupElement.forEach(popup => {
      closePopup (popup);
    })
    
  };
};

//функция закрытия по оверлею и крестику 
function closePopupOverlay (evt) {
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__button_close_icon')) {
    popupElement.forEach(popup => {
      closePopup (popup);
    })
  }
};

//функция удаление карточки 
function deleteCardsGrid (evt) {
  const deleteCards = evt.target.closest('.photo-grid__containet')
  deleteCards.remove();
}
//___________________________________________________________________________Добавление картинок_______________________

//функция открытия попапа для добавления карточек
function openPopupAddCards () {
  openedPopup (popupAddCards);
  hideInputErrors(formAddCards, config);
  toggleButtonState(formAddCards, config);
  formAddCards.reset();
}
// функция открыте попапа добавление карточек
buttonOpenePopup.addEventListener('click', openPopupAddCards );

// Объект с переменными формы
const config = {
  formObject: '.popup__form',
  inputObject: '.form__field',
  submitButtonObject: '.form__button',
  inactiveButtonClass: 'form__button_btn_notactive',
  inputErrorClass: 'form__field_error_active',
  errorClass: 'form__field-error_status_error'
};

//Формула нахождения всех форм

function enableValidation ({formObject, ...rest}) {
  const formList = Array.from(document.querySelectorAll(formObject))
  formList.forEach( function (formElement) {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    })
    setFormEventListeners(formElement, rest)
  })

};

//функция нахождения всех импутов
function setFormEventListeners (formElement, {inputObject, ...rest}) {
  const inputList = Array.from(formElement.querySelectorAll(inputObject));
  inputList.forEach(function (inputElement) {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, rest);
      toggleButtonState(formElement, rest);
    })
  })
}

// функция проверка на валидность
function checkInputValidity (formElement, inputElement, rest) {
  if (!inputElement.validity.valid) {
    showError(formElement, inputElement, inputElement.validationMessage, rest);
  } else {
    hideError(formElement, inputElement, rest);
  }
};

//функция состояния кнопки 
function toggleButtonState(formElement, {submitButtonObject, inactiveButtonClass}) {
  const button = formElement.querySelector(submitButtonObject);
  const isValid = formElement.checkValidity(); // проверка формы на валидность

  if (!isValid) {
    button.classList.add(inactiveButtonClass);
    button.setAttribute("disabled", true);
  } else {
    button.classList.remove(inactiveButtonClass);
    button.removeAttribute("disabled");
  }
};
// Функции: отобразить ошибку ввода

function showError(formElement, inputElement, errorMessage, { inputErrorClass, errorClass }) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  inputElement.classList.add(inputErrorClass);
  errorElement.classList.add(errorClass);
  errorElement.textContent = errorMessage;
}

// Функции: удалить ошибку ввода

function hideError(formElement, inputElement, { inputErrorClass, errorClass }) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = "";
}
// Функции: скрыть ошибки инпутов при открытии формы

function hideInputErrors(formElement, {inputObject, ...rest}) {
  const inputList = formElement.querySelectorAll(inputObject);

  inputList.forEach((inputElement) => {
    hideError(formElement, inputElement, rest);
  });
}

enableValidation(config);
//___________________________________________________реализация перелистывание фотографий в попапе__________________


const buttonLeft = document.querySelector('.popup__button-slider_place_left');
const buttonRight = document.querySelector('.popup__button-slider_place_right');
let containerImagePopup = document.querySelector('.popup__image');
const images = document.querySelectorAll('.photo-item');



function sliseImage () {
  if (imagePopupElement.data >= images.length -1) {
    imagePopupElement.data = -1;
  };
  imagePopupElement.data++ ;
  containerImagePopup.src = images[imagePopupElement.data].src;
};

function sliseImageLeft () {
  if (imagePopupElement.data <= 0) {
    imagePopupElement.data = images.length;
  };
  imagePopupElement.data-- ;
  containerImagePopup.src = images[imagePopupElement.data].src;
  console.log(imagePopupElement.data)
};
 

buttonRight.addEventListener('click',sliseImage);
buttonLeft.addEventListener('click',sliseImageLeft);
