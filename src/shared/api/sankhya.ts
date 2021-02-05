import xml from 'xml2js';
import axios from 'axios';
import iconv from 'iconv-lite';
import { Buffer } from 'buffer';

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
  baseURL: process.env.SANKHYA_URL,
  headers: {
    'Content-Type': 'text/xml;charset=ISO-8859-1',
  },
  responseType: 'arraybuffer',
});

sankhya.interceptors.response.use(
  async response => {
    const responseDecoded = iconv.decode(
      Buffer.from(response.data),
      'ISO-8859-1',
    );
    const responseJSON = xmlToJson(responseDecoded);

    if (responseJSON.serviceResponse.$.status !== '1') {
      if (responseJSON.serviceResponse.$.status === '3') {
        const config = {
          headers: { 'Content-Type': 'text/xml;charset=ISO-8859-1' },
        };

        const dataLogin = `
          <serviceRequest serviceName="MobileLoginSP.login">
            <requestBody>
              <NOMUSU>${process.env.SANKHYA_USERNAME}</NOMUSU>
              <INTERNO2>${process.env.SANKHYA_PASSWORD}</INTERNO2>
            </requestBody>
          </serviceRequest>
        `;

        const { data: dataResponseLogin } = await axios.post(
          `${process.env.SANKHYA_URL}/mge/service.sbr?serviceName=MobileLoginSP.login`,
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

        const responseRetryDecoded = iconv.decode(
          Buffer.from(dataResponseRetry),
          'ISO-8859-1',
        );
        const responseRetryJSON = xmlToJson(responseRetryDecoded);

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
