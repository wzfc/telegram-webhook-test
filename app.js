const Koa = require('koa');
const app = new Koa();
const route = require('koa-route');
const body = require('koa-body');

app.use(body());

let history = [];

app.use(route.post('/telegram', ctx => {
    let update = ctx.request.body;
    history.push(JSON.stringify(update));

    if (update.message.text) {
        let response = {
            method: 'sendMessage',
            chat_id: update.message.chat.id,
            text: update.message.text
        };

        ctx.body = response;
    }
}));

app.use(route.get('/clear', ctx => {
    history = [];
    ctx.body = 'success';
}));

app.use(route.get('/', ctx => {
    ctx.body = history.join('\n\n');
}));

app.listen(80);