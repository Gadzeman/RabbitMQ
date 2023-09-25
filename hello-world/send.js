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

        const message = 'Hello world'

        channel.assertQueue(queue, {
            durable: false
        })

        channel.sendToQueue(queue, Buffer.from(message))

        console.log(" [x] Sent %s", message);
    })

    setTimeout(() => {
        connection.close()
    },500)
})