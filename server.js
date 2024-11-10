const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "Workout_Tracker",
  password: "postgres", // Change to your password
  port: 5432, // Default Port
});

const generateToken = (user) => {
  // User information to include in the token payload
  const payload = {
    userId: user.id, // Include the user's ID
    username: user.username, // Optionally include username or other info
  };

  // Secret key for signing the token (keep this safe and secure)
  const secretKey = "testKey";

  // Options for token, e.g., expiration time
  const options = {
    expiresIn: "1h", // Token will expire in 1 hour
  };

  // Generate the token
  const token = jwt.sign(payload, secretKey, options);
  return token; // Return the generated token
};
app.post("/api/benchPR", async (req, res) => {
  const { weight, user_id, latitude, longitude, date } = req.body;

  try {
    // Check if a bench PR record already exists for the user
    const benchPRExists = await pool.query(
      "SELECT * FROM bench_pr WHERE user_id = $1",
      [user_id]
    );

    let result;
    if (benchPRExists.rows.length > 0) {
      // Update the existing record
      result = await pool.query(
        "UPDATE bench_pr SET weight = $1, latitude = $2, longitude = $3, date = $4 WHERE user_id = $5 RETURNING *",
        [weight, latitude, longitude, date, user_id]
      );
    } else {
      // Insert a new record
      result = await pool.query(
        "INSERT INTO bench_pr (weight, user_id, latitude, longitude, date) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [weight, user_id, latitude, longitude, date]
      );
    }

    res.status(201).json({
      message: "Bench PR recorded successfully",
      benchPR: result.rows[0],
    });
  } catch (error) {
    console.error("Error handling bench PR:", error);
    res.status(500).json({ error: "Failed to process bench PR" });
  }
});
app.get("/api/leaderboard", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM bench_pr ORDER BY weight LIMIT 10"
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error retrieving leaderboard:", error);
    res.status(500).json({ error: "Failed to retrieve leaderboard" });
  }
});
app.post("/api/squatPR", async (req, res) => {
  const { weight, user_id, latitude, longitude, date } = req.body;

  // Check if a bench PR record already exists for the user
  try {
    const squatPRExists = await pool.query(
      "SELECT * FROM squat_pr WHERE user_id = $1",
      [user_id]
    );
    let result;
    if (squatPRExists.rows.length > 0) {
      // Update the existing record
      result = await pool.query(
        "UPDATE squat_pr SET weight = $1, latitude = $2, longitude = $3, date = $4 WHERE user_id = $5 RETURNING *",
        [weight, latitude, longitude, date, user_id]
      );
    } else {
      // Insert a new record
      result = await pool.query(
        "INSERT INTO squat_pr (weight, user_id, latitude, longitude, date) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [weight, user_id, latitude, longitude, date]
      );
    }

    res.status(201).json({
      message: "Squat PR recorded successfully",
      squatPR: result.rows[0],
    });
  } catch (error) {
    if (error.code === "23503") {
      // PostgreSQL error code for foreign key violation
      res.status(400).json({ error: "Invalid user_id: User does not exist" });
    } else {
      console.error("Error inserting squat PR:", error);
      res.status(500).json({ error: "Failed to add squat PR" });
    }
  }
});
app.post("/api/deadliftPR", async (req, res) => {
  const { weight, user_id, latitude, longitude, date } = req.body;
  try {
    // Check if a bench PR record already exists for the user
    const deadliftPRExists = await pool.query(
      "SELECT * FROM deadlift_pr WHERE user_id = $1",
      [user_id]
    );

    let result;
    if (deadliftPRExists.rows.length > 0) {
      // Update the existing record
      result = await pool.query(
        "UPDATE deadlift_pr SET weight = $1, latitude = $2, longitude = $3, date = $4 WHERE user_id = $5 RETURNING *",
        [weight, latitude, longitude, date, user_id]
      );
    } else {
      // Insert a new record
      result = await pool.query(
        "INSERT INTO deadlift_pr (weight, user_id, latitude, longitude, date) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [weight, user_id, latitude, longitude, date]
      );
    }

    res.status(201).json({
      message: "deadlift PR recorded successfully",
      benchPR: result.rows[0],
    });
  } catch (error) {
    if (error.code === "23503") {
      // PostgreSQL error code for foreign key violation
      res.status(400).json({ error: "Invalid user_id: User does not exist" });
    } else {
      console.error("Error inserting deadlift PR:", error);
      res.status(500).json({ error: "Failed to add deadlift PR" });
    }
  }
});
app.post("/api/resetemail", async (req, res) => {
  const { email } = req.body;

  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (result.rows.length === 0) {
      return res.status(404).send("Email not found");
    }

    const user = result.rows[0];

    const token = crypto.randomBytes(20).toString("hex");
    const expiryDate = Math.floor(Date.now() / 1000) + 3600; // Now in seconds

    await pool.query(
      "UPDATE users SET recovery_token = $1, recovery_expiry = to_timestamp($2) WHERE id = $3",
      [token, expiryDate, user.id]
    );

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "lelandhenderson31415@gmail.com",
        pass: "qyhn uthy kzxr uzpq",
      },
    });

    const mailOptions = {
      from: "lelandhenderson31415@gmail.com",
      to: email,
      subject: "Password Recovery",
      text: `You requested a password reset. Input the following code to reset your password: ${token}`,
    };

    await transporter.sendMail(mailOptions);
    res.send("Recovery email sent");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error sending email");
  }
});

