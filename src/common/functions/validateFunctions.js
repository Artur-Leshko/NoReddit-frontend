//function defines what to do: send request or not, based on errors in `errors` parametr(Object)
export function canBeSubmited(errors) {
  for (let field in errors) {
    if (errors[field].length !== 0) return false;
  }

  return true;
}

//validates register form, returns object of errors
export function validateRegisterForm({ email, username, password, passwordConfirmation, }) {
  const errors = { email: [], username: [], password: [], passwordConfirmation: [], };

  errors.email = [{ ...validateEmail(email), },];
  errors.username = [{ ...validateUsername(username), },];
  errors.password = [{ ...validatePassword(password), },];
  errors.passswordConfirmation = [{ ...validatePasswordConfirmation(password, passwordConfirmation), },];

  removeEmptyObjects(errors);

  return errors;

}

//validates username for profile change
export function validatePostForm({ title, mainText, }) {
  const errors = { title: [], mainText: [], };

  errors.title = [{ ...validateTitle(title), },];
  errors.mainText = [{ ...validateMainText(mainText), },];

  removeEmptyObjects(errors);

  return errors;
}

//validates username for profile change
export function validateUsernameForm(username) {
  const errors = { username: [], };

  errors.username = [{ ...validateUsername(username), },];

  removeEmptyObjects(errors);

  return errors;
}

//validates title for post change
export function validatePostTitle(title) {
  const errors = { title: [], };

  errors.title = [{ ...validateTitle(title), },];

  removeEmptyObjects(errors);

  return errors;
}

//validates text for post change
export function validatePostText(text) {
  const errors = { text: [], };

  errors.text = [{ ...validateMainText(text), },];

  removeEmptyObjects(errors);

  return errors;
}

//validates text for comment change
export function validateCommentText(text) {
  const errors = { text: [], };

  errors.text = [{ ...validateTextForComment(text), },];

  removeEmptyObjects(errors);

  return errors;
}

/*=================================================================================================*/
//     SUPPORTING FUNCTIONS THAT ARE USED TO VALIDATE PARTICULAR PARAMETERS(STRING, LINK, DATE, ETC.)

function removeEmptyObjects(errors) {
  for (let field in errors) {
    errors[field] = errors[field].filter(item => Object.keys(item).length !== 0);
  }
}

// validates email
function validateEmail(email) {
  const errorObj = { errorText: [], id: 'email', };
  const regExp = new RegExp(/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/);

  if (!regExp.test(email)) {
    errorObj.errorText.push('This email is invalid!');
  }

  return errorObj.errorText.length === 0 ? null : errorObj;
}

// validates username
function validateUsername(username) {
  const errorObj = { errorText: [], id: 'username', };
  const regExp = new RegExp(/^[a-zA-Z0-9]*$/);

  if (!username || username.length < 4) {
    errorObj.errorText.push('This field must contain at least 4 characters!');
  }

  if (!regExp.test(username)) {
    errorObj.errorText.push('This field must consist of only latin letters!');
  }

  return errorObj.errorText.length === 0 ? null : errorObj;
}

// validates password
function validatePassword(password) {
  const errorObj = { errorText: [], id: 'password', };

  if (!password || password.length < 6) {
    errorObj.errorText.push('Password must constain at least 6 characters!');
  }

  return errorObj.errorText.length === 0 ? null : errorObj;
}

// validates password confirmation
function validatePasswordConfirmation(password, confPassword) {
  const errorObj = { errorText: [], id: 'passwordConfirmation', };

  if (password !== confPassword) {
    errorObj.errorText.push('Passwords are not matching!');
  }

  return errorObj.errorText.length === 0 ? null : errorObj;
}

// validates title of post
function validateTitle(title) {
  const errorObj = { errorText: [], id: 'title', };

  if (!title || title.length < 6) {
    errorObj.errorText.push('Title must constain at least 6 characters!');
  }

  if (title.length > 20) {
    errorObj.errorText.push('Title can not consist more than 20 characters!');
  }

  return errorObj.errorText.length === 0 ? null : errorObj;
}

// validates mainText of post
function validateMainText(mainText) {
  const errorObj = { errorText: [], id: 'text', };

  if (!mainText || mainText.length < 20) {
    errorObj.errorText.push('Text must constain at least 20 characters!');
  }

  return errorObj.errorText.length === 0 ? null : errorObj;
}

function validateTextForComment(text) {
  const errorObj = { errorText: [], id: 'text', };

  if (!text || text.length < 1) {
    errorObj.errorText.push('Text must constain at least 1 characters!');
  }

  return errorObj.errorText.length === 0 ? null : errorObj;
}
