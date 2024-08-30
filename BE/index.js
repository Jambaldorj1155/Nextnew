import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { db } from "./db.js";
import { user } from "./src/router/user.js";
import { category } from "./src/router/category.js";
import { record } from "./src/router/record.js";
import { auth } from "./src/router/auth.js";

const app = express();
const port = 8000;

app.use(bodyParser.json());
app.use(cors());
app.use("/user", user)
app.use("/category", category)
app.use("/record", record)
app.use("/api", auth)


app.get("/installExtension", async (req, res) => { 
  const extensionQueryText = `
  CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
  `;

  try {
    await db.query(extensionQueryText);
    res.send("Extension installed successfully");
  } catch (error) {
    console.error(error);
  }
});

app.get("/createTableUser", async (req, res) => {
  const tableQueryText = `
  CREATE TABLE IF NOT EXISTS "user" (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(50) UNIQUE,
    name VARCHAR(50) NOT NULL,
    password TEXT,
    avatarImg TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    currencyType currency_type DEFAULT 'MNT'
  );
  `;

  try {
    await db.query(tableQueryText);
    res.send("Table 'user' created successfully");
  } catch (error) {
    console.error("Error creating table 'user':", error);
    res.status(500).send("Error creating table 'user'");
  }
});




app.get("/createTableCategory", async (req, res) => {
  const tableQueryText = `
  CREATE TABLE IF NOT EXISTS "category" (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(50) NOT NULL,
    description TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    currencyType currency_type DEFAULT 'MNT'
  );
  `;

  try {
    await db.query(tableQueryText);
    res.send("Table 'CATEGORY' created successfully");
  } catch (error) {
    console.error(error);
  }
});


app.get("/createTableRecord", async (req, res) => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS "record" (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      userId UUID NOT NULL,
      categoryId UUID NOT NULL,
      FOREIGN KEY (userId) REFERENCES "user"(id),
      FOREIGN KEY (categoryId) REFERENCES "category"(id),
      name VARCHAR(50) NOT NULL,
      amount REAL NOT NULL,
      transactionType transaction_type DEFAULT 'INC' NOT NULL,
      description TEXT,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  try {
    await db.query(createTableQuery);    
    res.send("Table 'record' created successfully");
  } catch (error) {
    console.error("Error creating table 'record':", error);
    res.status(500).send("Failed to create table 'record'");
  }
});

// app.post("/users/create", async (req, res) => {
//   const { email, name, password, avatarImg, currencyType } = req.body;

//   const queryText = `
//   INSERT INTO "users" (email, name, password, avatarImg, currencyType)
//   VALUES ($1, $2, $3, $4, $5) RETURNING *`;

//   try {
//     const result = await db.query(queryText, [
//       email,
//       name,
//       password,
//       avatarImg,
//       currencyType
//     ]);
//     res.status(201).json(result.rows[0]);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({error: "DATABASE ERROR"})
//   }
// });

// app.get("/users", async (req, res) => {
//   const queryText = `SELECT * FROM "users"`;

//   try {
//     const result = await db.query(queryText);
//     res.json(result.rows); 
//   } catch (error) {
//     console.error('Error executing query', error);
//     res.status(500).send('Internal Server Error');
//   }
// });


// app.put("/users/:id", async (req, res) => {
//   const { id } = req.params;
//   const { name, email, password } = req.body;

//   try {
//     const result = await db.query(
//       "UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4 RETURNING *",
//       [name, email, password, id]
//     );

//     if (result.rows.length === 0) {
//       return res.status(404).send('User not found');
//     }
//     else {
//       res.json(result.rows[0]);
//     }
//   } catch (error) {
//     console.error('Error executing query', error);
//     res.status(500).send('Internal Server Error');
//   }
// });

// app.delete("/users/:id", async (req, res) => {
//   const { id } = req.params;

//   try {
//     const result = await db.query(
//       "DELETE from users WHERE id = $1 RETURNING *",
//       [id]
//     );

//     if (result.rows.length === 0) {
//       return res.status(404).send('User not found');
//     }
//     else {
//       res.json(result.rows[0]);
//       res.send("User deleted successfully")
//     }
//   } catch (error) {
//     console.error('Error executing query', error);
//     res.status(500).send('Internal Server Error');
//   }
// });

// app.post("/write", (req, res) => {
//   const data = fs.writeFile("./DATA.txt", data, "utf8", (err, content) => {});
//   data.push(req.body);
//   res.send("success");
// });

// app.get("/read", (req, res) => {
//   fs.readFile("./DATA.txt", "utf8", (err, data) => {
//     res.send(data);
//   });
// });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
