const db = require("../models/connection")
const file = require("../config/filehandling")

const getAllintern_batch = (req, res) => {
    const sql = `
        SELECT b.*, m.member_name, m.image AS member_image, m.university, m.division, m.instagram as ig_account
        FROM intern_batch b 
        LEFT JOIN intern_member m 
        ON m.batch_id = b.id
    `;

    db.query(sql, (error, result) => {
        if (error) {
            return res.status(500).json({
                message: "Error fetching intern",
                error: error
            });
        }

        if (result.length === 0) {
            return res.status(404).json({
                message: "Intern not found"
            });
        }

        const intern_batchMap = {};

        result.map(data => {
            if (!intern_batchMap[data.id]) {
                intern_batchMap[data.id] = {
                    id: data.id,
                    data: {
                        batch: data.batch,
                        title: data.title,
                        // image: data.image,
                        best_intern: data.best_intern,
                        periode: data.periode,
                        philosophy: data.philosophy,
                        season : data.season,
                        instagram : data.instagram,
                        exam : [
                            {
                            name : "poster",
                            data : data.image
                            },
                            {
                            name : "siapa",
                            data : data.siapa
                            },
                            {
                            name : "dua tipe",
                            data : data.dua_tipe
                            },
                            {
                            name : "reveal video",
                            data : data.reveal
                            },
                        ],
                        member: [],
                        total_member: 0
                    }
                };
            }
            if (data.member_name) {
                intern_batchMap[data.id].data.member.push({
                    name: data.member_name,
                    image: data.member_image, 
                    university: data.university,
                    division: data.division,
                    instagram: data.ig_account
                });
            }

            intern_batchMap[data.id].data.total_member = intern_batchMap[data.id].data.member.length;
        });

        const formattedData = Object.values(intern_batchMap);

        res.json({
            message : "success",
            intern_batch :formattedData
        })
    });
};

const postintern_batch = async (req, res) => {
    try{
        let imageURL 
        const imageFile = req.files && req.files['image'] && req.files['image'][0]
        imageURL = imageFile ? await file.uploadFile(imageFile) : ''

        const { batch, title, best_intern, periode, instagram, philosophy , siapa, reveal, dua_tipe, season} = req.body;
        const sql = "INSERT INTO intern_batch ( batch, title, best_intern, periode, instagram, philosophy, image, reveal, siapa, dua_tipe, season) VALUES (?,?,?,?,?,?,?,?,?,?,?)"
        const value = [ batch, title, best_intern, periode, instagram, philosophy, imageURL, reveal, siapa, dua_tipe, season]

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

const deleteintern_batch = (req, res) => {
    const sql = 'DELETE FROM intern_batch';

    db.query(sql, (error, result) => {
        if (error) {
            // console.error("Error deleting intern:", error);
            res.status(500).json({
                message: "Error deleting intern",
                error: error
            });
        } else {

            const resetAutoIncrement = 'ALTER TABLE intern_batch AUTO_INCREMENT = 1';
            db.query(resetAutoIncrement, (error, result) => {
                if (error) {
                    // console.error("Error resetting auto-increment counter:", error);
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

const getintern_batchbyID = (req, res) => {
    const batchId = req.params.id;
    const sql = `
        SELECT b.*, m.member_name, m.image AS member_image, m.university, m.division, m.instagram as ig_account
        FROM intern_batch b 
        LEFT JOIN intern_member m 
        ON m.batch_id = b.id
        WHERE b.id = ?
    `;

    db.query(sql, [batchId], (error, result) => {
        if (error) {
            return res.status(500).json({
                message: "Error fetching intern batch",
                error: error
            });
        }

        if (result.length === 0) {
            return res.status(404).json({
                message: "Intern batch not found"
            });
        }
        const intern_batch = {
            id: result[0].id,
            data: {
                batch: result[0].batch,
                title: result[0].title,
                // image: result[0].image,
                best_intern: result[0].best_intern,
                periode: result[0].periode,
                philosophy: result[0].philosophy,
                season : result[0].season,
                instagram : result[0].instagram,
                exam : [
                    {
                    name : "poster",
                    data : result[0].image
                    },
                    {
                    name : "siapa",
                    data : result[0].siapa
                    },
                    {
                    name : "dua tipe",
                    data : result[0].dua_tipe
                    },
                    {
                    name : "reveal video",
                    data : result[0].reveal
                    },
                ],
                member: []
            }
        };
        
        result.forEach(data => {
            if (data.member_name) {  
                intern_batch.data.member.push({
                    name: data.member_name,
                    image: data.member_image, 
                    university: data.university,
                    division: data.division,
                    instagram: data.ig_account
                });
            }
        });

        intern_batch.data.total_member = intern_batch.data.member.length;

        res.json(intern_batch);
    });
}

const deleteintern_batchbyID = (req, res) => {
    const internId = req.params.id;

    const sql = 'DELETE FROM intern_batch WHERE id = ?';

    db.query(sql, [internId], (error, result) => {
        if (error) {
            // console.error("Error deleting intern:", error);
            res.status(500).json({
                message: "Error deleting intern",
                error: error
            });
        } else {
            if (result.affectedRows === 0) {
                res.status(404).json({
                    message: "intern not found"
                });
            } else {
                res.json({
                    message: "deleted"
                });
            }
        }
    });
}

const putintern_batch = async (req, res) => {
    const internId = req.params.id
    const imageFile = req.files && req.files['image'] && req.files['image'][0]
    const { batch, title, best_intern, periode, instagram , philosophy, reveal, siapa, dua_tipe,season } = req.body;
    let imageURL
    try {
        const getinternbatchURLFromDB = () => new Promise((resolve, reject) => {
            const sqlSelectImage = 'SELECT image FROM intern_batch WHERE id = ?';
            db.query(sqlSelectImage, [internId], (error, result) => {
                if (error) return reject("Error fetching intern_batch image" + error)
                if (result.length === 0 || !result[0].image) return reject("intern_batch image not found in the database")
                resolve(result[0].image)
            })
        })
        imageURL = imageFile ? await file.uploadFile(imageFile) : await getinternbatchURLFromDB()

        updateintern()
        function updateintern(){
            // console.log(instagram);
            const sql = "UPDATE intern_batch SET batch = ?, title= ?, best_intern= ?, periode= ?, instagram= ?,philosophy= ?, image = ?, reveal = ?, siapa = ?, dua_tipe = ?, season = ? WHERE id = ?"
            const value = [batch, title, best_intern, periode, instagram ,philosophy, imageURL, reveal, siapa, dua_tipe,season, internId]
            db.query(sql, value, (error, result) => {
                if (error) {
                    // console.error("Error updating intern_batch:", error);
                    res.status(500).json({
                        message: "Error updating intern_batch", 
                        error: error
                    });
                } else {
                    if (result.affectedRows === 0) {
                        res.status(404).json({
                            message: "intern_batch not found"
                        });
                    } else {
                        res.json({
                            message: "Updated"
                        });
                    }
                }
            });
        }
    } catch(err) {
        // console.error("An error occurred:", err);
        res.status(500).json({
            message: "An error occurred",
            error: err.message
        });
    }
    
}

module.exports = {
    getAllintern_batch,
    postintern_batch,
    getintern_batchbyID,
    deleteintern_batch,
    deleteintern_batchbyID,
    putintern_batch
}