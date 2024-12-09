const uploadProductPermission = require('../../helpers/permission')
const productModel = require('../../models/productModel')

async function deleteProductController(req,res){
    try{

        if(!uploadProductPermission(req.userId)){
            throw new Error("Permission denied")
        }

        const productId = req.params.id;

        const deletedProduct = await productModel.findByIdAndDelete(productId);

        if (!deletedProduct) {
            return res.status(404).json({ 
              message: "Product not found", 
              error: true, 
              success: false 
            });
          }
        
        res.json({
            message : "Product deleted successfully",
            data : deletedProduct,
            success : true,
            error : false
        })

    }catch(err){
        res.status(400).json({
            message : err.message || err,
            error : true,
            success : false
        })
    }
}


module.exports = deleteProductController