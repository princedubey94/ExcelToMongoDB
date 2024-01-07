// imports
const express = require('express')
const fs = require('fs')
const multer = require('multer')
const cors=require('cors')
const mongoose=require('mongoose')
const dotenv=require('dotenv')
const csvtojson = require('csvtojson');
const Candidate = require('./studentSchema');
const xlsx = require('xlsx');
const async=require('async')

const app=express();
app.use(express.json());
app.use(cors());
dotenv.config();
app.use("/files",express.static("files"));


const mongoUrl=process.env.MONGO_URL;
const PORT=process.env.PORT || 5000;

// mongoose connection
mongoose.connect(mongoUrl,{
    useNewUrlParser:true,
}).then(()=>{
    console.log("connected to database")
})
.catch((e)=>console.log(e));

// multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './files')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() 
      cb(null, uniqueSuffix+file.originalname)
    }
  })
  const upload = multer({ storage: storage })



  app.post("/upload-files",upload.single("file"),async(req,res)=>{
    const filePath = './files/' + req.file.filename;
    console.log('File Uploaded:', filePath);

    try {
        const fileExtension = req.file.originalname.split('.').pop().toLowerCase();

        if (fileExtension === 'xlsx') {
            const csvFilePath = filePath.replace('.xlsx', '.csv');
            convertXlsxToCsv(filePath, csvFilePath);
            console.log('XLSX converted to CSV:', csvFilePath);
            const source = await csvtojson().fromFile(csvFilePath);



            const arrayToInsert = source .map(row => ({
                name: row['Name of the Candidate'],
                email: row['Email'],
                mobileNo: row['Mobile No.'],
                dateOfBirth: row['Date of Birth'],
                workExperience: row['Work Experience'],
                resumeTitle: row['Resume Title'],
                currentLocation: row['Current Location'],
                postalAddress: row['Postal Address'],
                currentEmployer: row['Current Employer'],
                currentDesignation: row['Current Designation'],
            }));
       async function processCandidate(candidate, callback = () => {}) {
                var inserted=false;


                // DUPLICACY CHECK OF EMAIL
                var val = candidate.email;
                var count=await Candidate.countDocuments({ email:val }); 
                if(count>0){
                  inserted=true;
                }
                else{
                  await Candidate.create(candidate).then((result) => {
                    inserted=true;
                  })
                  .catch((err) => {
                    inserted=false;
                  });

                }

                if (inserted) {
                    inserted=false;
                  callback(null);
                } else {
                  callback(new Error('Error processing candidate: '));
                }
              }

// async.eachSeries() to process every single candidate
              async function main() {
                try {
                  await async.eachSeries(arrayToInsert, processCandidate, (err) => {
                    if (err) {
                        console.log(err);
                      res.json("error");
                    } else {
                      res.json("ok");
                    }
                  });
                } catch (err) {
                  res.json("error");
                }
              }
              main();
        } else {
            // Reflect failure message for unsupported file type
            res.json("unsupported file type")
        }
    } catch (err) {
        console.error(err);
        // Reflect failure message for internal server error
        res.json('Internal Server Error');
    }
  })

// apis
app.get("/",async(req,res)=>{
    try {
        const candidates = await Candidate.find();
        console.log('Candidates:', candidates);
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }

});
// convert xlsx to csv
function convertXlsxToCsv(xlsxFilePath, csvFilePath) {
    try {
        const workbook = xlsx.readFile(xlsxFilePath);
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const csvData = xlsx.utils.sheet_to_csv(sheet, {
            header:1,
            blankrows: false});
        fs.writeFileSync(csvFilePath, csvData, 'utf-8');
    } catch (error) {
        console.error('Error converting XLSX to CSV:',error);
    }
}

app.listen(PORT,()=>{
    console.log(`server listening at ${PORT}`);
})