import { mkdirSync, readdirSync, statSync } from "fs"
import { resolve } from "path"
import { spawnSync } from "child_process"

import Version from "./Version"
import { CopyTemplate } from "./CopyTemplate"
import { PackageManager, findPackageManager } from "./PackageManager"

export default class ConnectorGenerator {
  packageManager: PackageManager

  constructor(public argv: string[]) {
    this.packageManager = findPackageManager(this.packageName)
  }

  get connectorSlug(): string {
    if (typeof this.argv[0] !== "string") {
      throw new TypeError("You must provide a slug for your connector")
    }

    return this.argv[0]
  }

  get packageName(): string {
    return `codeclimate-connector-${this.connectorSlug}`
  }

  get templateReplacements(): Map<string, string> {
    return new Map([
      ["packageName", this.packageName],
      ["connectorSlug", this.connectorSlug],
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
    // by default yarn add foo is ^version in package.json: ^0.0.x isn't a
    // smooth process for upgrading, so in these early days I think we want
    // ~0.0
    this.packageManager.addDependency([`codeclimate-connector-sdk@~${Version().replace(/\.[^\.]+$/, "")}`])
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
    console.log(`All done! Your new connector is started in ./${this.packageName}`)
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
