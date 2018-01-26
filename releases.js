const { exec } = require('child_process')
const package = require('./package.json')

exec(
  `git add . && git commit -m "releases v${package.version}." && git tag -a v${
    package.version
  } -m "releases v${package.version}." && git push --all origin`,
  (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`)
      return
    }
    console.log(`stdout: ${stdout}`)
    console.log(`stderr: ${stderr}`)
  }
)
