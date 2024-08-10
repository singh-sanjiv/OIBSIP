const Token = require('../models/tokenModel.js');

exports.saveToken = async (req, res) => {
  try {
    const { token, userId } = req.body;
    console.log('Received token from client:', token, 'User ID:', userId);

    // Check if the token already exists
    let tokenDoc = await Token.findOne({ token });
    if (tokenDoc) {
      console.log('Token already exists:', token);
      return res.json({ message: 'Token already exists', token: tokenDoc });
    }

    // Create a new token document
    const newToken = new Token({
      token: token,
      userId: userId // Pass the user ID if you have it
    });

    // Save the token to the database
    const savedToken = await newToken.save();
    console.log('Token saved to database:', savedToken);
    res.json({ message: 'Token received and saved', token: savedToken });
  } catch (error) {
    console.error('Error saving token on server:', error);
    res.status(500).json({ error: 'Error saving token on server' });
  }
};
