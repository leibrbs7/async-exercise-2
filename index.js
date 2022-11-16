async function asyncPromise(par1) {
  if (Number.isInteger(par1) === false|| par1 < 0 || par1 > 50000) {
    return new Error('Par1 is invalid')
  }
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (par1 + 1000 >= 25000) {
        reject(new Error('Server Timeout!'))
      } else {
        resolve(par1 * 2)
      }
    }, 1000 + par1)
  })
}

async function asyncCB(par1, cb) {
  await asyncPromise(par1)
    .then((response) => {
      cb(null, response)
      asyncCB(response, cb)
    })
    .catch((err) => cb(err))
}

function myCallback(err, result) {
  if (err) {
    console.log(`ERR: ${err.message}`)
  } else {
    console.log(`SUCCESS: ${result}`)
  }
}

asyncCB(30, myCallback)
