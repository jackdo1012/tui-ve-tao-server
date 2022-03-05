const cookie = (req, _res, next) => {
    let cookies = {}
    req.auth = true
    req.headers.cookie &&
        req.headers.cookie
            .replaceAll(" ", "")
            .split(";")
            .forEach((value) => {
                const cookie = value.split("=")
                cookies[cookie[0]] = cookie[1]
            })
    req.cookies = cookies
    if (cookies.pass !== process.env.PASS) {
        req.auth = false
    }
    next()
}

module.exports = cookie
