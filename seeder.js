const dotenv = require("dotenv");
const users = require("./mock_data/users");
const cards = require("./mock_data/cards");
const User = require("./models/userModel");
const Card = require("./models/cardModel");

const connectDB = require("./config/dbConnect");

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await Card.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);

    const sampleSeller = createdUsers[0]._id;

    const sampleCards = cards.map((card) => {
      return { ...card, createdBy: sampleSeller };
    });

    await Card.insertMany(sampleCards);

    console.log("Data Imported!");
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Card.deleteMany();
    await User.deleteMany();

    console.log("Data Destroyed!");
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
