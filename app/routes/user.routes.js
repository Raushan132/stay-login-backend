module.exports = (app)=>{
    const users = require('../controllers/user.controller.js');

    app.post("/user",users.save);
}