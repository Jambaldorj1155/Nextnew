import { db } from "../../db.js";
import bcrypt from 'bcrypt';

export const signUp = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const queryText = `
        INSERT INTO "user" (name, email, password )
        VALUES ($1, $2, $3) RETURNING *`;

        const result = await db.query(queryText, [
            name, 
            email,
            hashedPassword, 
        ]);

        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        return res.status(404).json({ error: "Database error" });
    }
};

export const signIn = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }

    try {
        const queryText = 'SELECT * FROM "user" WHERE email = $1';
        const result = await db.query(queryText, [email]);

        if (result.rows.length === 0) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        const user = result.rows[0];
        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(401).json({ error: "Invalid email or password" });
        }
        res.status(200).json({ success: true, user: user});

    } catch (err) {
        console.error(err);
        return res.status(404).json({ error: "Database error" });
    }
};
