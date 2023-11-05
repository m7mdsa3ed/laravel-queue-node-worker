const axios = require("axios");

const job = async ({jobs}) => {
    const requests = jobs.map(job => axios.post(process.env.LARAVEL_QUEUE_HANDLER_URL, {
        payload: job,
        connectionName: "redis"
    }, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
        }
    }));

    try {
        await axios.all(requests);
    } catch (error) {
        console.log(error.response.data);
    }
}

module.exports = job