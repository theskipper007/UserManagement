const Hapi = require('hapi');
const Routes = require('./routes/index');
const db = require('./models');
const UserController = require('./controllers/user')


const server = new Hapi.Server();

const init = async () => {
    server.connection({
        host: 'localhost',
        port: 3000,
    })

const users = {
    john: {
        username: 'john',
        password: 'secret123',   
        id: '2133d32a',
        name: 'John'
    }
};

db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

    const validate = (request, username, password,callback) => {
        console.log('trere',username,password);
        const user = users[username];
    if (!user) {
        return callback(null,false);
    }
    else if (user.username === username && user.password === password){
        return callback(null, true , { id: user.id, name: user.name });
    }
    callback(null,false)
    }
    
    server.register(require('hapi-auth-basic'), (err) => {
        
        server.auth.strategy('simple', 'basic', { validateFunc : validate })
        server.route(Routes)
        server.start();
        console.log('Server running @3000');
    }

    )};

init();

