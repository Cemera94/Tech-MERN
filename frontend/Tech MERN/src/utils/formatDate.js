const formatDate = (date) => {
  return new Date(date).toLocaleDateString('sr-Latn', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
};

export default formatDate;
