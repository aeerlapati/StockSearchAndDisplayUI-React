import {variables as localhostVariables} from './config_localhost';
import {variables as awshostVariables} from './config_aws';


const environment = [
    {key: "localhost", value:localhostVariables},
    {key: "stocksearchanddisplay-react", value:awshostVariables}
]

export const setEnvVariables = (currentPath) => {
    let configs = []
    configs = environment.find(x => currentPath.includes(x.key)).value;
    return configs;
}