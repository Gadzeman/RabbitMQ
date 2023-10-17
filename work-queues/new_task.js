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

        const message = 'Task queue message ' + new Date().getTime();

        channel.assertQueue(queue, {
            durable: true
        })

        channel.sendToQueue(queue, Buffer.from(message), {
            persistent: true // means to save the message in dist as soon as it reach the queue
        })

        console.log(" [x] Sent %s", message);
    })

    setTimeout(() => {
        connection.close()
    },500)
})