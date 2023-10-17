const amqp = require('amqplib/callback_api');

amqp.connect('amqp://10.0.0.224:5672', (error, connection) => {
    if (error) {
        throw error
    }

    connection.createChannel((error, channel) => {
        if (error) {
            throw error
        }

        const exchange = 'exchange'

        const message = 'Exchange message ' + new Date().getTime();

        channel.assertExchange(exchange, 'fanout', { // assert exchange
            durable: false
        })

        channel.publish(exchange, '', Buffer.from(message)) // emit message to specified exchange

        console.log(" [x] Sent %s", message);
    })

    setTimeout(() => {
        connection.close() // close connection after all actions
    },500)
})