// const { Variant } = require('../models');

const getAllVariants = async (req, res) => {
  try {
    const variants = await Variant.findAll();
    res.json(variants);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = {
  getAllVariants,
};
