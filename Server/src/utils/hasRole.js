"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HasRole = function (roles) {
    return function (req, res, next) {
        var userRole = req.currentUser.role;
        if (roles.includes(userRole)) {
            next();
        }
        else {
            return res.status(401).json('Do not have permission');
        }
    };
};
