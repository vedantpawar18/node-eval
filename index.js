const express= require("express");
const fs= require("fs");
const app= express();
app.use(express.json());
const dns = require("dns");

app.post('/getmeip',function(req, res) {
    const payload=(req.body)
    const website=payload.website_name;
    dns.resolve4(website, (err, addresses) => {
        if (err) {
          console.err(err);
          return;
        }
        res.send(addresses[0]); 
      });
      const data= fs.readFileSync("./db.json", {encoding:"utf-8"})
      const parseData=JSON.parse(data);
       const websites= parseData.websites
      const Newwebsites=[...websites, payload];
      const latest_data= JSON.stringify(Newwebsites)
      fs.writeFileSync("./db.json", latest_data, "utf-8")
      console.log(Newwebsites)
});

app.post("/products/create", (req,res)=>{
    const payload=(req.body)
    const data= fs.readFileSync("./products.json", {encoding:"utf-8"})
    const parseData=JSON.parse(data);
    const newProduct=[...parseData.products, payload]
    console.log(newProduct)
    const latest_data= JSON.stringify(newProduct)
    fs.writeFileSync("./products.json", latest_data, "utf-8")
    res.send("product added") 

})

app.get("/products", (req,res)=>{
    const data=fs.readFileSync("./products.json", {encoding:"utf-8"})
    const parsedData= JSON.parse(data)
    console.log(parsedData)
    res.send(parsedData)
})

app.put("/products", (req,res)=>{
    const data=fs.readFileSync("./products.json", {encoding:"utf-8"})
    const parsedData = JSON.parse(data)
    const product= parsedData.find(item => item.id === req.body.id);
    const index = parsedData.indexOf(product);
    console.log(index)
    parsedData[index] = req.body;
    const latest_data= JSON.stringify(parsedData)
    fs.writeFileSync("./products.json", latest_data, "utf-8")
    res.send("product updated")
})






app.listen(7000, ()=>{
    console.log("listening on port 7000")
})