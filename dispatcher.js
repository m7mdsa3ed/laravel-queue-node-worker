const Queue = require('bull');
const processor = require('./processor')

const queue = new Queue('main');

(async () => await queue.process(processor))();

const dispatcher = async (payload, options) => {
    await queue.add(payload, options)
}

module.exports = {
    dispatcher,
    queue
}