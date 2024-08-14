const db = require("../models/connection")
const ImageKit = require('imagekit');
const ik = new ImageKit({ 
    publicKey: "public_F5lvc2Whw1cbK+bUiWWAaNJ3eRw=",
    privateKey: "private_4CLfPmDyiaRqCAGxkT4jIiwEc+4=",
    urlEndpoint: "https://ik.imagekit.io/cretivox"
  }); 

const getAllhistory = (req,res ) => {
    const sql = "SELECT * FROM history"
    db.query(sql, (error, result) => {
        if (error){
            res.status(500).json({
                message: "Error fetching history",
                error: error
            });
        } else {
            if (result.length === 0) {
                res.status(404).json({ 
                    message: "history not found"
                });
            } else {
                const formattedData = result.map(data => ({
                    id: data.id,
                    data : {
                        title : data.title,
                        subtitle : data.subtitle,
                        date : data.date,
                        short_desc : data.short_desc,
                        long_desc : data.long_desc,
                        image : data.image,
                        background_image : data.background_image
                    },
                }))
                res.json({
                    message : "success",
                    history :formattedData
                })
        }
        }      
    })
}

const posthistory = async (req, res) => {
    try{
        let imageURL = "";
        let bgimageURL = "";

        if (req.files && req.files['image'] && req.files['image'][0]) {
            const imageFile = req.files['image'][0];

            const imageUploadResponse = await ik.upload({
                file: imageFile.buffer,
                fileName: imageFile.originalname,
            });

            imageURL = imageUploadResponse.url;
        }

        if (req.files && req.files['background_image'] && req.files['background_image'][0]) {
            const background_imageFile = req.files['background_image'][0];

            const background_imageUploadResponse = await ik.upload({
                file: background_imageFile.buffer,
                fileName: background_imageFile.originalname,
            });

            bgimageURL = background_imageUploadResponse.url;
        }

        const title = req.body.title
        const date = req.body.date
        const short_desc = req.body.short_desc
        const long_desc = req.body.long_desc
        const subtitle = req.body.subtitle



        // console.log(imageURL, " ", title)
        const sql = "INSERT INTO history ( title, date, short_desc,long_desc, image, background_image, subtitle) VALUES (?, ?, ?, ?, ?, ?, ?)"
        const value = [title, date, short_desc,long_desc, imageURL, bgimageURL, subtitle]

        db.query(sql, value, (error, result) => {
            if (error) {
                res.status(500).json({
                    message: "Error inserting history",
                    error: error
                });
            } else {
                res.json({
                    message: "Success",
                    historyId: result.insertId
                });
            }
        })
    }catch{
        res.status(500).send({ error: 'Internal Server Error' });
    }
    
}

const deletehistory = (req, res) => {
    const sql = 'DELETE FROM history';

    db.query(sql, (error, result) => {
        if (error) {
            console.error("Error deleting history:", error);
            res.status(500).json({
                message: "Error deleting history",
                error: error
            });
        } else {

            const resetAutoIncrement = 'ALTER TABLE history AUTO_INCREMENT = 1';
            db.query(resetAutoIncrement, (error, result) => {
                if (error) {
                    console.error("Error resetting auto-increment counter:", error);
                    res.status(500).json({
                        message: "Error resetting auto-increment counter",
                        error: error
                    });
                } else {
                    res.json({
                        message: "deleted"
		            });
	            }
            });
        }
    });
}

const gethistorybyID = (req, res) => {
    const historyId = req.params.id
    const sql = "SELECT * FROM history WHERE id = ?"
    db.query(sql, [historyId], (error, result) => {
        if (error) {
            console.error("Error fetching history:", error);
            res.status(500).json({
                message: "Error fetching history",
                error: error
            });
        } else {
            if (result.length === 0) {
                res.status(404).json({
                    message: "history not found"
                });
            } else {
                res.json({
                    id: result[0].id,
                    data : {
                        title : result[0].title,
                        subtitle : result[0].subtitle,
                        date : result[0].date,
                        short_desc : result[0].short_desc,
                        long_desc : result[0].long_desc,
                        image : result[0].image,
                        background_image : result[0].background_image
                    },
                    message: "Success"
                });
            }
        }
    })
}

const deletehistorybyID = (req, res) => {
    const historyId = req.params.id;

    const sql = 'DELETE FROM history WHERE id = ?';

    db.query(sql, [historyId], (error, result) => {
        if (error) {
            console.error("Error deleting history:", error);
            res.status(500).json({
                message: "Error deleting history",
                error: error
            });
        } else {
            if (result.affectedRows === 0) {
                res.status(404).json({
                    message: "history not found"
                });
            } else {
                res.json({
                    message: "deleted"
                });
            }
        }
    });
}


const puthistory = async (req, res) => {
    const historyId = req.params.id;
    const { title, date, short_desc, subtitle } = req.body;
    let imageURL, background_imageURL;

    try {
        const imageFile = req.files['image'] ? req.files['image'][0] : null;
        const bgimageFile = req.files['background_image'] ? req.files['background_image'][0] : null;

        const getImageURLFromDB = () => new Promise((resolve, reject) => {
            db.query('SELECT image FROM history WHERE id = ?', [historyId], (error, result) => {
                if (error) return reject("Error fetching history image: " + error);
                if (result.length === 0 || !result[0].image) return reject("history image not found in the database");
                resolve(result[0].image);
            });
        });

        const getBgImageURLFromDB = () => new Promise((resolve, reject) => {
            db.query('SELECT background_image FROM history WHERE id = ?', [historyId], (error, result) => {
                if (error) return reject("Error fetching history background_image: " + error);
                if (result.length === 0 || !result[0].background_image) return reject("history background_image not found in the database");
                resolve(result[0].background_image);
            });
        });

        const uploadImage = (file) => ik.upload({
            file: file.buffer,
            fileName: file.originalname,
        }).then(response => response.url);

        imageURL = imageFile ? await uploadImage(imageFile) : await getImageURLFromDB();
        background_imageURL = bgimageFile ? await uploadImage(bgimageFile) : await getBgImageURLFromDB();

        const sql = "UPDATE history SET title = ?, date = ?, short_desc = ?, subtitle = ?, image = ?, background_image = ? WHERE id = ?";
        const values = [title, date, short_desc, subtitle, imageURL, background_imageURL, historyId];

        db.query(sql, values, (error, result) => {
            if (error) {
                console.error("Error updating history:", error);
                return res.status(500).json({ message: "Error updating history", error });
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: "History not found" });
            }
            res.json({ message: "Updated" });
        });
    } catch (err) {
        console.error("An error occurred:", err);
        res.status(500).json({ message: "An error occurred", error: err.message });
    }
};


module.exports = {
    getAllhistory,
    posthistory,
    deletehistory,
    gethistorybyID,
    deletehistorybyID,
    puthistory
}