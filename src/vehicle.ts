export default interface Vehicle {
  title: string
  description: string
  icons: {
    large: string
    medium: string
  }
  level: number
  type: {
    name: string
    title: string
    icons: {
      default: string
    }
  }
  nation: {
    name: string
    title: string
    color: string
    icons: {
      small: string
      medium: string
      large: string
    }
  }
}
