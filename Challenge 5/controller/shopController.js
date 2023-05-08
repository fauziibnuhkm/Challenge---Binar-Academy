const { Op } = require('sequelize');
const { shops } = require('../models');

async function getShops(req, res) {
    try {
        const data = await shops.findAll();

        res.status(200).json({
            status: 'success',
            data
        })
    } catch (err) {
        res.status(404).json({
            status: 'failed',
            message: err.message
        })
    }
}

// untuk mencari data shop berdasarkan nama, menggunakan Op.end with : nama terakhir
async function searchShops(req, res) {
    try {
        const data = await shops.findAll({
            where: {
                name: {
                    [Op.substring]: req.query.name
                }
            }
        })

        res.status(200).json({
            status: 'success',
            data
        })
    } catch (err) {
        res.status(404).json({
            status: 'failed',
            message: err.message
        })
    }
}

async function getShopById(req, res) {
    try {
        // Primary Key = PK
        const id = req.params.id;

        if (isNaN(id)) {
            return res.status(400).json({
                status: 'failed',
                message: 'ID harus berupa angka'
            })
        }

        const data = await shops.findByPk(id);

        res.status(200).json({
            status: 'success',
            data
        })
    } catch (err) {
        res.status(404).json({
            status: 'failed',
            message: err.message
        })
    }
}


async function editShop(req, res) {
    try {
        const { name } = req.body;
        const id = req.params.id;

        // Cek apakah nama toko sudah digunakan oleh toko lain
        const shop = await shops.findOne({
            where: { name },
            attributes: ['id']
        });
        if (shop && shop.id !== id) {
            return res.status(400).json({
                status: 'failed',
                message: `Nama toko ${name} sudah digunakan oleh toko lain`
            })
        }

        // Lakukan proses update jika nama toko tersedia
        await shops.update({
            name
        }, {
            where: { id }
        })

        res.status(200).json({
            status: 'success',
            message: `Data dari id ${id} berhasil berubah`
        })
    } catch (err) {
        res.status(400).json({
            status: 'failed',
            message: err.message
        })
    }
}


async function deleteShop(req, res) {
    try {
        const id = req.params.id
        await shops.destroy({
            where: {
                id
            }
        })

        res.status(200).json({
            'status': 'success',
            'message': `data ${id} ini berhasil di hapus`
        })
    } catch (err) {
        res.status(400).message(err.message)
    }
}

async function createShop(req, res) {
    try {
        console.log('ini user dari JWT')
        console.log(req.user.id)
        
        const { name, city } = req.body
        const newShop = await shops.create({
            name,
            city,
            userId : req.user.id,
        })
        res.status(201).json({
            status: 'success',
            data: {
                shop: newShop
            }
        })
    } catch (err) {
        res.status(400).json({
            status: 'failed',
            message: err.message
        })
    }
}

module.exports = {
    getShops,
    getShopById,
    searchShops,
    deleteShop,
    editShop,
    createShop,
}