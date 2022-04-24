/**
 * 封装成功和失败
 */
module.exports = {
  SUCCESS: (res, data = "SUCCESS") => {
    return res.status(200).json(data);
  },
  ERROR: (res, data = "ERROR") => {
    return res.status(400).json({ errorMsg: data });
  },
};
