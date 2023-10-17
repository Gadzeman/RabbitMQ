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

        channel.assertExchange(exchange, 'fanout', { // create an exchange if not exist to avoid the error
            durable: false
        })

        channel.assertQueue('', { // assert queue
            exclusive: true // as exclusive for this worker/receiver/consumer
        }, (error, queue) => {
            if (error) {
                throw error
            }

            console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue.queue);

            channel.bindQueue(queue.queue, exchange, '') // assign this temporary queue to the exchange

            channel.consume(queue.queue, (message) => { // start getting messages from the exchange
                if(message.content) {
                    console.log(" [x] %s", message.content.toString());
                }
            }, {
                noAck: true
            })
        })
    })
})