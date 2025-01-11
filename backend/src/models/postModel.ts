import pool from "../database/db";

export const getPosts = async () => {
  const result = await pool.query(
    "SELECT u.username, wr.photoPath, f.name, wr.title, wr.description FROM wylowioneRyby wr JOIN " +
      " users u ON wr.user_id = u.id " +
      " JOIN fishes f ON wr.fish_id = f.id;"
  );
  console.log(result.rows[0].photopath);
  return result.rows.map((row) => ({
    ...row,
    photoURL: `http://localhost:3000/uploads/${row.photopath}`,
  }));
};
