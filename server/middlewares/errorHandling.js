module.exports=(err,req,res,next)=>{

    console.log(err);
    try {
        if (err.name == 'SequelizeDatabaseError') {
            next(err)
        }else if(err.status ==500){
            res.status(500).json({ errors: 'Server currently unable to handle this request'})
        }
        else{
            res.status(err.status||400).json({errors:err.message.split('\n')})
        }
        
    } catch (error) {
        next(err)
    }
}

