import pool from "../database/db";

export const getPosts = async () => {
  const result = await pool.query(
    "SELECT u.username, wr.photoPath, f.name, wr.title, wr.description, wr.lng, wr.lat FROM wylowioneRyby wr JOIN " +
      " users u ON wr.user_id = u.id " +
      " JOIN fishes f ON wr.fish_id = f.id;"
  );
  return result.rows.map((row) => ({
    ...row,
    photoURL: `http://localhost:3000/uploads/${row.photopath}`,
  }));
};
export const addPost = async (
  fish: any,
  description: string,
  lng: number,
  lat: number,
  username: string,
  photoPath: string,
  title: string
) => {
  if (!fish.id) {
    fish = (await pool.query(`SELECT id FROM fishes WHERE name='${fish}'`))
      .rows[0];
  }
  const userRow = await pool.query(
    `SELECT id FROM users WHERE username='${username}'`
  );
  const user_id = userRow.rows[0].id;
  return await pool.query(
    "INSERT INTO wylowioneryby (user_id, fish_id, photopath, description, title, lng, lat) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
    [user_id, fish.id, photoPath, description, title, lng, lat]
  );
};
