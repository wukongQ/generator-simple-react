'use strict'
const Generator = require('yeoman-generator')
const yosay = require('yosay')
const path = require('path')
const mkdirp = require('mkdirp')

module.exports = class extends Generator {
  initializing () {
    this.log('Start building project...')
  }

  async prompting () {
    this.log(
      yosay('Welcome to the generator-simple-react')
    )

    this.answers = await this.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Please input project name:',
        default: this.appname
      },
      {
        type: 'input',
        name: 'description',
        message: 'Please input project description:'
      },
      {
        type: 'input',
        name: 'author',
        message: 'Please input project author:',
        default: this.user.git.email()
      },
      {
        type: 'list',
        name: 'license',
        message: 'Please choose license:',
        choices: ['MIT', 'ISC', 'Apache-2.0', 'AGPL-3.0']
      }
    ])
  }

  defaults () {
    // 默认如果name和当前文件夹名称一致的，直接在当前文件夹下构建项目
    if (path.basename(this.destinationPath()) !== this.answers.name) {
      this.log(
        'Your generator must be inside a folder named ' +
        this.answers.name +
        '\n' +
        "I'll automatically create this folder."
      )
      mkdirp(this.answers.name)
      this.destinationRoot(this.destinationPath(this.answers.name))
    } else {
      this.log('We will build your project in the current directoty.')
    }
  }

  // 写入文件
  writing () {
    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      this.answers
    )
    this.fs.copyTpl(
      this.templatePath('postcss.config.js'),
      this.destinationPath('postcss.config.js')
    )
    this.fs.copyTpl(
      this.templatePath('index.ejs'),
      this.destinationPath('index.ejs')
    )
    this.fs.copyTpl(
      this.templatePath('favicon.ico'),
      this.destinationPath('favicon.ico')
    )
    this.fs.copyTpl(
      this.templatePath('.babelrc'),
      this.destinationPath('.babelrc')
    )

    this.fs.copy(
      this.templatePath('webpack'),
      this.destinationPath('webpack')
    )
    this.fs.copy(
      this.templatePath('src'),
      this.destinationPath('src')
    )
  }
}
