const db = require("../models/connection")
const file = require("../config/filehandling")


const getAllintern_member = (req,res ) => {
    const sql = `
        SELECT m.*, b.batch 
        FROM intern_member m 
        LEFT JOIN intern_batch b 
        ON m.batch_id = b.id
    `;

    db.query(sql, (error, result) => {
        if (error) {
            return res.status(500).json({
                message: "Error fetching intern_member",
                error: error
            });
        }

        if (result.length === 0) {
            return res.status(404).json({
                message: "intern_member not found"
            });
        }

        const formattedData = result.map(data => ({
            id: data.id,
            data: {
                name: data.member_name,
                image: data.image,
                university: data.university,
                division: data.division,
                instagram: data.instagram,
                batch : {
                    name : data.batch
                }
            }
        }));

        res.json({
            message : "success",
            intern_member :formattedData
        })
    });
}

const postintern_member = async (req, res) => {
    try{
        let imageURL 
        const imageFile = req.files && req.files['image'] && req.files['image'][0]
        imageURL = imageFile ? await file.uploadFile(imageFile) : ''
        
        const { member_name, university, division, instagram, batch_id } = req.body;
        // console.log(imageURL, " ", internname)
        const sql = "INSERT INTO intern_member ( member_name, university, division, instagram, image, batch_id) VALUES (?,?,?,?,?,?)"
        const value = [member_name, university, division, instagram, imageURL, batch_id ]

        db.query(sql, value, (error, result) => {
            if (error) {
                res.status(500).json({
                    message: "Error inserting intern",
                    error: error
                });
            } else {
                res.json({
                    message: "Success",
                    internId: result.insertId
                });
            }
        })
    }catch{
        res.status(500).send({ error: 'Internal Server Error' });
    }
    
}

const deleteintern_member = (req, res) => {
    const sql = 'DELETE FROM intern_member';

    db.query(sql, (error, result) => {
        if (error) {
            console.error("Error deleting intern_member:", error);
            res.status(500).json({
                message: "Error deleting intern_member",
                error: error
            });
        } else {

            const resetAutoIncrement = 'ALTER TABLE intern_member AUTO_INCREMENT = 1';
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

const getintern_memberbyID = (req, res) => {
    const internId = req.params.id
    const sql = `
        SELECT m.*, b.batch 
        FROM intern_member m 
        LEFT JOIN intern_batch b 
        ON m.batch_id = b.id
        WHERE m.id = ?
    `;
    db.query(sql, [internId], (error, result) => {
        if (error) {
            console.error("Error fetching intern:", error);
            res.status(500).json({
                message: "Error fetching intern",
                error: error
            });
        } else {
            if (result.length === 0) {
                res.status(404).json({
                    message: "intern not found"
                });
            } else {
                res.json({
                    id: result[0].id,
                    data : {
                        name : result[0].member_name,
                        image : result[0].image,
                        university : result[0].university,
                        division : result[0].division,
                        instagram : result[0].instagram,
                        batch : {
                            name : result[0].batch
                        }
                    },
                    message: "Success"
                });
            }
        }
    })
}

const deleteintern_memberbyID = (req, res) => {
    const internId = req.params.id;

    const sql = 'DELETE FROM intern_member WHERE id = ?';

    db.query(sql, [internId], (error, result) => {
        if (error) {
            console.error("Error deleting intern_member:", error);
            res.status(500).json({
                message: "Error deleting intern_member",
                error: error
            });
        } else {
            if (result.affectedRows === 0) {
                res.status(404).json({
                    message: "intern_member not found"
                });
            } else {
                res.json({
                    message: "deleted"
                });
            }
        }
    });
}

const putintern_member = async (req, res) => {
    const internId = req.params.id
    const { member_name, university, division, instagram, batch_id } = req.body;
    const imageFile = req.files && req.files['image'] && req.files['image'][0]
    let imageURL

    try {
        const getbatchIDFromDB = () => new Promise((resolve, reject) => {
            const sqlSelectImage = 'SELECT batch_id FROM intern_member WHERE id = ?';
            db.query(sqlSelectImage, [internId], (error, result) => {
                if (error) return reject("Error fetching intern_member department" + error)
                if (result.length === 0 || !result[0].batch_id) return reject("intern_member department not found in the database")
                resolve(result[0].batch_id)
            })
        })
        
        const getEmployeeURLFromDB = () => new Promise((resolve, reject) => {
            const sqlSelectImage = 'SELECT image FROM intern_member WHERE id = ?';
            db.query(sqlSelectImage, [internId], (error, result) => {
                if (error) return reject("Error fetching intern_member image" + error)
                if (result.length === 0 || !result[0].image) return reject("intern_member image not found in the database")
                resolve(result[0].image)
            })
        })

        const batch = batch_id || await getbatchIDFromDB()
        imageURL = imageFile ? await file.uploadFile(imageFile) : await getEmployeeURLFromDB()
        
        const sql = "UPDATE intern_member SET member_name = ? , university = ?, division = ?, instagram = ?, image = ?, batch_id = ? WHERE id = ?"
        const value = [member_name, university, division, instagram,  imageURL, batch, internId]
        db.query(sql, value, (error, result) => {
            if (error) {
                console.error("Error updating intern_member:", error);
                res.status(500).json({
                    message: "Error updating intern_member", 
                    error: error
                });
            } else {
                if (result.affectedRows === 0) {
                    res.status(404).json({
                        message: "intern_member not found"
                    });
                } else {
                    res.json({
                        message: "Updated"
                    });
                }
            }
        });

        // updateintern()
        // function updateintern(){
        //     const sql = "UPDATE intern_member SET member_name = ? , university = ?, division = ?, instagram = ?, image = ?, batch_id = ? WHERE id = ?"
        //     const value = [member_name, university, division, instagram,  imageURL, batch, internId]
        //     db.query(sql, value, (error, result) => {
        //         if (error) {
        //             console.error("Error updating intern_member:", error);
        //             res.status(500).json({
        //                 message: "Error updating intern_member", 
        //                 error: error
        //             });
        //         } else {
        //             if (result.affectedRows === 0) {
        //                 res.status(404).json({
        //                     message: "intern_member not found"
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
    getAllintern_member,
    postintern_member,
    deleteintern_member,
    getintern_memberbyID,
    deleteintern_memberbyID,
    putintern_member
}