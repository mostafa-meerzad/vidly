const bcrypt = require("bcrypt");

async function run(){

    const salt = await bcrypt.genSalt(5)
    const password = "1234"
    const hashed = await bcrypt.hash(password, salt)
    console.log(salt);
    console.log(hashed)
}

run()