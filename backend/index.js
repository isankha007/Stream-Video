const express = require('express')
const fs = require('fs')
const cors = require('cors')

const app = express()

app.use(cors())

const videoFileMap={
    'v1':'videos/v1.mp4',
    'v2':'videos/v2.mp4',
    'v3':'videos/v3.mp4'
}


app.get('/videos/:filename',(req,res)=>{
    const filename = req.params.filename;
    const filepath = videoFileMap[filename];
    console.log("========="+filepath)
    if(!filepath){
        return res.status(404).send('file not found');
    }
    const stat = fs.statSync(filepath);
    const fileSize = stat.size;
    const range = req.header.range;

    if(range){
        const parts = range.replace(/bytes=/,'').split('-')
        const start = parseInt(parts[0],10);
        const end = parts[1] ? parseInt(parts[1],10): fileSize - 1;
        
        const chunkSize= end - start +1;
        const file = fs.createReadStream(filepath, {start, end})

        const head = {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunkSize,
            'Content-Type': 'video/mp4'
            };
            res.writeHead(206,head) 
            file.pipe(res);
    }else{
        const head = {
            'Content-Length': fileSize,
            'Content-Type': 'video/mp4'
            };
            res.writeHead(200,head) 
            fs.createReadStream(filepath).pipe(res)
    }
})

app.listen(3000,()=>{
    console.log('server is listening on port 3000')
})