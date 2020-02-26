import { mkdirSync, readdirSync, statSync } from "fs"
import { resolve } from "path"
import { spawnSync } from "child_process"

import { CopyTemplate } from "./CopyTemplate"
import { PackageManager, findPackageManager } from "./PackageManager"

export default class CollectorGenerator {
  packageManager: PackageManager

  constructor(public argv: string[]) {
    this.packageManager = findPackageManager(this.packageName)
  }

  get collectorSlug(): string {
    if (typeof this.argv[0] !== "string") {
      throw new TypeError("You must provide a slug for your collector")
    }

    return this.argv[0]
  }

  get packageName(): string {
    return `codeclimate-collector-${this.collectorSlug}`
  }

  get templateReplacements(): Map<string, string> {
    return new Map([
      ["packageName", this.packageName],
      ["collectorSlug", this.collectorSlug],
      ["packageManagerBin", this.packageManager.binName],
    ])
  }

  run() {
    // create the directory
    console.log(`Initializing ${this.packageName}...`)
    mkdirSync(this.packageName)

    // copy over template files, with replacements
    console.log("Generating scaffolding...")
    this.walk(resolve(__dirname, "../tmpl"), (tmplPath) => new CopyTemplate(
      tmplPath,
      this.packageName,
      this.templateReplacements,
    ).run())

    // use package manager to add dependencies
    console.log("Installing dependencies...")
    this.packageManager.addDependency(["codeclimate-collector-sdk"])
    this.packageManager.addDevDependency([
      "typescript",
      "jest",
      "ts-jest",
      "@types/node",
      "@types/jest",
    ])

    // git init if git available
    console.log("Finishing up...")
    if (spawnSync("which", ["git"]).status === 0) {
      spawnSync("git", ["init", "."], { cwd: this.packageName })
    }

    // all done
    console.log(`All done! Your new collector is started in ./${this.packageName}`)
  }

  // walk a directory tree. call `fn` for each regular file entry
  private walk(path: string, fn: (string) => void) {
    const entries = readdirSync(path)

    entries.forEach((entry) => {
      const fullPath = resolve(path, entry)
      const stat = statSync(fullPath)

      if (stat.isDirectory()) {
        this.walk(fullPath, fn)
      } else {
        fn(fullPath)
      }
    })
  }
}
