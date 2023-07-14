const bcrypt = require("bcrypt");
// to hash a password we need a salt which is a random string added at the beginning or end of a hashed password
// the more the number of rounds given to genSalt the more complex the salt
// we also need to use the original salt to decode the hashed password for authorization stuff
async function run(){

    const salt = await bcrypt.genSalt(5)
    const password = "1234"
    const hashed = await bcrypt.hash(password, salt)
    console.log(salt);
    console.log(hashed)
}

run()