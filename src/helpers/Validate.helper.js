const isEmptyString = (value) => {
  return typeof value === 'string' && value.length === 0 ? true : false;
};

module.exports = {
  isEmptyString
};