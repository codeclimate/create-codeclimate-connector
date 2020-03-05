import { spawnSync } from "child_process"


export abstract class PackageManager {
  constructor(public targetCwd: string) {
  }

  static binName(): string {
    return this.name.toLowerCase()
  }

  get binName(): string {
    return (this.constructor as any).binName()
  }

  protected run(args: string[]): void {
    const r = spawnSync(
      this.binName,
      args,
      { cwd: this.targetCwd },
    )

    if (r.status !== 0) {
      console.error(`Running ${this.binName} ${args.join(" ")} failed:`)
      console.error(r.stdout.toString())
      console.error(r.stderr.toString())
      process.exit(1)
    }
  }

  abstract addDependency(deps: string[]): void
  abstract addDevDependency(deps: string[]): void
}

class Yarn extends PackageManager {
  addDependency(deps: string[]) {
    this.run( ["add"].concat(deps))
  }

  addDevDependency(deps: string[]) {
    this.run(["add", "--dev"].concat(deps))
  }
}

class Npm extends PackageManager {
  addDependency(deps: string[]) {
    this.run(["install", "--save"].concat(deps))
  }

  addDevDependency(deps: string[]) {
    this.run(["install", "--save-dev"].concat(deps))
  }
}

// this list should be in priority order: we prefer yarn over npm
const MANAGERS = [
  Yarn,
  Npm
]

export function findPackageManager(targetCwd: string): PackageManager {
  const klass = MANAGERS.find((mKlass)  => {
    return spawnSync("which", [mKlass.binName()]).status === 0
  })

  if (!klass) {
    throw "couldn't find any installed node package manager"
  }

  return new klass(targetCwd)
}
