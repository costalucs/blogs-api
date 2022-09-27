module.exports = (post) => {
  const { title, content, categoryIds } = post;
  if (!title || !content || !categoryIds) {
    return {
      type: true,
      message: 'Some required fields are missing',
    };
  }
  return false;
};