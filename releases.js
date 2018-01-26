const { exec } = require('child_process')
const package = require('./package.json')

exec(
  `git config --local user.name "yi-ge"
    && git config --local user.email "a@wyr.me"
    && git push --all origin
    && git tag -a v${package.version} -m "releases v${package.version}."
    && git push origin --tags`,
  (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`)
      return
    }
    console.log(`stdout: ${stdout}`)
    console.log(`stderr: ${stderr}`)
  }
)
