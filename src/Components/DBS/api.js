import Axios from 'axios';

// server url
const url = 'http://142.173.12.1:8000'

export const getBusinessTermsRequest = () =>
    Axios.get(`${url}/businessterms`);

export const getDatabaseListRequest = () =>
    Axios.get(`${url}/domains`);

export const getNodesRequest = domainName =>
    Axios.get(`${url}/nodes?domain="${domainName}"`);

export const getRelationshipsRequest = nodeId =>
    Axios.get(`${url}/relationships?node=${nodeId}`);

export const getPropertiesRequest = nodeId =>
    Axios.get(`${url}/properties?node=${nodeId}`);
