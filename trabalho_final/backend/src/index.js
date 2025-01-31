import express from 'express';
// import bcrypt from 'bcrypt';
import pkg from 'pg';
const { Pool } = pkg;
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

app.use(express.urlencoded({ extended: true })); // Permite interpretar dados de formulários
app.use(express.json()); // Permite interpretar JSON
app.use(cors()); // Permite acesso de outros domínios (front-end)

app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    
    try {
      const result = await pool.query("SELECT * FROM usuario WHERE nome_usuario = $1", [username]);
  
      if (result.rows.length > 0) {
        const user = result.rows[0];
  
        // Comparando diretamente a senha fornecida com a armazenada no banco (sem criptografia)
        if (password === user.senha) {
          return res.status(200).send("Login bem-sucedido!");
        }
      }
  
      res.status(401).send("Usuário ou senha inválidos!");
    } catch (error) {
      console.error(error);
      res.status(500).send("Erro no servidor.");
    }
}); 

// Inicia o servidor na porta 3000
app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
