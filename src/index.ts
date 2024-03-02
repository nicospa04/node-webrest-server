import http from 'http';
import fs from 'fs';

const server = http.createServer((req, res) => {

    switch (req.url) {
        case '/':
            const htmlFile = fs.readFileSync('./public/index.html', 'utf-8');
            const cssFile = fs.readFileSync('./public/css/index.css', 'utf-8');
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.writeHead(200, {'Content-Type': 'text/css'});
            res.write(htmlFile);
            res.write(cssFile);
            res.end();
            break;
        default:
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.end('404 Not Found');
    }
    

}) 

server.listen(9080, () => {
    console.log('Server is running on port 9080')
})