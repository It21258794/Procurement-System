"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HasRole = (roles) => {
    return (req, res, next) => {
        const userRole = req.currentUser.role;
        if (roles.includes(userRole)) {
            next();
        }
        else {
            return res.status(401).json('Do not have permission');
        }
    };
};
