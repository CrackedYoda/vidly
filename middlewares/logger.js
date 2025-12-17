

function log(req,res,next){
console.log("logging vidly");
next();
}

module.exports = log;