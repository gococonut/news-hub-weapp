export default class config {
  static env = 'dev'

  static envs = {
    dev: {
      baseUrl: 'http://192.168.222.96:9999'
    },
    prod: {
      baseUrl: 'http://192.168.222.96:9999'
    }
  }

  static getBaseUrl = () => {
    return config.envs[config.env].baseUrl
  }
}
