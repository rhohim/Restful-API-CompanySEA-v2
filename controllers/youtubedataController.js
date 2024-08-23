const db = require("../models/connection")
const ImageKit = require('imagekit');
const { link } = require("../routers/category");
const ik = new ImageKit({ 
    publicKey: "public_F5lvc2Whw1cbK+bUiWWAaNJ3eRw=",
    privateKey: "private_4CLfPmDyiaRqCAGxkT4jIiwEc+4=",
    urlEndpoint: "https://ik.imagekit.io/cretivox"
  });


const getAllyoutube_data = (req,res ) => {
    const sql = "SELECT * FROM youtube_data"
    db.query(sql, (error, result) => {
        if (error){
            res.status(500).json({
                message: "Error fetching youtube_data",
                error: error
            });
        } else {
            if (result.length === 0) {
                res.status(404).json({ 
                    message: "youtube_data not found"
                });
            } else {
                const formattedData = result.map(data => ({
                    id: data.id,
                    data : {
                        insight : [
                            {
                                value : data.total_subscribers,
                                unit : "subscribers"
                            },
                            {
                                value : data.total_views,
                                unit : "total views"
                            }
                        ],
                        // total_subscribers : data.total_subscribers,
                        // total_views : data.total_views,
                        last_post : JSON.parse(data.last_post)
                    },
                }))
                res.json({
                    message : "success",
                    youtube :formattedData
                })
        }
        }      
    })
}

const postyoutube_data = async (req, res) => {
    try {
        let imageURL1, imageURL2, imageURL3;

        if (req.files && req.files['image_1'] && req.files['image_1'][0]) {
            const image_1File = req.files['image_1'][0];
            try {
                const image_1UploadResponse = await ik.upload({
                    file: image_1File.buffer,
                    fileName: image_1File.originalname,
                });
                imageURL1 = image_1UploadResponse.url;
            } catch (uploadError) {
                console.error("Error uploading image_1:", uploadError);
                return res.status(500).json({ message: "Error uploading image_1", error: uploadError });
            }
        }

        if (req.files && req.files['image_2'] && req.files['image_2'][0]) {
            const image_2File = req.files['image_2'][0];
            try {
                const image_2UploadResponse = await ik.upload({
                    file: image_2File.buffer,
                    fileName: image_2File.originalname,
                });
                imageURL2 = image_2UploadResponse.url;
            } catch (uploadError) {
                console.error("Error uploading image_2:", uploadError);
                return res.status(500).json({ message: "Error uploading image_2", error: uploadError });
            }
        }

        if (req.files && req.files['image_3'] && req.files['image_3'][0]) {
            const image_3File = req.files['image_3'][0];
            try {
                const image_3UploadResponse = await ik.upload({
                    file: image_3File.buffer,
                    fileName: image_3File.originalname,
                });
                imageURL3 = image_3UploadResponse.url;
            } catch (uploadError) {
                console.error("Error uploading image_3:", uploadError);
                return res.status(500).json({ message: "Error uploading image_3", error: uploadError });
            }
        }

        const { subscribers, views, title_1, description_1, year_1, brand_1, link_1, title_2, description_2, year_2, brand_2, link_2, title_3, description_3, year_3, brand_3, link_3 } = req.body;
        console.log(imageURL1,imageURL2,imageURL3);
        let itemsArray = [
            { title: title_1, description: description_1, year: year_1, brand: brand_1, imageurl: imageURL1, link : link_1 },
            { title: title_2, description: description_2, year: year_2, brand: brand_2, imageurl: imageURL2, link : link_2 },
            { title: title_3, description: description_3, year: year_3, brand: brand_3, imageurl: imageURL3, link : link_3 }
        ];

        const itemsArrayJson = JSON.stringify(itemsArray);
        const sql = "INSERT INTO youtube_data (total_subscribers, total_views, last_post) VALUES (?, ?, ?)";
        const values = [subscribers, views, itemsArrayJson];

        db.query(sql, values, (error, result) => {
            if (error) {
                console.error("Error inserting youtube_data:", error);
                return res.status(500).json({ message: "Error inserting youtube_data", error });
            } else {
                res.json({
                    message: "Success",
                    youtube_dataId: result.insertId
                });
            }
        });

    } catch (err) {
        console.error("An unexpected error occurred:", err);
        res.status(500).send({ error: 'Internal Server Error', details: err.message });
    }
};

