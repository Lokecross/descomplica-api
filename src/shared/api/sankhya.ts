import xml from 'xml2js';
import axios from 'axios';

const parser = new xml.Parser({});

const xmlToJson = (xmlData: string): any => {
  let res;

  parser.parseString(xmlData, (err: any, result: any) => {
    if (err) {
      throw new Error('xml error');
    }
    res = result;
  });

  return res;
};

const sankhya = axios.create({
  baseURL: 'http://179.185.76.202:9697/',
  headers: {
    'Content-Type': 'text/xml;charset=ISO-8859-1',
  },
});

sankhya.interceptors.response.use(
  async response => {
    const responseJSON = xmlToJson(response.data);

    if (responseJSON.serviceResponse.$.status !== '1') {
      if (responseJSON.serviceResponse.$.status === '3') {
        const config = {
          headers: { 'Content-Type': 'text/xml;charset=ISO-8859-1' },
        };

        const dataLogin = `
          <serviceRequest serviceName="MobileLoginSP.login">
            <requestBody>
              <NOMUSU>facilita</NOMUSU>
              <INTERNO2>5da71a4c8f998f2db08cbe96cb05c25d</INTERNO2>
            </requestBody>
          </serviceRequest>
        `;

        const { data: dataResponseLogin } = await axios.post(
          'http://179.185.76.202:9697/mge/service.sbr?serviceName=MobileLoginSP.login',
          dataLogin,
          config,
        );

        const responseLoginJSON = xmlToJson(dataResponseLogin);

        if (responseLoginJSON.serviceResponse.$.status !== '1') {
          return Promise.reject(responseJSON);
        }

        sankhya.defaults.headers.Cookie = `JSESSIONID=${responseLoginJSON.serviceResponse.responseBody[0].jsessionid[0]}`;

        response.config.headers.Cookie = `JSESSIONID=${responseLoginJSON.serviceResponse.responseBody[0].jsessionid[0]}`;

        const { data: dataResponseRetry } = await axios(response.config);

        const responseRetryJSON = xmlToJson(dataResponseRetry);

        if (responseRetryJSON.serviceResponse.$.status !== '1') {
          return Promise.reject(responseRetryJSON);
        }

        return responseRetryJSON;
      }

      return Promise.reject(responseJSON);
    }

    return responseJSON;
  },
  error => {
    return Promise.reject(error);
  },
);

export default sankhya;
