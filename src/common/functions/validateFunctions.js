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
  const regExp = new RegExp(/^[a-zA-Z]*$/);

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
