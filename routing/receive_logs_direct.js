const amqp = require('amqplib/callback_api');

amqp.connect('amqp://10.0.0.224:5672', (error, connection) => {
    if (error) {
        throw error
    }

    connection.createChannel((error, channel) => {
        if (error) {
            throw error
        }

        const exchange = 'direct_logs'

        channel.assertQueue('', {
            exclusive: true
        }, (error, queue) => {
            if (error) {
                throw error
            }

            channel.assertExchange(exchange, 'direct', {
                durable: false
            })

            channel.bindQueue(queue.queue, exchange, 'info')

            channel.consume(queue.queue, (message) => {
                if (message.content) {
                    console.log(" [x] %s", message.content.toString());
                }
            })
        })
    })
})