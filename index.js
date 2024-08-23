const express = require('express');
require('dotenv').config()
const app = express();
const bodyparser = require('body-parser')
const cors = require("cors");
const port = process.env.PORT

app.use(express.json());
app.use(cors());
app.use(bodyparser.json())

//auth
const middleAuth = require('./config/auth')


const categoryRoute = require("./routers/category")
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
const loginRoute = require("./routers/login")

const internbatchRoute = require("./routers/internbatch")
const internmemberRoute = require("./routers/internmember")
const intercontactRoute = require("./routers/interncontact")

app.use('/api/v1/company/category', categoryRoute)
app.use('/api/v1/company/client', clientRoute)
app.use('/api/v1/company/portfolio', portofolioRoute)
app.use('/api/v1/company/services', servicesRoute)
app.use('/api/v1/company/history', historyRoute)
app.use('/api/v1/company/random_image', random_imgRoute)
app.use('/api/v1/company/department', divisionRoute)
app.use('/api/v1/company/employee', employeeRoute)
app.use('/api/v1/company/tiktok', tiktokdataRoute)
app.use('/api/v1/company/instagram', instagramdataRoute)
app.use('/api/v1/company/youtube', youtubedataRoute)
app.use('/api/v1/company/article', articledataRoute)
app.use('/api/v1/company/agency', agencyRoute)
app.use('/api/v1/company/platform', platformRoute)
app.use('/login/v1/company', loginRoute)

app.use('/api/v1/intern/batch', middleAuth, internbatchRoute)
app.use('/api/v1/intern/member', middleAuth, internmemberRoute)
app.use('/api/v1/intern/contact',middleAuth, intercontactRoute)

app.get('/', (req, res) => {
  res.send('Hello, World!');
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});