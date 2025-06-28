const mongoose=require('mongoose');
mongoose.connect('mongodb+srv://sreedevsv085:sree2004@cluster0.wl3i0sp.mongodb.net/libraryDB?retryWrites=true&w=majority&appName=Cluster0').then((res)=>{
    console.log('DB is connected');
}).catch((error)=>{
    console.log('Error in connection')
})