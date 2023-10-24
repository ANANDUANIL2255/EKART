const mongoose=require('mongoose')


mongoose.connect(process.env.BASE_URL,{
    useUnifiedTopology:true,
    useNewUrlParser:true
}).then(()=>{
    console.log("____MONGODB ATLAS CONNECTED____");
}).catch(()=>{
    console.log("____MONGODB NOT CONNECTED____");
})