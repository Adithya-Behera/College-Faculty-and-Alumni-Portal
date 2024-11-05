import jwt from 'jsonwebtoken';

// Define the auth middleware
export const auth = (req, res, next) => {
    try {
        const token = req.body.token ||
        req.header("Authorization").replace("Bearer ", "");; // or req.cookies.token if you want to use cookies
        console.log("token is -->",token);
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token missing"
            });
        }

        // Verify the token
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);

            console.log(decode);

            req.user = decode;
        } catch (e) {
            return res.status(401).json({
                success: false,
                message: "Token is invalid"
            });
        }

        next();
    } catch (err) {
        console.log(err);
        return res.status(401).json({
            success: false,
            message: "Something went wrong while verifying token"
        });
    }
}

// Define the isAdmin middleware
export const isAdmin = (req, res, next) => {
    try {
        if (req.user.role !== "Admin") {
            return res.status(401).json({
                success: false,
                message: "This is a protected route for Admins; you cannot access it"
            });
        }
        next();
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "User Role is not Matching"
        });
    }
}
