'use strict'

const Generator = require('yeoman-generator')
const path = require('path')
const chalk = require('chalk')
const yosay = require('yosay')

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts)
    this.argument('appname', { type: String, required: false })
    this.name = this.options.appname || 'myapp'
    this.description = 'My APP'
    this.version = '1.0.0'
  }

  initializing() {}

  async prompting() {
    this.log(yosay('Welcome ' + chalk.red('koa-api-boilerplate') + ' generator!'))

    const prompts = [
      {
        type: 'input',
        name: 'name',
        message: `What\'s the project name? [${this.name}]`,
      },
      {
        type: 'input',
        name: 'description',
        message: `App description? [${this.description}]`,
      },
      {
        type: 'input',
        name: 'version',
        message: `Version? [${this.version}]`,
      },
    ]

    return await this.prompt(prompts).then(r => {
      this.name = r.name ? r.name : this.name
      this.description = r.description ? r.description : this.description
      this.version = r.version ? r.version : this.version
    })
  }

  configuring() {}

  default() {}

  get writing() {
    return {
      appStaticFiles() {
        const src = this.sourceRoot() + '/**'
        const dest = this.destinationPath(this.name)

        const files = ['package.json', 'README.md', 'gitignore']

        const copyOpts = {
          globOptions: {
            ignore: [],
          },
        }

        this.fs.copy(src, dest, copyOpts)
        this.fs.copy(this.templatePath('.*'), dest, copyOpts)

        const opts = {
          name: this.name,
          title: this.name,
          description: this.description,
          version: this.version,
        }

        files.forEach(f => {
          this.fs.copyTpl(this.templatePath(f), this.destinationPath(`${this.name}/${f}`), opts, copyOpts)
        })

        this.fs.move(
          this.destinationPath(`${this.name}`, 'gitignore'),
          this.destinationPath(`${this.name}`, '.gitignore'),
        )
      },
    }
  }

  conflicts() {}

  install() {
    const appDir = path.join(process.cwd(), this.name)
    process.chdir(appDir)
    this.npmInstall()
  }
}
