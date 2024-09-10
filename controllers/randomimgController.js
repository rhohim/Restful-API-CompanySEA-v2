const db = require("../models/connection")
const file = require("../config/filehandling") 

const getAllrandom_img = (req,res ) => {
    const sql = "SELECT * FROM random_img"
    db.query(sql, (error, result) => {
        if (error){
            res.status(500).json({
                message: "Error fetching random_img",
                error: error
            });
        } else {
            if (result.length === 0) {
                res.status(404).json({ 
                    message: "random_img not found"
                });
            } else {
                const formattedData = result.map(data => ({
                    id: data.id,
                    data : {
                        image : data.image,
                        alt_image : data.alt_image
                    },
                    
                }))
                res.json({
                            message : "success",
                            random_image :formattedData
                        })
        }
        }      
    }) 
}

const postrandom_img = async (req, res) => {
    try{
        let imageURL
        const imageFile = req.files && req.files['image'] && req.files['image'][0]
        imageURL = imageFile ? await file.uploadFile(imageFile) : ''
        const alt_image = req.body.alt_image
        const sql = "INSERT INTO random_img ( image, alt_image) VALUES ( ?, ?)"
        const value = [imageURL, alt_image]

        db.query(sql, value, (error, result) => {
            if (error) {
                res.status(500).json({
                    message: "Error inserting random_img",
                    error: error
                });
            } else {
                res.json({
                    message: "Success",
                    random_imgId: result.insertId
                });
            }
        })
    }catch{
        res.status(500).send({ error: 'Internal Server Error' });
    }
    
}

const deleterandom_img = (req, res) => {
    const sql = 'DELETE FROM random_img';

    db.query(sql, (error, result) => {
        if (error) {
            console.error("Error deleting random_img:", error);
            res.status(500).json({
                message: "Error deleting random_img",
                error: error
            });
        } else {

            const resetAutoIncrement = 'ALTER TABLE random_img AUTO_INCREMENT = 1';
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

const getrandom_imgbyID = (req, res) => {
    const random_imgId = req.params.id
    const sql = "SELECT * FROM random_img WHERE id = ?"
    db.query(sql, [random_imgId], (error, result) => {
        if (error) {
            console.error("Error fetching random_img:", error);
            res.status(500).json({
                message: "Error fetching random_img",
                error: error
            });
        } else {
            if (result.length === 0) {
                res.status(404).json({
                    message: "random_img not found"
                });
            } else {
                res.json({
                    id: result[0].id,
                    data : {
                        image : result[0].image,
                        alt_image : result[0].alt_image
                    },
                    message: "Success"
                });
            }
        }
    })
}


const deleterandom_imgbyID = (req, res) => {
    const random_imgId = req.params.id;

    const sql = 'DELETE FROM random_img WHERE id = ?';

    db.query(sql, [random_imgId], (error, result) => {
        if (error) {
            console.error("Error deleting random_img:", error);
            res.status(500).json({
                message: "Error deleting random_img",
                error: error
            });
        } else {
            if (result.affectedRows === 0) {
                res.status(404).json({
                    message: "random_img not found"
                });
            } else {
                res.json({
                    message: "deleted"
                });
            }
        }
    });
}

const putrandom_img = async (req, res) => {
    const random_imgId = req.params.id
    let imageURL
    const imageFile = req.files && req.files['image'] && req.files['image'][0]
    const alt_image = req.body.alt_image;
    try {
        const getrandomimgURLFromDB = () => new Promise((resolve, reject) => {
            const sqlSelectImage = 'SELECT image FROM random_img WHERE id = ?';
            db.query(sqlSelectImage, [random_imgId], (error, result) => {
                if (error) return reject("Error fetching image" + error)
                if (result.length === 0 || !result[0].image) return reject("image not found in the database")
                resolve(result[0].image)
            })
        })
        imageURL = imageFile ? await file.uploadFile(imageFile) : await getrandomimgURLFromDB()
        
        const sql = "UPDATE random_img SET image = ? , alt_image = ? WHERE id = ?"
        const value = [imageURL, alt_image, random_imgId]
        db.query(sql, value, (error, result) => {
            if (error) {
                console.error("Error updating random_img:", error);
                res.status(500).json({
                    message: "Error updating random_img", 
                    error: error
                });
            } else {
                if (result.affectedRows === 0) {
                    res.status(404).json({
                        message: "random_img not found"
                    });
                } else {
                    res.json({
                        message: "Updated"
                    });
                }
            }
        });

        // updaterandom_img()
        // function updaterandom_img(){
        //     const sql = "UPDATE random_img SET image = ? , alt_image = ? WHERE id = ?"
        //     const value = [imageURL, alt_image, random_imgId]
        //     db.query(sql, value, (error, result) => {
        //         if (error) {
        //             console.error("Error updating random_img:", error);
        //             res.status(500).json({
        //                 message: "Error updating random_img", 
        //                 error: error
        //             });
        //         } else {
        //             if (result.affectedRows === 0) {
        //                 res.status(404).json({
        //                     message: "random_img not found"
        //                 });
        //             } else {
        //                 res.json({
        //                     message: "Updated"
        //                 });
        //             }
        //         }
        //     });
        // }
    } catch(err) {
        console.error("An error occurred:", err);
        res.status(500).json({
            message: "An error occurred",
            error: err.message
        });
    }
    
}

module.exports = {
    getAllrandom_img,
    postrandom_img,
    deleterandom_img,
    getrandom_imgbyID,
    deleterandom_imgbyID,
    putrandom_img
}