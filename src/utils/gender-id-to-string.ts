const genderIdToString = (id: number): string => {
  switch (id) {
    case 0:
      return "未回答";
    case 1:
      return "男性";
    case 2:
      return "女性";
    default:
      return "その他";
  }
};

export default genderIdToString;
