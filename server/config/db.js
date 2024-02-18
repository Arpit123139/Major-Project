const mongoose=require('mongoose')
mongoose.set('strictQuery',false)                 // Withouth querying as well it will remain connected


const connectWithDb1 =()=>{
    mongoose.connect("mongodb+srv://danishmahajan779:Danish@cluster0.cntndvq.mongodb.net/MajorProject?retryWrites=true&w=majority",{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    .then(console.log("Db got connected"))
    .catch(error=>{
        console.log(`DB CONNECTION ISSUES`);
        console.log(error)
        process.exit(1);
    })
}

module.exports=connectWithDb1