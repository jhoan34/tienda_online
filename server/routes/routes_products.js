import { Router } from "express";
import controllers_products from "../controllers/controllers_products.js";
import {upload} from '../middlewares/multer.js'


const router = Router();

// Rutas
router.post("/post/products", upload.array('images', 10), controllers_products.postProducts);
router.get ("/products/images/:filename", controllers_products.getImages);
router.post("/dashboard/cuenta", controllers_products.postCuenta);
router.post("/contacto", controllers_products.postContacto);
router.post("/dashboard/pagos/pedidos", controllers_products.postPagosPedidos);

export default router;
