export function adminRegister(req,res){
    console.log("===adminRiegister start===");
    try{
        const body = req.body;
        console.log(body); 
        return res.status(200).json({message:"adminRegister"});
    }catch(error){
        console.log("===adminRegister error===");
        console.log(error);
        return res.status(500).json({message:error.message});
    }
}


12:15くらいまでみた