const fs = require("fs");
const { MongoClient } = require("mongodb");

async function importar() {
  const uri = "mongodb+srv://sa:233wAisNSKpjM6E1@cluster0.sfmm0mk.mongodb.net/Cluster0?retryWrites=true&w=majority&appName=Cluster0";
  const client = new MongoClient(uri);

  await client.connect();

  const db = client.db("Cluster0"); // Nome do banco que você quiser

  const json = JSON.parse(fs.readFileSync("./backend/db.json", "utf8"));

  for (const colecao in json) {
    const dados = json[colecao];

    if (Array.isArray(dados)) {
      console.log(`Importando coleção: ${colecao} (${dados.length} registros)`);

      const collection = db.collection(colecao);

      await collection.deleteMany({});
      await collection.insertMany(dados);
    }
  }

  console.log("Importação concluída com sucesso!");
  await client.close();
}

importar().catch(console.error);

