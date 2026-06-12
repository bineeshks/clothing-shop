const { MongoClient } = require('mongodb');

async function updatePrices() {
  // Use the URI from your project
  const uri = 'mongodb+srv://admin:admin123@cluster0.zoxp2.mongodb.net/vellora?retryWrites=true&w=majority&appName=Cluster0';
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db('vellora');
    const productsCollection = db.collection('products');

    const products = await productsCollection.find({}).toArray();
    let count = 0;

    for (const product of products) {
      if (product.price < 1000) { // Assume if it's less than 1000 it's in USD
        const newPrice = product.price * 80;
        await productsCollection.updateOne(
          { _id: product._id },
          { $set: { price: newPrice } }
        );
        count++;
      }
    }
    console.log(`Updated ${count} products in the database.`);
  } catch (err) {
    console.error('Error updating prices:', err);
  } finally {
    await client.close();
  }
}

updatePrices();
