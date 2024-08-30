import { db } from "../../db.js"

export const getCategory  = async (req, res) => {
    const queryText = ` SELECT * FROM "category"`

    try {
        const result = await db.query(queryText);
        res.send(result.rows)
    }
    catch (error) {
        console.log(error)
    }
}

export const createCategory = async (req, res) => {
    const { name, description } = req.body;
  
    const queryText = `
    INSERT INTO "category" (name, description)
    VALUES ($1, $2) RETURNING *`;
  
    try {
      const result = await db.query(queryText, [
        name,
        description,
      ]);
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({error: "DATABASE ERROR"})
    }
  };

  export const updateCategory = async (req, res) => {
    const { id } = req.params;
    const { name, description, currencyType } = req.body;
  
    try {
      const result = await db.query(
        "UPDATE category SET name = $1, description = $2, currencyType = $3 WHERE id = $4 RETURNING *",
        [name, description, currencyType, id]
      );
  
      if (result.rows.length === 0) {
        return res.status(404).send('Category not found');
      }
      else {
        res.json(result.rows[0]);
      }
    } catch (error) {
      console.error('Error executing query', error);
      res.status(500).send('Internal Server Error');
    }
  };

  export const deleteCategory = async (req, res) => {
    const { id } = req.params;
  
    try {
      const result = await db.query(
        "DELETE from category WHERE id = $1 RETURNING *",
        [id]
      );
  
      if (result.rows.length === 0) {
        return res.status(404).send('Category not found');
      }
      else {
        res.json(result.rows[0]);
        res.send("Category deleted successfully")
      }
    } catch (error) {
      console.error('Error executing query', error);
      res.status(500).send('Internal Server Error');
    }
  };