const User = require('../models/userModel');

exports.blockUsers = async (req, res) => {
    const { ids } = req.body;
    await User.update({ status: 'blocked' }, { where: { id: ids } });
    res.send({ message: 'Users blocked' });
};

exports.unblockUsers = async (req, res) => {
    const { ids } = req.body;
    await User.update({ status: 'active' }, { where: { id: ids } });
    res.send({ message: 'Users unblocked' });
};

exports.deleteUsers = async (req, res) => {
    const { ids } = req.body;
    await User.destroy({ where: { id: ids } });
    res.send({ message: 'Users deleted' });
};