let x = new Promise((resolve,reject)=>{
    let a = 5 + 1
    if(a ==6 ){
        resolve("success")
        }
        else{
            reject("failed")
        }
})

x.then((message)=>{
    console.log("then"+message)
})
x.catch((message)=>{
    console.log("catch"+message)
})
