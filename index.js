const httpServer = require('http');
const url = require('url');
const fs = require('fs')
const replaceTemplate = require('./modules/replaceTemplate.js')

const tempCourse = fs.readFileSync(
    `${__dirname}/data/data.json`,
    'utf-8'
);

const templateHTMLCourse = fs.readFileSync(
    `${__dirname}/template/templateCourse.html`,
    'utf-8'
);




const dataObj = JSON.parse(tempCourse);
////////////////////////////////////
//Create server
const server = httpServer.createServer(function(req, res){
    // const urlParameter = url.parse(req.url, true);
    // console.log(urlParameter.query);
    // console.log(urlParameter.pathname);
    const {query, pathname} = url.parse(req.url, true);

    if(query.id){
        if(pathname === '/' || pathname.toLowerCase() === '/courses'){
            res.writeHead(200, {
                'Content-type': 'text/html'
            });
            const course = dataObj[query.id];
            const strCourse = JSON.stringify(course)
            const courseHTML = replaceTemplate(templateHTMLCourse, course);
            res.end(courseHTML);
            // //res.end(`We recieved our first request from the client at resource ${urlParameter.pathname.toLowerCase()} with query parameters ${urlParameter.query.id}
            // ${JSON.stringify(course)}
            // `)
        }
        else{
            res.writeHead(404, {
                'Content-type': 'text/html'
            });
            res.end(`resource not found`)
        }
    }
            
        
    
    
});


//Start listening to the requests
server.listen(8000, 'localhost', function(){
    console.log('Listening to requests on port 8000')
});