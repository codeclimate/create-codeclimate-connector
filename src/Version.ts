import { readFileSync } from "fs"
import { resolve } from "path"

const pkgJsonPath = resolve(__dirname, "../package.json")

export default function Version(): string {
  return JSON.parse(readFileSync(pkgJsonPath).toString())["version"]
}
