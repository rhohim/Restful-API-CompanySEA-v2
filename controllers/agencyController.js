const db = require("../models/connection")
const ImageKit = require('imagekit');
const ik = new ImageKit({ 
    publicKey: "public_F5lvc2Whw1cbK+bUiWWAaNJ3eRw=",
    privateKey: "private_4CLfPmDyiaRqCAGxkT4jIiwEc+4=",
    urlEndpoint: "https://ik.imagekit.io/cretivox"
  }); 

const getAllAgency = (req, res) => {
    const sql = "SELECT * FROM agency";
    const page = parseInt(req.query.page)|| 1;
    const pageSize = parseInt(req.query.pageSize) || 15;
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    db.query(sql, (error, result) => {
        if (error) {
            res.status(500).json({ 
                message: "Error fetching agency data",
                error: error
            });
        } else {
            if (result.length === 0) {
                res.status(404).json({
                    message: "Agency data not found"
                });
            } else {
                const paginatedResult = result.slice(start, end);
                const formattedData = paginatedResult.map(data => ({
                    id: data.id,
                    data: {
                        photo_profile: data.photo_profile,
                        username: data.username,
                        image_post: data.image_post,
                        likes: data.likes,
                        caption: data.caption,
                        link : data.link
                    },
                }));
                res.json({
                    page,
                    pageSize: pageSize,
                    totalItems: result.length,
                    totalPages: Math.ceil(result.length / pageSize),
                    message : "success",
                    agency :formattedData
                })
            }
        }
    });
};

const postAgency = async (req, res) => {
    try {
        let photoProfileURL = "";
        let postImageURL = "";

        if (req.files && req.files['photo_profile'] && req.files['photo_profile'][0]) {
            const photoProfileFile = req.files['photo_profile'][0];

            const photoProfileUploadResponse = await ik.upload({
                file: photoProfileFile.buffer,
                fileName: photoProfileFile.originalname,
            });

            photoProfileURL = photoProfileUploadResponse.url;
        }

        if (req.files && req.files['image_post'] && req.files['image_post'][0]) {
            const postImageFile = req.files['image_post'][0];

            const postImageUploadResponse = await ik.upload({
                file: postImageFile.buffer,
                fileName: postImageFile.originalname,
            });

            postImageURL = postImageUploadResponse.url;
        }

        const username = req.body.username;
        const likes = req.body.likes;
        const caption = req.body.caption;
        const link = req.body.link

        const sql = "INSERT INTO agency (photo_profile, username, image_post, likes, caption, link) VALUES (?, ?, ?, ?, ?, ?)";
        const values = [photoProfileURL, username, postImageURL, likes, caption, link];

        db.query(sql, values, (error, result) => {
            if (error) {
                res.status(500).json({
                    message: "Error inserting agency data",
                    error: error
                });
            } else {
                res.json({
                    message: "Success",
                    agencyId: result.insertId
                });
            }
        });
    } catch (error) {
        res.status(500).send({ error: 'Internal Server Error' });
    }
};

const deleteAllAgency = (req, res) => {
    const sql = 'DELETE FROM agency';

    db.query(sql, (error, result) => {
        if (error) {
            console.error("Error deleting agency data:", error);
            res.status(500).json({
                message: "Error deleting agency data",
                error: error
            });
        } else {
            const resetAutoIncrement = 'ALTER TABLE agency AUTO_INCREMENT = 1';
            db.query(resetAutoIncrement, (error, result) => {
                if (error) {
                    console.error("Error resetting auto-increment counter:", error);
                    res.status(500).json({
                        message: "Error resetting auto-increment counter",
                        error: error
                    });
                } else {
                    res.json({
                        message: "Deleted"
                    });
                }
            });
        }
    });
};

const getAgencyByID = (req, res) => {
    const agencyId = req.params.id;
    const sql = "SELECT * FROM agency WHERE id = ?";
    db.query(sql, [agencyId], (error, result) => {
        if (error) {
            console.error("Error fetching agency data:", error);
            res.status(500).json({
                message: "Error fetching agency data",
                error: error
            });
        } else {
            if (result.length === 0) {
                res.status(404).json({
                    message: "Agency data not found"
                });
            } else {
                res.json({
                    id: result[0].id,
                    data: {
                        photo_profile: result[0].photo_profile,
                        username: result[0].username,
                        image_post: result[0].image_post,
                        likes: result[0].likes,
                        caption: result[0].caption,
                        link : result[0].link
                    },
                    message: "Success"
                });
            }
        }
    });
};

const deleteAgencyByID = (req, res) => {
    const agencyId = req.params.id;

    const sql = 'DELETE FROM agency WHERE id = ?';

    db.query(sql, [agencyId], (error, result) => {
        if (error) {
            console.error("Error deleting agency data:", error);
            res.status(500).json({
                message: "Error deleting agency data",
                error: error
            });
        } else {
            if (result.affectedRows === 0) {
                res.status(404).json({
                    message: "Agency data not found"
                });
            } else {
                res.json({
                    message: "Deleted"
                });
            }
        }
    });
};

const putAgency = async (req, res) => {
    const agencyId = req.params.id;
    const { username, likes, caption , link} = req.body;
    let photoProfileURL, postImageURL;

    try {
        const photoProfileFile = req.files['photo_profile'] ? req.files['photo_profile'][0] : null;
        const postImageFile = req.files['image_post'] ? req.files['image_post'][0] : null;

        const getPhotoProfileURLFromDB = () => new Promise((resolve, reject) => {
            db.query('SELECT photo_profile FROM agency WHERE id = ?', [agencyId], (error, result) => {
                if (error) return reject("Error fetching agency photo profile: " + error);
                if (result.length === 0 || !result[0].photo_profile) return reject("Agency photo profile not found in the database");
                resolve(result[0].photo_profile);
            });
        });

        const getPostImageURLFromDB = () => new Promise((resolve, reject) => {
            db.query('SELECT image_post FROM agency WHERE id = ?', [agencyId], (error, result) => {
                if (error) return reject("Error fetching agency post image: " + error);
                if (result.length === 0 || !result[0].image_post) return reject("Agency post image not found in the database");
                resolve(result[0].image_post);
            });
        });

        const uploadImage = (file) => ik.upload({
            file: file.buffer,
            fileName: file.originalname,
        }).then(response => response.url);

        photoProfileURL = photoProfileFile ? await uploadImage(photoProfileFile) : await getPhotoProfileURLFromDB();
        postImageURL = postImageFile ? await uploadImage(postImageFile) : await getPostImageURLFromDB();

        const sql = "UPDATE agency SET photo_profile = ?, username = ?, image_post = ?, likes = ?, caption = ?, link = ? WHERE id = ?";
        const values = [photoProfileURL, username, postImageURL, likes, caption, link, agencyId];

        db.query(sql, values, (error, result) => {
            if (error) {
                console.error("Error updating agency data:", error);
                return res.status(500).json({ message: "Error updating agency data", error });
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: "Agency data not found" });
            }
            res.json({ message: "Updated" });
        });
    } catch (err) {
        console.error("An error occurred:", err);
        res.status(500).json({ message: "An error occurred", error: err.message });
    }
};


module.exports = {
    getAllAgency,
    postAgency,
    deleteAllAgency,
    getAgencyByID,
    deleteAgencyByID,
    putAgency
}