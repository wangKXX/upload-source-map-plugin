/* eslint-disable prettier/prettier */
const path = require("path");
const golb = require("glob");
const fs = require("fs");
const formData = require("form-data");
const chalk = require("chalk");
const ora = require("ora");
const spinner = ora({
  color: 'green'
})
const form = new formData();

class UploadMapFilePlugin {
  constructor(options) {
    this.options = options;
  }

  upload(files) {
    const { uploadUrl, params } = this.options;
    files.forEach((file, index) => {
      form.append(`file.${index}`, fs.createReadStream(file));
    })
    Object.keys(params || {}).forEach(k => {
      form.append(k, params[k]);
    });
    return new Promise((resolve, reject) => {
      form.submit(uploadUrl, err => {
        if (!err) resolve();
        else reject();
      })
    })
  }

  apply(compiler) {
    compiler.hooks.done.tap("upload-sourcemap-plugin", async (status) => {
      if (!this.options)
        throw new Error("upload-sourcemap-plugin must have options");
      console.log(chalk.green('Start finding the. Map file'));
      spinner.start();
      const files = golb.sync(
        path.join(status.compilation.outputOptions.path, `./**/*.{js.map,}`)
      );
      console.log(chalk.blue(`A total of ${files.length} files were found`));
      spinner.stop();
      console.log(chalk.green('Start uploading the. Map file'));
      spinner.start();
      await this.upload(files);
      console.log(chalk.green('Upload file complete'));
      spinner.stop();
    });
  }
}

module.exports = UploadMapFilePlugin;
