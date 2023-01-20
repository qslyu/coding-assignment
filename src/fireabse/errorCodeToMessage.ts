const errorCodeToMessage = (code: string) => {
  console.log(code);
  switch (code) {
    case "auth/user-not-found":
      return "ユーザーが見つかりません。";
    case "auth/wrong-password":
      return "パスワードが違います。";
    case "auth/email-already-in-use":
      return "このメールアドレスは登録済みです。";
    default:
      return "エラーが発生しました。";
  }
};

export default errorCodeToMessage;
