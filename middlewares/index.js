const fs=require('fs');

function reqResLog(fileName) {
    return (req, res, next) => {
        console.log("server hit log saved");
        // creating a log file for incoming requests with time, method, route and ip
        fs.appendFile(
            fileName,
            `\n METHOD: ${req.method}, Route: ${req.url}, Time: ${Date.now()}, IP: ${req.ip}`,
            (err, data) => {
                next();
            }
        )
    }
}

module.exports={
    reqResLog
}