import pool from "../database/db";

export const getFishes = async () => {
  const response = await pool.query("SELECT * FROM fishes");
  return response.rows;
};
export const addFish = async (
  filename: string | undefined,
  name: string,
  wymiarOchronny: number,
  okresRozpoczeciaOchrony: Date,
  okresZakonczeniaOchrony: Date
) => {
  filename = filename ? filename : name;
  const photoPath = `/uploads/${filename}`;
  return await pool.query(
    "INSERT INTO fishes (name, wymiarOchronny, okresRozpoczeciaOchrony, okresZakonczeniaOchrony, imgpath) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [
      name,
      wymiarOchronny,
      okresRozpoczeciaOchrony,
      okresZakonczeniaOchrony,
      photoPath,
    ]
  );
};
