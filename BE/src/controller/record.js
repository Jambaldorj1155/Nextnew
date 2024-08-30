import { db } from "../../db.js";

 import _ from "lodash"

export const getData = async (req, res) => {
  const queryText = "SELECT * FROM record";
  try {
    const result = await db.query(queryText);

    const groupedData = _.groupBy(result.rows, (el) => {
      const moonLanding = new Date(el.createdat);
      return moonLanding.getMonth() + 1;
    });

    const response = _.map(groupedData, (monthRecords, month) => {
      const totalAmount = monthRecords.reduce(
        (acc, record) => {
          if (record.transactiontype === "INC") {
            acc.income += record.amount;
          } else {
            acc.expense += record.amount;
          }
          return acc;
        },
        { income: 0, expense: 0 }
      );
      return { month, ...totalAmount };
 
    });
    res.send(response);
  } catch (error) {
    console.error(error);
  }
};

export const getDesc = async (req, res) => {
    const queryText = "SELECT * FROM record";
    try {
      const result = await db.query(queryText);
  
      const groupedData = _.groupBy(result.rows, (el) => {
        const moonLanding = new Date(el.createdat);
        return [moonLanding]
      });
  
      const response = _.map(groupedData, (monthRecords, month) => {
        const totalAmount = monthRecords.reduce(
          (acc, record) => {
            if (record.transactiontype === "INC") {
              acc.total = record.amount;
            } else if(record.transactiontype === "EXP") {
              acc.total = -record.amount;
            }
            acc.desc = record.description
            return acc;
          },
          { total:0, desc: ""}
        );
        return { month, ...totalAmount };
   
      });
      res.send(response);
    } catch (error) {
      console.error(error);
    }
  };

export const getRecord = async (req, res) => {
    const queryText = `SELECT * FROM "record"`;

    try {
        const result = await db.query(queryText);
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error fetching records:', error.message);
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
};

export const createRecord = async (req, res) => {
    const { userId, categoryId, name, amount, description, transactionType } = req.body;

    const queryText = `
    INSERT INTO "record" (userId, categoryId, name, amount, description, transactionType)
    VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;

    try {
        const result = await db.query(queryText, [
            userId,
            categoryId,
            name,
            amount,
            description,
            transactionType
        ]);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error creating record:', error.message);
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
};

export const updateRecord = async (req, res) => {
    const { id } = req.params;
    const { name, amount, description, transactionType } = req.body;

    try {
        const result = await db.query(
            "UPDATE record SET name = $1, amount = $2, description = $3, transactionType = $4 WHERE id = $5 RETURNING *",
            [name, amount, description, transactionType, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Record not found' });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error('Error updating record:', error.message);
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
};

export const deleteRecord = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await db.query(
            "DELETE FROM record WHERE id = $1 RETURNING *",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Record not found' });
        }
        res.status(200).json({ message: "Record deleted successfully", record: result.rows[0] });
    } catch (error) {
        console.error('Error deleting record:', error.message);
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
};
