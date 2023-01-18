exports.getProducts = (req, res, next) => {
    res.status(200).json({
        success: true,
        message: 'This route will show all the products in database. '
    })
}