const jwt = require('jsonwebtoken');

const verifyJwt = async (req, res, next) => {
    try {
        const token =  req.header('Authorization');

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized User!!' });
        }

        // Verify the token
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                console.error('JWT Verification Error:', err);
                return res.status(401).json({ message: 'Invalid Token!!' });
            }

            // Attach the decoded payload to the request for further use if needed
            req.user = { id: decoded.userId };

            // Continue to the next middleware or route
            next();
        });
    } catch (error) {
        console.error('JWT Verification Error:', error);
        return res.status(500).json({
            errorMessage: 'Internal Server Error',
        });
    }
};

module.exports = verifyJwt;
