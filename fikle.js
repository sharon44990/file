var exec = require('child_process').exec;
var delay = require('delay');
const fs = require('fs');
const readline = require('readline');
//---------------------------------读取countList.txt  创建文件夹
const file = './countList.txt';
const lineRead = fs.createReadStream(file);
const lineR = readline.createInterface({
    input:lineRead
});
lineR.on('line',(data)=>{
    if(!fs.existsSync(`./DyDown/${data}`)){
        fs.mkdir(`./DyDown/${data}`,(err)=>{});
    }
})
// var time = 1440;

//一天是  1440   3小时是 180   1小时是 60
const allTime=[1440,180,60];
for(const t of allTime){
    // console.log(t)
    run(t);
}



// run(time)
function run(time){

    const cmd = `find /tiktokPan/sun_test/link/DyDown/* -cmin -${time}`;   
    var timeFile = 0;
    if(time/60==24){
        timeFile = '24h';
    }else if(time/60==3){
        timeFile = '3h';
    }else if(time/60==1){
        timeFile = '1h';
    }

    console.log(time);
    if(fs.existsSync(`./newDyDown/${timeFile}`)){
        exec(`rm -rf ./newDyDown/${timeFile}`,(err)=>{if(err){console.log(err)}else{
            mkdirNew(cmd,time);
            // makeFile(cmd,time);
        }})
    }else{
        mkdirNew(cmd,time);
        // makeFile(cmd,time);
    }
}
function mkdirNew(cmd,time){
    //console.log(`find /tiktokPan/sun_test/link/DyDown/* -cmin -${time}`)
    exec(`find /tiktokPan/sun_test/link/DyDown/* -cmin -${time}`,(err,stdout,stderr)=>{
        //console.log(stdout);
        const arr = stdout.split('\n');
        for(const i of arr ) {
            const mp4 = i.match(/.mp4$/);
            
                if(mp4){
                    
                    const count = i.match(/DyDown\/.*?\(/)[0].replace('DyDown/','').replace('(','');
                    var cpName = `./newDyDown/${time/60}h/${count.substring(0,2)}/${count}/`;
                    //console.log(!fs.existsSync(`./newDyDown/${time/60}h/${count}`))
                    //-------------------newDyDowm 如果不存在新目录才创建
                    if(!fs.existsSync(`./newDyDown/${time/60}h/${count}`)){
                        exec(`mkdir ${cpName} -p`,(err)=>{if(err){console.log(err)}});
                    }
    
                    
                }
        }
        makeFile(cmd,time);
    })
}
function makeFile(cmd,time){
    // console.log(cmd);
    exec(cmd,(err,stdout,stderr)=>{       
        if(err){console.log(err)}
        const arr = stdout.split('\n');
        
        
        for(const i of arr ) {
            
            const mp4 = i.match(/.mp4$/);
            if(mp4){
                // i.match(/\.*?\(/);
                // console.log(i.match(/DyDown\/.*?\(/)[0].replace('DyDown/','').replace('(',''));
                const count = i.match(/DyDown\/.*?\(/)[0].replace('DyDown/','').replace('(','');
                
                // console.log(`mkdir ./newDyDown/${time/60}h/${count.substring(0,2)}/${count} -p`)
                const vedioName = i.match(/[0-9][0-9][0-9][0-9][0-9].*?.mp4/)[0];
                // console.log(`./newDyDown/${count.substring(0,2)}/${count}/${vedioName}`)
                
                // console.log(`cp ${i} ${cpName} -p`)
                // exec(`cp ${i} ${cpName} -p`,(err,stdout,stderr)=>{console.log(stdout);});
                // console.log(vedioName);
                // console.log(`mkdir ${cpName} -p`)            //111
                // console.log(`cp ${i.replace('(','\\(').replace(')','\\)')} ${cpName}`)  //111
                 
                var cpName = `./newDyDown/${time/60}h/${count.substring(0,2)}/${count}/`;
                //exec(`mkdir ${cpName} -p`,(err)=>{if(err){console.log(err)}else{}});
                if(vedioName.match(/ /)){
                    // console.log(vedioName.replace(' ','\\ '));
                    // console.log(`${i.replace('(','\\(').replace(')','\\)').replace(/[0-9][0-9][0-9][0-9][0-9].*?.mp4/,'')}${vedioName.replace(' ','\\ ')}`)
                    const cpName1 = `${i.replace('(','\\(').replace(')','\\)').replace(/[0-9][0-9][0-9][0-9][0-9].*?.mp4/,'')}${vedioName.replace(' ','\\ ')}`;
                    
                    
                    exec(`cp ${cpName1} ${cpName}`,(err)=>{if(err){console.log(err)}else{console.log(vedioName);}});
                }else{
                    // console.log(`cp ${i.replace('(','\\(').replace(')','\\)')} ${cpName}`)
                    // console.log(`cp ${cpName} ${cpName}`)
                    // console.log(`cp ${i.replace('(','\\(').replace(')','\\)')} ${cpName}`)
                    exec(`cp ${i.replace('(','\\(').replace(')','\\)')} ${cpName}`,(err)=>{if(err){console.log(err)}else{console.log(vedioName);}});
                }
                // console.log(`cp ${i.replace('(','\\(').replace(')','\\)')} ${cpName}`)
                // exec(`mkdir ${cpName} -p`,(err)=>{if(err){console.log(err)}else{exec(`cp ${i.replace('(','\\(').replace(')','\\)')} ${cpName}`,(err)=>{if(err){console.log(err)}});}});
                
    
            }
        }
        
        
        
    })
}
