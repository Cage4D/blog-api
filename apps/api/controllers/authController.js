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
    try {
        const { email, password } = req.body;
        const user = await prisma.user.findUnique({
            where: { email }
        })
        if (!user) return res.status(400).json({ message: "User does not exist" })
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" })
        }
        const { password: _, ...safeUser } = user;
        res.status(200).json(safeUser)
    } catch(err) {
        console.error(err)
        res.status(500).json({ message: "Something went wrong" })
    }
}

async function logout(req, res) {
    res.json("")
}

module.exports = {
    signup,
    login,
    logout,
}