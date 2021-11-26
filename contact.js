const form = document.querySelector(".contact_form");
const form_message = document.querySelector(".form_message");
const form_name = document.querySelector("#name");
const nameError = document.querySelector("#form_name_error");
const form_email = document.querySelector("#email");
const emailError = document.querySelector("#form_email_error");
const form_textarea = document.querySelector("#textarea");
const textareaError = document.querySelector("#form_textarea_error");

const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());

const checkIfFormWasSubmitted = () => {
  if (params.textarea) {
    form_message.textContent = "You have successfully sent the message!";
  }
};
const checkLength = (element, elementError, number, type) => {
  if (element.value.trim().length > number) {
    elementError.textContent = "";
  } else {
    elementError.textContent = `Your ${type} needs more characters`;
  }
};

const checkEmail = (email) => {
  const regEx = /\S+@\S+\.\S+/;
  const patternMatches = regEx.test(email);
  return patternMatches;
};
form.addEventListener("submit", (event) => {
  checkLength(form_name, nameError, 2, "name");
  checkLength(form_textarea, textareaError, 5, "message");
  if (checkEmail(form_email.value)) {
    emailError.textContent = "";
  } else {
    emailError.textContent = "This is not an correct email address";
  }
  if (
    (emailError.textContent != "") |
    (nameError.textContent != "") |
    (textareaError.textContent != "")
  ) {
    event.preventDefault();
  }
});
checkIfFormWasSubmitted();
