import axios from 'axios';

export default function UseAxios(props) {
  const {url, method, data, headers} = props;
  const configurationObject = {
    method: method,
    url: url,
    headers: headers,
    data: data,
  };

  const promise = new Promise(function (resolve, reject) {
    axios(configurationObject)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
  return promise;
}

export const MethodType = {
  POST: 'post',
  GET: 'get',
  PUT: 'put',
  PATCH: 'patch',
  DELETE: 'delete',
};
