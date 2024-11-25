const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({ name, email, password: hashedPassword });
        res.status(201).send({ message: 'User registered' });
    } catch (err) {
        res.status(400).send({ error: 'Email must be unique' });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).send({ error: 'Invalid credentials' });
    }
    if (user.status === 'blocked') {
        return res.status(403).send({ error: 'User is blocked' });
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    user.update({ lastLogin: new Date() });
    res.send({ token });
};