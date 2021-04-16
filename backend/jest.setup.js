const mongoose = require("mongoose");
const MONGO_CONNECT = "mongodb://localhost:27017/facebook"

const clearDB = async() => {
    Object.keys(mongoose.connection.collections).forEach(async key => {
        await mongoose.connection.collections[key].deleteMany({});
    });
};

beforeAll(async() => {
    clearDB();

    await mongoose.connect(
        MONGO_CONNECT, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        },
        err => {
            if (err) {
                console.error(err.message);
                process.exit(1);
            }
            return clearDB();
        }
    );
});

afterEach(() => {
    clearDB();
});