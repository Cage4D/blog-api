const prisma = require("../../../prisma/client")
const bcrypt = require("bcryptjs")

async function signup(req, res) {
    try {
        const { email, username, password } = req.body;
        if (!email || !username || !password) {
            res.status(400).json({ message: "All fields are required" })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await prisma.user.create({
            data: {
                email,
                username,
                password: hashedPassword,
            }
        })

        const { password: _, ...userWithoutPassword } = user;
        res.status(201).json(userWithoutPassword)
    } catch (err) {
        if (err.code === "P2002") {
            return res.status(400).json({ message: "Email or username already exists" })
        }
        res.status(500).json({ message: "Something went wrong" })
    }
}

async function login(req, res) {
    res.json("")
}

async function logout(req, res) {
    res.json("")
}

module.exports = {
    signup,
    login,
    logout,
}