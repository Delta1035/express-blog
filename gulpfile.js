const util = require("util");
const exec = util.promisify(require("child_process").exec);
const { src, dest, series } = require("gulp");
const fs = require("fs");
const rimraf = require("rimraf");
function cleanDist(cb) {
  rimraf("./dist/**", fs, function () {
    console.log("ok");
    cb();
  });
}

async function buildTS(cb) {
  try {
    await exec("tsc");
    cb();
  } catch (error) {
    console.log(error);
  }
}

function copyAssets(cb) {
  src(['./src/assets/**','./src/assets/*/.*'/**匹配.开头的文件 */]).pipe(
    dest('./dist/assets')
  )
  cb();
}

exports.default = series(cleanDist, buildTS, copyAssets);
