import regeneratorRuntime from './lib/regenerator.js'
import wx from './wx'

export default class TimeUtil {
  static MINUTE_SECONDS = 60
  static HOUR_SECONDS = 60 * 60
  static DAY_SECONDS = 60 * 60 * 24

  static setInterval = (callback, interval, timeoutRef = {}) => {
    timeoutRef.id = setTimeout(() => {
      callback()
      TimeUtil.setInterval(callback, interval, timeoutRef)
    }, interval)

    const clearHandle = () => {
      clearTimeout(timeoutRef.id)
    }

    return clearHandle
  }

  static clearInterval = (clearHandle) => {
    if (clearHandle) {
      clearHandle()
    }
  }

  static getTimeAndUnit = (second) => {
    if (second < TimeUtil.MINUTE_SECONDS) {
      return { time: second, unit: 'second' }
    }

    if (second < TimeUtil.HOUR_SECONDS) {
      const minute = Math.round(second / TimeUtil.MINUTE_SECONDS)

      return { time: minute, unit: 'minute' }
    }

    if (second < TimeUtil.DAY_SECONDS) {
      const hour = Math.round(second / TimeUtil.HOUR_SECONDS)

      return { time: hour, unit: 'hour' }
    }

    const day = Math.round(second / TimeUtil.DAY_SECONDS)

    return { time: day, unit: 'day' }
  }

  static parseTimeFields = (data) => {
    for (const field in data) {
      if ((typeof(data[field]) === 'object' || typeof(data[field]) === 'array')  && data[field]) {
        TimeUtil.parseTimeFields(data[field])
      } else {
        if (field.match(/At$/) || field.match(/time$/)) {
          let newDate = new Date(data[field].replace(/-/g, '/'))
          if (newDate.toDateString() === new Date().toDateString()) {
            const timeAndUnit = TimeUtil.getTimeAndUnit((new Date().getTime() - newDate.getTime()) / 1000)
            data[field] = wx.i18n(`timeAndUnit.${timeAndUnit.unit}`, timeAndUnit.time)
          }
        }
      }
    }

    return data
  }
}
