import theme from './theme.json'

export function setConfig (data) {
  return {
    data,
    title: {
      visible: false
    },
    xField: 'time',
    yField: 'temp',
    smooth: true,
    theme

  }
}
