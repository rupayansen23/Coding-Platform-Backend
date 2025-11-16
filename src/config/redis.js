const {createClient} = require("redis");

const client = createClient({
    username: 'default',
    password: 'TU1cPElHyd3BogawLDeimR5H46PaLTFV',
    socket: {
        host: 'redis-14536.crce179.ap-south-1-1.ec2.cloud.redislabs.com',
        port: 14536
    }
});

module.exports = client;