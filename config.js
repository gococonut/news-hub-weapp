export default class config {
  static env = 'prod'

  static envs = {
    dev: {
      baseUrl: 'http://127.0.0.1'
    },
    prod: {
      baseUrl: 'https://127.0.0.1'
    }
  }

  static getBaseUrl = () => {
    return config.envs[config.env].baseUrl
  }

  static postSources = [
    {
      name: '机核',
      value: 'gameCore',
      tagType: 'primary',
      disabled: false
    },
    {
      name: '游戏时光',
      value: 'vgTime',
      tagType: 'danger',
      disabled: false
    },
    {
      name: 'max+ dota',
      value: 'maxDota',
      tagType: 'primary',
      disabled: false
    },
    {
      name: 'max+ ow',
      value: 'maxOW',
      tagType: 'warn',
      disabled: false
    }
  ]
}
