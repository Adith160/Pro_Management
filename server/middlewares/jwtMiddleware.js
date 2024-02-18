const jwt = require('jsonwebtoken');

const verifyJwt = async (req, res, next) => {
    try {
        const token =  req.header('Authorization');

        if (!token) {
            return res.status(409).json({ message: 'Unauthorized User!!' });
        }

        // Verify the token
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(409).json({ message: 'Invalid Token!!' });
            }

            // Attach the decoded payload to the request for further use if needed
            req.body.userRefId = decoded.userId;

            // Continue to the next middleware or route
            next();
        });
    } catch (error) {
        console.error('JWT Verification Error:', error);
        return res.status(400).json({
            errorMessage: 'Internal Server Error',
        });
    }
};

module.exports = verifyJwt;
