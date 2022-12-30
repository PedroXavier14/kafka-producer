const { Kafka } = require('kafkajs')
const {randomUUID} = require('node:crypto');


async function bootstrap() {
    const kafka = new Kafka({
        clientId: 'kafka-producer-notification',
        brokers: ['wise-python-6535-us1-kafka.upstash.io:9092'],
        sasl: {
            mechanism: 'scram-sha-256',
            username: 'USERNAME',
            password: 'PASSWORD',
        },
        ssl: true,
    });

    const producer = kafka.producer();

    await producer.connect();
    await producer.send({
        topic: 'notifications.send-notification',
        messages: [
            {
                value: JSON.stringify({
                    content: 'hello world',
                    category: 'social',
                    recipientId: randomUUID()
                })
            }
        ]
    });

    await producer.disconnect();

}

bootstrap();