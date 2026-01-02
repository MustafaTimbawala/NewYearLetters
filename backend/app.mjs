import express from "express";
import cors from "cors"; 
import { connectDB } from "./db/index.mjs"; 
import letter from "./db/models/letter.mjs"; 
import multer from "multer";
import { FRONTEND_URL, PORT } from "./utils/env.mjs";
import cors from 'cors';

const app = express();  


app.use(cors({
  origin: [
    FRONTEND_URL
  ],
  credentials: true
}));


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


// Middleware
app.use(cors());
app.use(express.json()); 

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB per image
});

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

app.post("/api/mssage/upload", upload.array("pics", 10), async (req, res) => {
    try {
      const { recipient, content } = req.body;
      const files = req.files;

      if (!recipient || !content) {
        return res.status(400).json({ message: "Missing fields" });
      }

      const picUrls = [];

      // Upload each image to Supabase
      for (const file of files) {
        const filePath = `letters/${Date.now()}-${file.originalname}`;

        const { error } = await supabase.storage
          .from("images") // your bucket name
          .upload(filePath, file.buffer, {
            contentType: file.mimetype,
          });

        if (error) {
          throw error;
        }

        // Get public URL
        const { data } = supabase.storage
          .from("images")
          .getPublicUrl(filePath);

        picUrls.push(data.publicUrl);
      }

      // Save to MongoDB
      const letter = await Letter.create({
        recipient,
        content,
        pics: picUrls,
      });

      res.status(201).json(letter);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Upload failed" });
    }
  }
);


