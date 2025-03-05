import { createConnection } from "mysql2/promise";

// Function to create a MySQL connection
async function connectToDatabase() {
  return createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });
}

export default async function createOwner(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const data = req.body;
  console.log(data);

  const { name, phone } = data;

  if (!name) {
    return res.status(400).json({
      error: "Name of owner required.",
    });
  }
  try {
    // Connect to the database
    const connection = await connectToDatabase();

    // Execute a query to insert data to the "pet" table
    const [result] = await connection.execute(
      "INSERT INTO pets (name, phone) VALUES (?, ?)",
      [name, phone]
    );

    // Close the database connection
    await connection.end();

    // Respond
    res
      .status(201)
      .json({ id: result.insertId, message: "Owner created successfully" });
  } catch (error) {
    console.error("Error connecting to the database:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
