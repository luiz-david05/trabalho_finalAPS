import express from "express";
import pkg from "pg";
const { Pool } = pkg;
import cors from "cors";
import dotenv from "dotenv";
import session from "express-session";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "../public")));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

// Rota de login
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/login.html"));
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await pool.query(
      "SELECT * FROM atendente WHERE nome_atendente = $1",
      [username]
    );

    if (result.rows.length === 0) {
      console.log("Usuário não encontrado!");
      return res.redirect("/login");
    }

    const user = result.rows[0];

    if (user.senha !== password) {
      console.log("Senha incorreta!");
      return res.redirect("/login");
    }

    console.log("Usuário logado com sucesso!");
    return res.redirect("/cadastrar_cliente");
  } catch (error) {
    console.error("Erro ao logar usuário:", error);
    return res.status(500).send("Erro no servidor.");
  }
});

app.get("/cadastrar_cliente", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/cadastrar_cliente.html"));
});

// Rota para cadastrar cliente
app.post("/cadastrar_cliente", async (req, res) => {
  const { nome, bairro, telefone } = req.body;

  try {
    const existingClient = await pool.query(
      "SELECT id_cliente FROM cliente WHERE telefone = $1",
      [telefone]
    );

    if (existingClient.rows.length > 0) {
      console.log("Cliente já cadastrado, redirecionando...");
      req.session.cliente_id = existingClient.rows[0].id_cliente;
      return res.redirect("/cadastrar_pedido");
    }

    await pool.query(
      "INSERT INTO cliente (nome, bairro, telefone) VALUES ($1, $2, $3)",
      [nome, bairro, telefone]
    );

    console.log("Cliente cadastrado com sucesso!");
    return res.redirect("/cadastrar_pedido");
  } catch (error) {
    console.error("Erro ao cadastrar cliente:", error);
    return res.status(500).send("Erro no servidor.");
  }
});

app.get("/cadastrar_pedido", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/cadastrar_pedido.html"));
});



app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
