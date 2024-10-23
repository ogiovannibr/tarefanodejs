const express = require('express');
const { v4: gerarId } = require('uuid');
const app = express();

app.use(express.json());

let registros = [];

app.get('/registros', (req, res) => {
    res.json(registros);
});

app.post('/registros', (req, res) => {
    const { nome, telefone } = req.body;
    const novoRegistro = { id: gerarId(), nome, telefone };
    registros.push(novoRegistro);
    res.status(201).json(novoRegistro);
});

app.put('/registros/:id', (req, res) => {
    const { id } = req.params;
    const { nome, telefone } = req.body;

    const indice = registros.findIndex(r => r.id === id);
    if (indice !== -1) {
        registros[indice] = { id, nome, telefone };
        res.json(registros[indice]);
    } else {
        res.status(404).json({ mensagem: 'Registro não encontrado' });
    }
});

app.delete('/registros/:id', (req, res) => {
    const { id } = req.params;
    const indice = registros.findIndex(r => r.id === id);

    if (indice !== -1) {
        registros.splice(indice, 1);
        res.json({ mensagem: 'Registro removido com sucesso' });
    } else {
        res.status(404).json({ mensagem: 'Registro não encontrado' });
    }
});

const PORTA = 3000;
app.listen(PORTA, () => {
    console.log(`Servidor rodando na porta ${PORTA}`);
});