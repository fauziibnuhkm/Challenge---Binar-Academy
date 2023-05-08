const { users, shops } = require('../models');
// import bcrypt untuk authentication
const bcrypt = require('bcrypt');
// import jsonwebtoken sbg authorization
const jwt = require('jsonwebtoken');

async function getUsers(req, res) {
    try {
        const data = await users.findAll();

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

async function getUserById(req, res) {
    try {
        // Validasi agar ID harus berupa angka
        const id = Number(req.params.id);
        if (isNaN(id)) {
            throw new Error('ID harus berupa angka');
        }

        const data = await users.findByPk(id, {
            include: {
                model: shops,
                attributes: ['name']
            }
        });

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


async function editUser(req, res) {
    try {
        const { username } = req.body;
        const id = req.params.id;

        // Cek apakah username sudah digunakan oleh user lain
        const user = await users.findOne({
            where: { username },
            attributes: ['id']
        });
        if (user && user.id !== id) {
            return res.status(400).json({
                status: 'failed',
                message: `Username ${username} sudah digunakan oleh user lain`
            })
        }

        // Lakukan proses update jika username aman
        await users.update({
            username
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



async function deleteUser(req, res) {
    try {
        const id = req.params.id
        await users.destroy({
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

async function createUser(req, res) {
    try {
        const { username, password } = req.body

        // validasi agar username dan password tidak kosong
        if (!username) {
            throw new Error('Username tidak boleh kosong')
        }
        if (!password) {
            throw new Error('Password tidak boleh kosong')
        }

        // validasi cek apakah username sudah ada di dalam database
        const existUser = await users.findOne({ where: { username } })
        if (existUser) {
            throw new Error('Username sudah digunakan')
        }

        // validasi agar password lebih dari 5 huruf
        if (password.length < 6) {
            throw new Error('Password harus lebih dari 5 huruf')
        }

        // proses enkripsi password menggunakan bcrypt
        const hashedPassword = bcrypt.hashSync(password, 10);

        const newUser = await users.create({
            username,
            password: hashedPassword,
            role: req.body.role
        })
        res.status(201).json({
            status: 'success',
            data: {
                user: newUser
            }
        })
    } catch (err) {
        res.status(400).json({
            status: 'failed',
            message: err.message
        })
    }
}



async function login(req, res) {
    try {
        const { username, password } = req.body

        // cari user berdasarkan username
        const user = await users.findOne({
            where: {
                username
            }
        })

        // validasi kalau user nya gk ada
        if (!user) {
            res.status(404).json({
                status: 'failed',
                message: `username salah`
            })
        } else if(user && bcrypt.compareSync(password, user.password)) {
            // check password dari request body sesuai gak sama hashed password dari database 

            // generate TOKEN utk user 
            const token = jwt.sign({
                id: user.id,
                username: user.username,
                role: user.role
            }, 'rahasia')

            res.status(200).json({
                status: 'success',
                data: {
                    user,
                    token
                }
            })
        } else {
            // jika password salah
            res.status(401).json({
                status: 'failed',
                message: `Password salah`
            })
        }  
    } catch (err) {
        res.status(400).json({
            status: 'failed',
            message: err.message
        })
    }
}


module.exports = {
    getUsers,
    getUserById,
    deleteUser,
    editUser,
    createUser,
    login,
}