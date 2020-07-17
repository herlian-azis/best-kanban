const { OAuth2Client } = require('google-auth-library')

const client = new OAuth2Client(process.env.CLIENT_ID)

module.exports = (req, res, next) => {
    console.log(req.headers,'cekkk goole');
    client.verifyIdToken({
        idToken: req.headers.idtoken,
        audience: process.env.CLIENT_ID
    })
    .then(verified=>{
        req.payload = verified.getPayload()
        console.log(req.payload);
        next()
    })
    .catch(err=>{
        res.status(500).json(err)
        console.log(err);
    })
}

// function verificationToken(token) {
//     const { OAuth2Client } = require("google-auth-library");
//     const client = new OAuth2Client(process.env.CLIENT_ID);
//     return new Promise((resolve, reject) => {
//         async function verify() {
//             const ticket = await client.verifyIdToken({
//                 idToken: token,
//                 audience: process.env.CLIENT_ID,
//             });
//             const payload = ticket.getPayload();
//             resolve(payload);
//         }
//         verify().catch(reject);
//     });
// }
// module.exports = verificationToken;