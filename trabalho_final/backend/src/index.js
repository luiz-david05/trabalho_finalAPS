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

    // Busca o ID do cliente recém-cadastrado
    const newClient = await pool.query(
      "SELECT id_cliente FROM cliente WHERE telefone = $1",
      [telefone]
    );
    req.session.cliente_id = newClient.rows[0].id_cliente;

    console.log("Cliente cadastrado com sucesso!");
    return res.redirect("/cadastrar_pedido");
  } catch (error) {
    console.error("Erro ao cadastrar cliente:", error);
    return res.status(500).send("Erro no servidor.");
  }
});

// Rota para cadastrar pedido
app.get("/cadastrar_pedido", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/cadastrar_pedido.html"));
});

app.post("/cadastrar_pedido", async (req, res) => {
  const id_cliente = req.session.cliente_id;
  const id_atendente = req.session.user_id;

  const { pizzas } = req.body; // Espera um array de pizzas, cada uma com id e quantidade

  try {
    // Inserir pedido na tabela pedido
    const result = await pool.query(
      "INSERT INTO pedido (id_cliente, id_atendente, data_pedido, valor_total) VALUES ($1, $2, CURRENT_DATE, $3) RETURNING id_pedido",
      [id_cliente, id_atendente, 0] // A 'valor_total' será calculada posteriormente
    );

    const id_pedido = result.rows[0].id_pedido;
    let valorTotal = 0;

    // Inserir cada pizza no pedido_pizza
    for (const pizza of pizzas) {
      const { id_item, quantidade } = pizza;

      // Buscar o preço da pizza
      const pizzaResult = await pool.query(
        "SELECT valor FROM pizza WHERE id_pizza = $1",
        [id_item]
      );

      const pizzaValor = pizzaResult.rows[0].valor;
      valorTotal += pizzaValor * quantidade; // Calculando o valor total do pedido

      // Inserir a pizza no pedido_pizza
      await pool.query(
        "INSERT INTO pedido_pizza (id_pedido, id_pizza, quantidade) VALUES ($1, $2, $3)",
        [id_pedido, id_item, quantidade]
      );
    }

    // Atualizar o valor total do pedido
    await pool.query(
      "UPDATE pedido SET valor_total = $1 WHERE id_pedido = $2",
      [valorTotal, id_pedido]
    );

    console.log("Pedido cadastrado com sucesso!");
    // return res.redirect("/resumo_pedido");
  } catch (error) {
    console.error("Erro ao cadastrar pedido:", error);
    return res.status(500).send("Erro no servidor.");
  }
});

app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
