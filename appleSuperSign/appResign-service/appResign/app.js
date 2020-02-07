const Koa = require('koa');

const koaBody = require('koa-body');
const session=require('koa-session2');
var xmlParser = require("koa-xml-body");
const static = require('koa-static');
const LocalStrategy = require('passport-local')
const passport = require('koa-passport')

const controller = require('./controller');

const config = require('./config/config')
const app = new Koa();

// log request URL:
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});

app.keys = ['mother fuck appresign'];//我理解为一个加密的密钥

app.use(session({
  key: 'koa:sess', /** cookie的名称，可以不管 */
  maxAge: 7200000, /** (number) maxAge in ms (default is 1 days)，cookie的过期时间，这里表示2个小时 */
  overwrite: true, /** (boolean) can overwrite or not (default true) */
  httpOnly: true, /** (boolean) httpOnly or not (default true) */
  signed: true, /** (boolean) signed or not (default true) */
  credentials: true,

},app));



app.use(static(__dirname+'/www'));

app.use(xmlParser());


app.use(koaBody({
    // enableTypes:['json', 'form', 'text'],
    multipart: true,
    formidable: {
        maxFileSize: 100*1024*1024*2000    // 设置上传文件大小最大限制，2000M
    }
}));

app.use(async (ctx, next)=> {
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With,x-token');
    ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    ctx.set("Content-Type", "application/json")
    if (ctx.method == 'OPTIONS') {
      ctx.body = 200; 
    } else {
      await next();
    }
  });
// add controllers:
app.use(controller());

app.listen(config.port);
console.log('app started at port ' + config.port);