function isAdmin(req, res, next) {
    if (!req.user.isAdmin) return res.status(403).send("access denied");
    next()
}

exports.isAdmin = isAdmin