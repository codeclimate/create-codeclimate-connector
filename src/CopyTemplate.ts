import { mkdirSync, readFileSync, writeFileSync, existsSync } from "fs"
import { extname, resolve, relative, dirname, basename } from "path"

export class CopyTemplate {
  // src is path to template to copy (including ./tmpl/...), dest is root dir of created project
  constructor(public src: string, public dest: string, public replacements: Map<string, string>) {
  }

  get tmplPath(): string {
    return resolve(__dirname, "../tmpl")
  }

  // src path relative to ./tmpl
  get srcRelTargetPath(): string {
    return relative(this.tmplPath, this.src)
  }

  // path to write file to, relative to root of create project, stripped of `.tmpl`
  get relDesPath(): string {
    return this.srcRelTargetPath.replace(/\.tmpl$/, "")
  }

  get destDir(): string {
    return dirname(resolve(this.dest, this.srcRelTargetPath))
  }

  get destPath(): string {
    return resolve(this.destDir, basename(this.relDesPath))
  }

  // only templates ending in `.tmpl` need replacements
  get needsReplacement(): boolean {
    return extname(this.src) === ".tmpl"
  }

  run() {
    this.mkDestDir()
    this.writeDest()
  }

  private rawSource(): string {
    return readFileSync(this.src).toString()
  }

  // source with replacements taken care of
  private replacedSource(): string {
    const raw = this.rawSource()

    if (this.needsReplacement) {
      return raw.replace(/{{([a-zA-Z]+)}}/g, (_match, key) => {
        if (!this.replacements.has(key)) {
          throw `unexpected replacement key ${key} found in ${this.src}`
        }

        return this.replacements.get(key) as string
      })
    } else {
      return raw
    }
  }

  private mkDestDir(): void {
    if (!existsSync(this.destDir)) {
      mkdirSync(this.destDir, { recursive: true })
    }
  }

  private writeDest(): void {
    writeFileSync(
      resolve(this.dest, this.relDesPath),
      this.replacedSource(),
    )
  }
}