const deleteyoutube_data = (req, res) => {
    const sql = 'DELETE FROM youtube_data';

    db.query(sql, (error, result) => {
        if (error) {
            console.error("Error deleting youtube_data:", error);
            res.status(500).json({
                message: "Error deleting youtube_data",
                error: error
            });
        } else {

            const resetAutoIncrement = 'ALTER TABLE youtube_data AUTO_INCREMENT = 1';
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

const getyoutube_databyID = (req,res ) => {
    const igID = req.params.id
    const sql = "SELECT * FROM youtube_data WHERE id = ?"
    db.query(sql, [igID], (error, result) => {
        if (error){
            res.status(500).json({
                message: "Error fetching youtube_data",
                error: error
            });
        } else {
            if (result.length === 0) {
                res.status(404).json({ 
                    message: "youtube_data not found"
                });
            } else {
                const formattedData = result.map(data => ({
                    id: data.id,
                    data : {
                        insight : [
                            {
                                value : data.total_subscribers,
                                unit : "subscribers"
                            },
                            {
                                value : data.total_views,
                                unit : "total views"
                            }
                        ],
                        last_post : JSON.parse(data.last_post)
                    },
                    "message" : "success"
                }))
                res.json(formattedData)
        }
        }      
    })
}

const deleteyoutube_databyID = (req, res) => {
    const youtube_dataId = req.params.id;

    const sql = 'DELETE FROM youtube_data WHERE id = ?';

    db.query(sql, [youtube_dataId], (error, result) => {
        if (error) {
            console.error("Error deleting youtube_data:", error);
            res.status(500).json({
                message: "Error deleting youtube_data",
                error: error
            });
        } else {
            if (result.affectedRows === 0) {
                res.status(404).json({
                    message: "youtube_data not found"
                });
            } else {
                res.json({
                    message: "deleted"
                });
            }
        }
    });
}

const putyoutube_data = async (req, res) => {
    const igDataId = req.params.id;
    const { subscribers, views, title_1, description_1, year_1, brand_1, title_2, description_2, year_2, brand_2, title_3, description_3, year_3, brand_3 } = req.body;

    try { 
        const getCurrentItemsFromDB = () => new Promise((resolve, reject) => {
            db.query('SELECT last_post FROM youtube_data WHERE id = ?', [igDataId], (error, result) => {
                if (error) return reject("Error fetching youtube_data items: " + error);
                if (result.length === 0 || !result[0].last_post) return reject("Items not found in the database");
                resolve(JSON.parse(result[0].last_post));
            });
        });

        const uploadImage = (file) => ik.upload({
            file: file.buffer,
            fileName: file.originalname,
        }).then(response => response.url);

        let updatedItems = await getCurrentItemsFromDB();

        if (req.files) {
            if (req.files['image_1'] && req.files['image_1'][0]) {
                updatedItems[0].imageurl = await uploadImage(req.files['image_1'][0]);
            }
            if (req.files['image_2'] && req.files['image_2'][0]) {
                updatedItems[1].imageurl = await uploadImage(req.files['image_2'][0]);
            }
            if (req.files['image_3'] && req.files['image_3'][0]) {
                updatedItems[2].imageurl = await uploadImage(req.files['image_3'][0]);
            }
        }

        updatedItems[0] = { ...updatedItems[0], title: title_1, description: description_1, year: year_1, brand: brand_1 };
        updatedItems[1] = { ...updatedItems[1], title: title_2, description: description_2, year: year_2, brand: brand_2 };
        updatedItems[2] = { ...updatedItems[2], title: title_3, description: description_3, year: year_3, brand: brand_3 };

        const itemsArrayJson = JSON.stringify(updatedItems);
        const sql = "UPDATE youtube_data SET total_subscribers = ?, total_views = ?, last_post = ? WHERE id = ?";
        const values = [subscribers, views, itemsArrayJson, igDataId];

        db.query(sql, values, (error, result) => {
            if (error) {
                console.error("Error updating youtube_data:", error);
                return res.status(500).json({ message: "Error updating youtube_data", error });
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: "ig data not found" });
            }
            res.json({ message: "Updated" });
        });
    } catch (err) {
        console.error("An error occurred:", err);
        res.status(500).json({ message: "An error occurred", error: err.message });
    }
};

module.exports = {
    getAllyoutube_data,
    postyoutube_data,
    deleteyoutube_data,
    getyoutube_databyID,
    deleteyoutube_databyID,
    putyoutube_data
}