'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const glob = require('globby');
const path = require('path');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(`Welcome to the phenomenal ${chalk.red('generator-test-generator')} generator!`)
    );

    const prompts = [
      {
        type: 'confirm',
        name: 'someAnswer',
        message: 'Would you like to enable this option?',
        default: true
      },
      {
        type: 'input',
        name: 'project-version',
        message: '项目版本号',
        default: '0.0.1'
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    this._writeRootFiles();
    this._writeFolders();
    // this.fs.copy(
    //   this.templatePath('dummyfile.txt'),
    //   this.destinationPath('dummyfile.txt')
    // );
  }
  //  项目中的文件夹内容
  _writeFolders() {
    ['public', 'src'].forEach(floder => {
      this.fs.copy(
        this.templatePath(floder),
        this.destinationPath(floder)
      )
    });
  }

  _writeRootFiles() {
    glob
      .sync([this.templatePath('*'), this.templatePath('package.json')])
      .forEach(file => {
        this.fs.copy(
          this.templatePath(file),
          this.destinationPath(path.basename(file).replace(/^_/, ''))
        )
      });
    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      this.props
    );
  }
  install() {
    this.installDependencies();
  }
};
