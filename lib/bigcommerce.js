const https = require("https");

let Bigcommerce = {};

Bigcommerce.config = {
  host: "",
  path: "",
  method: "",
  headers: {
    "Content-Type": "application/json",
    Authorization: "",
    Accept: "application/json"
  }
};

Bigcommerce.get = config => {
  return new Promise((resolve, reject) => {
    let request = https.request(config, response => {
      if(response.statusCode === 204) {
          resolve(response.statusCode);
      }
      let data = "";
      response.on("data", chunk => {
        data += chunk;
      });
      response.on("end", () => {
        try {
          data = JSON.parse(data);
          resolve(data);
        } catch (err) {
          console.log(err);
          reject(err);
        }
      });
    });
    request.end();
  });
};
/*Bigcommerce.put = (host, credentials, params, payload) => {
    return new Promise((resolve, reject) => {

        const new_path = '/api/v2/' + params;
        options.path = new_path;
        options.method = 'PUT';
        options.host = host;
        options.headers.Authorization = credentials;
        payload = JSON.stringify(payload);

        const request = https.request(options, response => {
            console.log(options);
            let response_body = {
                bigcommerce_return: ''
            };
            response.on('data', chunk => {
                response_body.bigcommerce_return += chunk;
            });
            response.on('end', () => {
                let data;
                try {
                    data = JSON.parse(response_body.bigcommerce_return);
                } catch (error) {
                    console.log('Cannot parse JSON');
                }
                console.log(response_body);
                if (data) {
                    resolve(data);
                } else {
                    reject('error occured');
                }
            });
        });
        request.write(payload);
        request.end();
    });
};*/

module.exports = Bigcommerce;
