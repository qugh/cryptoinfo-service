const swapSliderSize = (length: number) => {
  switch (length) {
    case 6:
      return [2, 2, 4]
    case 5:
      return [2, 2, 4]
    case 4:
      return [2, 2, 3]
    case 3:
      return [2, 2, 3]
    case 2:
      return [2, 2, 2]
    case 1:
      return [1, 1, 1]
    default:
      return [2, 2, 3]
  }
}

export default swapSliderSize
