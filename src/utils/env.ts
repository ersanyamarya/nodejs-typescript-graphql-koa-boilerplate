import { exit } from 'process'

export default (name: string): string | null => {
  const value = process.env[name]
  if (!value) {
    console.error(`>> >> >> >> >> Environment variable ${name} is not set << << << << <<`)
    exit(0)
  }
  return value
}
