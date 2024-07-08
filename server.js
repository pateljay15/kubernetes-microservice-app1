const express = require("express")
const cors = require("cors")
const fs = require("fs");
const axios = require("axios")

const app = express()

app.use(
    cors({
      origin: "*",
    })
  );
  
app.use(express.json());
  
app.post("/store-file", (req, res) => {

    if (!req.body.file) {
        return res.status(400).json({
            file: null,
            error: "Invalid JSON input."
        })
    }

    if (fs.existsSync("/Jay_PV_dir") && req.body.data != null) {
        const filePath = '/Jay_PV_dir/'+req.body.file;

        try {
            // Writing data to the file synchronously
            fs.writeFileSync(filePath, req.body.data, 'utf8');
            console.log('File has been written successfully');
            return res.status(200).json({
                file: req.body.file,
                message: "Success."
            })
        } catch (err) {
            console.log(err)
            console.log("file not getting store")
            // Handle the error here
            return res.status(400).json({
                file: req.body.file,
                error: "Error while storing the file to the storage."
            })
        }
    } else {
        console.log("directory not getting")
        return res.status(400).json({
            file: req.body.file,
            error: "Error while storing the file to the storage."
        })
    }
    
    // axios.post("http://micro-service-second:6060/micro-sum",{ 
    //     file: req.body.file,
    //     product: req.body.product
    // }).then(response => {
    //     // console.log("Request hit to micro-service two")
    //     // console.log(response.data)
    //     return res.send(response.data)
    //     // return response
    // }).catch(err => {
    //     console.log(err)
    //     return res.status(400).json(err?.response?.data || err)
    // })

    // res.send("Hello micro service 1");
});
  
  
app.listen(6000, () => {
    console.log("server listening on port 6000");
});
