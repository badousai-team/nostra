const csv = require('fast-csv')
// https://stackoverflow.com/questions/54420566/how-to-create-a-readstream-from-memorystorage-with-multer
const streamifier = require('streamifier')

module.exports.csvToJson = (bufferFile) => {
  return new Promise((resolve, reject) => {
    const csvArr = []
    streamifier.createReadStream(bufferFile)
      .pipe(csv.parse({ headers: true }))
      .on('error', error => reject(error))
      .on('data', row => {
        csvArr.push(row)
      })
      .on('end', (rowCount) => {
        resolve({ data: csvArr, count: rowCount })
      })
  })
}
