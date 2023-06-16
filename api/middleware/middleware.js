const USERS = require('../users/users-model')

function logger(request, response, next) {
     const
          dts = new Date().toLocaleString(),
          mthd = request.method,
          url = request.originalUrl;

     console.log(`${dts}\t[${mthd}]\trequest sent to ${url}`);


     next();
}

async function validateUserId(request, response, next) {
     const { id } = request.params;
     try {
          const fetchedUser = await USERS.getById(id);
          if (!fetchedUser) {
               response.status(404).json({
                    message: "user not found"
               })
          }
          else {
               request.user = fetchedUser;
               next();
          }
     }
     catch (error) {

     }
}

function validateUser(request, response, next) {
     // DO YOUR MAGIC
}

function validatePost(request, response, next) {
     // DO YOUR MAGIC
}

module.exports = {
     logger,
     validatePost,
     validateUser,
     validateUserId
}