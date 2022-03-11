
const cases = [];

const postCase = (req, res, next) => {
    const caseName = req.body.caseName;
    cases.push({caseName})
    res
      .status(201)
      .json({ message: `Case is added successfully`, case: caseName });
  }


const getCases = (req, res, next) => {
  res.status(200).json(cases);
}

  module.exports = { postCase , getCases};
 
