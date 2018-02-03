const fs = require('fs')
const path = require('path')
const { exec } = require('child_process')
const package = require('./package.json')

let arrVersion = (package.version).split('.')
arrVersion[2] += 1
arrVersion = arrVersion.join('.')
package.version = arrVersion
const upPackage = JSON.stringify(package)
fs.writeFileSync(path.resolve(__dirname + '/package.json'), upPackage)

// exec(
//   `git config --local user.name "yi-ge" && git config --local user.email "a@wyr.me" && git push --all origin && git tag -a v${
//     package.version
//   } -m "releases v${
//     package.version
//   }." && git push origin --tags && git fetch origin`,
//   (error, stdout, stderr) => {
//     if (error) {
//       console.error(`exec error: ${error}`)
//       return
//     }
//     console.log(`stdout: ${stdout}`)
//     console.log(`stderr: ${stderr}`)
//   }
// )
