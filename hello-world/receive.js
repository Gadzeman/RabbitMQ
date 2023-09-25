const amqp = require('amqplib/callback_api');

amqp.connect('amqp://10.0.0.224:5672', (error, connection) => {
    if (error) {
        throw error
    }

    connection.createChannel((error, channel) => {
        if (error) {
            throw error
        }

        const queue = 'hello'

        channel.assertQueue(queue, {
            durable: false
        })

        channel.consume(queue, (message) => {
            console.log(" [x] Received %s", message.content.toString());
        }, {
            noAck: true
        })
    })
})