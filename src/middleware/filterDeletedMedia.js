const filterDeletedMedia = async (req, _, next) => {
  req.query.isDeleted = false;
  next();
};

module.exports = filterDeletedMedia;
