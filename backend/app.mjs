import express from "express";
import cors from "cors"; 
import { connectDB } from "./db/index.mjs"; 
import letter from "./db/models/letter.mjs"; 
import multer from "multer";
import { FRONTEND_URL, PORT } from "./utils/env.mjs";

const app = express();  



connectDB().catch((err) => {
  console.log("There was a problem connecting to MongoDB: ", err);
});


/** 
 * Data Structure for news letters
 * recipient: string  
 * content: string 
 * numofpics: numberb 
 * pics:[]
 */


app.use(cors({
  origin: [
    FRONTEND_URL
  ],
  credentials: true
}));

app.use(express.json()); 


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
}); 


// Test route
app.get("/", (req, res) => {
  res.send("Express server running 🚀");
});



app.post("/api/message/", async (req, res) => { 
    const recipient = req.body.recipient; 
    const password  = req.body.password; 

    if (!recipient  || !password){ 
        res.status(400).end("Both recipeint and password needeed"); 
        return 
    }

    try { 
        const per_letter = await letter.findOne({"recipient": recipient}); 
        if (per_letter.password != password){ 
            res.status(400).end("Incorrect password"); 
            return
        }
        res.status(200).json(per_letter);
        return
         
    } catch (error) { 
        res.json(error); 
        console.log(error); 
        return         
    }
}); 



