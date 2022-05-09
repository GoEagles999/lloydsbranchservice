const axios = require('axios');
const Joi = require('joi');
const schema = Joi.string().min(1).max(30);

const getBranch = async (req, res) => {
  let branchData;
  const location = req.headers['lbg-txn-branch-location'];
  let branchesForLocation = [];
  const isHeaderValid = (_) => {
    if (location) {
      const { error } = schema.validate(location);
      if (error) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  };
  const getBranchData = async (_) => {
    let resp = await axios.get(
      'https://api.lloydsbank.com/open-banking/v2.2/branches'
    );
    branchData = resp;
  };
  const filterData = (_) => {
    for (const branch of branchData.data.data[0].Brand[0].Branch) {
      if (branch.PostalAddress?.TownName == location.toUpperCase())
        branchesForLocation.push(branch);
    }
  };
  const isValid = isHeaderValid();
  if (!isValid) {
    res.json({ res: 'invalid input' });
    return;
  }
  await getBranchData();
  filterData();
  if (branchesForLocation) {
    res.json({ res: branchesForLocation });
  } else {
    res.json({ res: 'not found' });
  }
};

module.exports = getBranch;
