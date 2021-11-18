const image = {
  alt: 'string',
  originalSrc: 'string',
  thumb: 'string',
  default: {
    540: 'string',
    768: 'string',
    1280: 'string',
    1920: 'string'
  },
  webp: {
    540: 'string',
    768: 'string',
    1280: 'string',
    1920: 'string'
  }
}

const link = {
  label: 'string',
  url: 'string'
}

const video = {
  src: {
    mp4: 'string',
    webm: 'string'
  }
}

// default values for custom props validator
const themes = ['dark', 'light']

export default {
  image,
  link,
  video
}

export { themes }
