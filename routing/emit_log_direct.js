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

        const message = 'Direct message ' + new Date().getTime()

        const severity = 'info'

        channel.assertExchange(exchange, 'direct', {
            durable: false
        })

        channel.publish(exchange, severity, Buffer.from(message))
    })
})