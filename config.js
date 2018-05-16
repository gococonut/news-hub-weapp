export default class config {
  static env = 'dev'

  static envs = {
    dev: {
      baseUrl: 'localhost:8080/posts'
    },
    staging: {
      baseUrl: 'https://staging-ajax.coconut.com'
    },
    prod: {
      baseUrl: 'https://ajax.coconut.com'
    }
  }

  static getBaseUrl = () => {
    return config.envs[config.env].baseUrl
  }
}
