import EmailValidator from "email-validator";

export const ValidateEmail = (email: string): string => {
  if (!EmailValidator.validate(email)) {
    return "有効なメールアドレスを入力してください";
  }
  return "";
};

export const ValidatePassword = (password: string): string => {
  const length = password.length;
  if (length < 6) {
    return "6文字以上のパスワードを入力してください";
  }
  return "";
};
