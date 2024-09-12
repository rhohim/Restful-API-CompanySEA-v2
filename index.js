const express = require('express');
require('dotenv').config()
const app = express();
const bodyparser = require('body-parser')
const cors = require("cors");
const port = 3333

app.use(express.json());
app.use(cors());
app.use(bodyparser.json())

//auth
const middleAuth = require('./config/auth')


// const categoryRoute = require("./routers/category")
const clientRoute = require("./routers/client")
const servicesRoute = require("./routers/services")
const portofolioRoute = require("./routers/portofolio") 
const historyRoute = require("./routers/history")
const random_imgRoute = require("./routers/randomimg")
const divisionRoute = require("./routers/division")
const employeeRoute = require("./routers/employee")
const tiktokdataRoute = require("./routers/tiktokdata")
const instagramdataRoute = require("./routers/instagramdata")
const youtubedataRoute = require("./routers/youtubedata")
const articledataRoute = require("./routers/articledata")
const agencyRoute = require("./routers/agency")
const platformRoute = require("./routers/platform")
const highRoute = require("./routers/highlight")
const loginRoute = require("./routers/login")

const internbatchRoute = require("./routers/internbatch")
const internmemberRoute = require("./routers/internmember")
const intercontactRoute = require("./routers/interncontact")

// app.use('/api/v1/company/category', categoryRoute)
app.use('/api/v1/company/client', middleAuth, clientRoute)
app.use('/api/v1/company/portfolio', middleAuth, portofolioRoute)
app.use('/api/v1/company/services', middleAuth, servicesRoute)
app.use('/api/v1/company/history', middleAuth, historyRoute)
app.use('/api/v1/company/random_image', middleAuth, random_imgRoute)
app.use('/api/v1/company/department', middleAuth, divisionRoute)
app.use('/api/v1/company/employee', middleAuth, employeeRoute)
app.use('/api/v1/company/tiktok', middleAuth, tiktokdataRoute)
app.use('/api/v1/company/instagram', middleAuth, instagramdataRoute)
app.use('/api/v1/company/youtube', middleAuth, youtubedataRoute)
app.use('/api/v1/company/article', middleAuth, articledataRoute)
app.use('/api/v1/company/agency', middleAuth, agencyRoute)
app.use('/api/v1/company/platform', middleAuth, platformRoute)
app.use('/api/v1/company/highlight', middleAuth, highRoute)
app.use('/api/v1/login/company', loginRoute)

app.use('/api/v1/intern/batch', middleAuth, internbatchRoute)
app.use('/api/v1/intern/member', middleAuth, internmemberRoute)
app.use('/api/v1/intern/contact',middleAuth, intercontactRoute)

app.get('/', (req, res) => {
  res.send('Hello, World!');
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});