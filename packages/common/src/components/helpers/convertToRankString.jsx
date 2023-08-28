const convertToRankString = (number) => {
  switch (parseInt(number) % 10) {
    case 1:
      if (parseInt(number) === 11)
        return `${number}th`
      return `${number}st`;
    case 2:
      if (parseInt(number) === 12)
        return `${number}th`
      return `${number}nd`;
    case 3:
      if (parseInt(number) === 13)
        return `${number}th`
      return `${number}rd`;
    default:
      return `${number}th`;
  }
}

export default convertToRankString;