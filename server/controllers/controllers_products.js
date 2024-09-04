import fs from 'fs';
import path, { dirname } from 'path';
import { db, bucket } from '../database/firebase.js';

const __dirname = path.resolve();

export const postProducts = async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ error: 'No se ha proporcionado ninguna imagen' });
        }

        console.log(req.files); // Muestra los archivos recibidos en la consola

        const { id, nombre, precio, descripcion, stock, tallas, categoria, colores } = req.body;

        // Validaciones
        if (!id || isNaN(id) || id <= 0) {
            return res.status(400).json({ error: 'ID debe ser un número positivo' });
        }
        if (!nombre || nombre.trim() === '') {
            return res.status(400).json({ error: 'Nombre es requerido' });
        }
        if (!precio || isNaN(precio) || precio <= 0) {
            return res.status(400).json({ error: 'Precio debe ser un número positivo' });
        }
        if (!descripcion || descripcion.trim() === '') {
            return res.status(400).json({ error: 'Descripción es requerida' });
        }
        if (!stock || isNaN(stock) || stock < 0) {
            return res.status(400).json({ error: 'Stock debe ser un número no negativo' });
        }
        if (!tallas || tallas.trim() === '') {
            return res.status(400).json({ error: 'Tallas es requerido' });
        }
        if (!categoria || categoria.trim() === '') {
            return res.status(400).json({ error: 'Categoría es requerida' });
        }
        if (!colores || colores.trim() === '') {
            return res.status(400).json({ error: 'Colores es requerido' });
        }

        const images = req.files;

        // Subir las imágenes a Firebase Storage
        const imageUrls = await Promise.all(images.map(async (image) => {
            try {
                const localFilePath = path.join(__dirname, 'public', 'uploads', image.filename);
                console.log(localFilePath, "789999999999999999999")
                const remoteFilePath = `productos/${image.originalname}`;
                const file = bucket.file(remoteFilePath);

                await file.save(fs.readFileSync(localFilePath), {
                    metadata: {
                        contentType: image.mimetype,
                    },
                });

                // Eliminar archivo local después de subir
                fs.unlinkSync(localFilePath);

                return `https://firebasestorage.googleapis.com/v0/b/chat-react-8a82d.appspot.com/o/productos%2F${image.originalname}?alt=media&token=8b1e9290-8792-44ce-b9a8-e18e223b94bd`;
            } catch (err) {
                console.error('Error en el proceso de subida de imagen:', err);
                throw err;
            }
        }));

        const product = {
            id: parseInt(id),
            nombre,
            precio: parseFloat(precio),
            descripcion,
            stock: parseInt(stock),
            tallas,
            categoria,
            colores,
            imagenes: imageUrls
        };

        await db.collection('productos').add(product);
        console.log("post hecho correctamente")
        res.json({ message: 'Producto subido correctamente', files: imageUrls });
    } catch (error) {
        console.error('Error en postProducts:', error);
        res.status(500).json({ error: error.message });
    }
};


const getImages = (req, res) => {
    const { filename } = req.params;
    const filePath = path.join(__dirname, 'public/uploads', filename);

    res.sendFile(filePath, (err) => {
        if (err) {
            console.error('Error al enviar el archivo:', err);
            res.status(404).json({ error: 'Imagen no encontrada' });
        }
    });
}


const postCuenta = async (req, res) => {
    try {
        console.log(req.body); // Verifica qué datos están llegando
        const { name, correo, celular, direccion, ciudad, pais } = req.body;
        if (!name || !correo || !celular || !direccion || !ciudad || !pais) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }
        
        const account = {
            name,
            correo,
            celular,
            direccion,
            ciudad,
            pais
        }
        console.log(account)
        await db.collection('datosCuenta').doc(correo).set(account);
        res.json({ message: 'Cuenta creada correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};




const postContacto = async (req, res) => {
    try {
        console.log(req.body); // Verifica qué datos están llegando
        const {   name, correo, telefono, asunto } = req.body;
        if (!name || !correo || !telefono || !asunto) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }
        const contact = {
            name,
            correo,
            telefono,
            asunto
        }
        console.log(contact)
        await db.collection('contacto').doc(correo).set(contact);
        res.json({ message: 'Cuenta creada correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const postPagosPedidos = async (req, res) => {
    try {
        const pedidos = Array.isArray(req.body) ? req.body : [req.body];

        for (const pedidoData of pedidos) {
            console.log(pedidoData); 
            const { correo, nombre, celular, direccion, ciudad, pais, ref_payco, precio, talla, color, imagen_estilo, cantidadprodu } = pedidoData;
            
            // Check if all required fields are present
            if (!correo || !nombre || !celular || !direccion || !ciudad || !pais || !ref_payco || !precio || !talla || !color || !imagen_estilo || !cantidadprodu) {
                return res.status(400).json({ error: 'Todos los campos son obligatorios' });
            }

            const pedido = {
                correo,
                nombre,
                celular,
                direccion,
                ciudad,
                pais,
                ref_payco,
                precio,
                talla,
                color,
                imagen_estilo,
                cantidad: cantidadprodu // Adjust to match your field name in the request body
            };

            // Example of storing in Firestore (assuming 'db' is your Firestore instance)
            console.log(pedido);
            await db.collection('pedidosCompras').add(pedido);
        }

        res.json({ message: 'Pedido(s) registrado(s) correctamente' });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



export default {
    postProducts,
    getImages,
    postCuenta,
    postContacto,
    postPagosPedidos
}

