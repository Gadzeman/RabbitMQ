const amqp = require('amqplib/callback_api');

amqp.connect('amqp://10.0.0.224:5672', (error, connection) => {
    if (error) {
        throw error
    }

    connection.createChannel((error, channel) => {
        if (error) {
            throw error
        }

        const queue = 'task_queue'

        channel.assertQueue(queue, {
            durable: true // means to save the queue even after restart
        })

        channel.prefetch(1) // specify how many tasks the worker can do simultaneously

        channel.consume(queue, (message) => {
            console.log(" [x] Received %s", message.content.toString());

            setTimeout(() => {
                console.log(" [x] Done")

                channel.ack(message) // set queue as acked only when the worker finish
            }, 5000)
        }, {
            noAck: false // don't set queue as acked immediately
        })
    })
})