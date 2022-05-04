const express = require('express');
const axios = require('axios').default;
const app = express()
app.use(express.json())
const port = 3000
var fs = require("fs");

app.post('/*', (req, res) => {

    let headerAuth = req.headers.authorization
    let url = req.url.slice(1)

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': headerAuth,
            'Accept-Encoding': 'gzip, deflate, br',
        }
    }

    const sendPostRequest = async () => {
        try {
            const resp = await axios.post(url, req.body, config);

            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify(resp.data))

            writeToFile('Post', url, req.headers, req.body, resp.headers, resp.data)

        } catch (err) {
            console.error(err);
        }
    };
    sendPostRequest();
})

app.get('/*', (req, res) => {

    let headerAuth = req.headers.authorization
    let url = req.url.slice(1)

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': headerAuth,
            'Accept-Encoding': 'gzip, deflate, br',
        }
    }

    axios.get(url, config)
        .then(resp => {
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify(resp.data))

            writeToFile("Get", url, req.headers, req.body, resp.headers, resp.data)

        })
        .catch(err => {
            // Handle Error Here
            console.error(err);
        });
})

function writeToFile(RequestType, RequestUrl, RequestHeaders, RequestBody, ResponseHeaders, ResponseBody) {
    fs.writeFileSync(`${__dirname}\\data\\${RequestType}-${Math.floor(Date.now() / 1000)}.json`,
        "Request towards: \n" + RequestUrl +
        "\n\nRequest Headers: \n" + JSON.stringify(RequestHeaders, null, 2) +
        "\nRequest Body: \n" + JSON.stringify(RequestBody, null, 2) +
        "\nResponse Headers: \n" + JSON.stringify(ResponseHeaders, null, 2) +
        "\nResponse Body: \n" + JSON.stringify(ResponseBody, null, 2))

        const listenFileCreation = document.getElementById('listenFileCreation');
        listenFileCreation.innerHTML = `${RequestType}-${Math.floor(Date.now() / 1000)}.json has been created`

}

const startBtn = document.getElementById('startBtn');
const listenMessage = document.getElementById('listenMessage');

startBtn.onclick = e => {
    app.listen(port, () => {
        console.log(`Listening on http://127.0.0.1:${port}/`)
        listenMessage.innerHTML = `Listening on http://127.0.0.1:${port}/`

        startBtn.classList.add('is-danger');
        startBtn.innerText = 'Proxy is running';
        startBtn.disabled = true
    })
};