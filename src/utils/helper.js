export const formatMoney = (value, character = '.') =>
  String(value).replace(/\B(?=(\d{3})+(?!\d))/g, character)