app.post("/api/reset", async (req, res) => {
  const { newPassword, passwordResetToken } = req.body;

  try {
    const result = await pool.query(
      "SELECT * FROM users WHERE recovery_token = $1 AND recovery_expiry > to_timestamp($2)",
      [passwordResetToken, Math.floor(Date.now() / 1000)]
    );

    if (result.rows.length === 0) {
      return res.status(400).send("Invalid or expired token");
    }

    const user = result.rows[0];

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user password and clear recovery token
    await pool.query(
      "UPDATE users SET password = $1, recovery_token = NULL, recovery_expiry = NULL WHERE id = $2",
      [hashedPassword, user.id]
    );

    res.send("Password updated successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error resetting password");
  }
});

app.get("/api/workout", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM workout");
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching workouts" });
  }
});
app.get("/api/getexercise", async (req, res) => {
  const { workoutId } = req.query;
  try {
    const result = await pool.query(
      "SELECT * FROM exercise JOIN workout_exercises ON workout_exercises.exercise_id = exercise.id WHERE workout_exercises.workout_id =$1",
      [workoutId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching uses" });
  }
});
app.post("/api/register", async (req, res) => {
  let { username, password, email } = req.body;

  try {
    const userExists = await pool.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );
    if (userExists.rows.length > 0) {
      return res.status(400).json({ message: "Username already taken!" });
    }
    const emailExists = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    if (emailExists.rows.length > 0) {
      return res.status(400).json({ message: "Email already taken!" });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user into the database
    await pool.query(
      "INSERT INTO users (username, password,email) VALUES ($1, $2,$3) RETURNING id",
      [username, hashedPassword, email]
    );

    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).json({ message: "Server error" });
  }
});
app.get("/api/workoutandexercises", async (req, res) => {
  const { workout_id } = req.query;
  try {
    const result = await pool.query(
      "SELECT * FROM exercise JOIN workout_exercises ON workout_exercises.exercise_id = exercise.id WHERE workout_exercises.workout_id =$1",
      [workout_id]
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).json({ message: "Server error" });
  }
});
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const query = 'SELECT * FROM "users" WHERE username = $1';
    const values = [username];

    const result = await pool.query(query, values);
    const user = result.rows[0];
    const hashedPassword = user.password;
    const isMatch = await bcrypt.compare(password, hashedPassword);

    /* if (user.password !== hashedPassword) {
      return res.status(401).json({ message: "Invalid username or password" });
    }*/

    // Successful login
    if (isMatch) {
      const token = generateToken(user);
      res
        .status(200)
        .json({ message: "Login successful", userId: user.id, token });
    } else {
      return res.status(401).json({ message: "Invalid username or password" });
    }
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/api/addexercise", async (req, res) => {
  const { exercise, sets, reps, weight } = req.body;
  console.log(exercise);
  try {
    const result = await pool.query(
      "INSERT INTO exercise (exercise, sets, reps, weight) VALUES ($1, $2, $3, $4) RETURNING id,exercise,sets,reps,weight",
      [exercise, sets, reps, weight]
    );
    const newExerciseFromDb = result.rows[0];
    res.status(201).json(newExerciseFromDb);
  } catch (error) {
    console.error(error);
  }
});
app.post("/api/workouts", async (req, res) => {
  const { name } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO workout (name) VALUES ($1) RETURNING id",
      [name]
    );
    const workout = result.rows[0].id;
    return res.status(201).json({ id: workout });
  } catch (error) {
    console.error("Error inserting workout:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
app.post("/api/workout_exercises", async (req, res) => {
  const { workout_id, exercise_id } = req.body;
  try {
    await pool.query(
      "INSERT INTO workout_exercises (workout_id,exercise_id) VALUES ($1,$2)",
      [workout_id, exercise_id]
    );
    res.status(201).json({ message: "Workout added succesfully!" });
  } catch (error) {
    console.error(error);
  }
});

app.delete("/api/removeexercise", async (req, res) => {
  const { id } = req.body;
  try {
    await pool.query("DELETE FROM exercise WHERE id = $1", [id]);
  } catch (error) {
    console.error("Error deleting exercise", error);
    res.status(500).json({ message: "Server error" });
  }
});
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
