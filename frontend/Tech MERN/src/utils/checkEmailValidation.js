const regExEmail = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}/;

export const checkEmailValidation = (email) => {
  console.log(regExEmail.test(email));
  return regExEmail.test(email);
};
