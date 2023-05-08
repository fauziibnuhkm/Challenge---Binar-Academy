module.exports = (role) => {
    return async function (req, res, next) {
        if (req.user.role !== role) {
            // forbidden
            res.status(403).json({
                status: "failed",
                message: `anda tidak berhak akses ini karna anda bukan ${role}`
            })
        } else {
            next()
        }
    }
}