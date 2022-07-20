const userModel = require('../../models/userModel.js');
exports.updateRefreshToken = async (userName, refreshToken) => {
  try {
    const user = await userModel.findOneAndUpdate(
      { userName },
      { refreshToken }
    );
    return true;
  } catch (error) {
    console.error('updateRefreshToken:', error);
    return false;
  }
};
