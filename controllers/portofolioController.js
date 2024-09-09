const db = require("../models/connection")
const file = require("../config/filehandling")

 
const getAllportofolio = (req,res) => {
    // const sql = "SELECT * FROM portofolio"
    const sql = "SELECT p.*,s.id as services_id, s.services_name, s.cover, s.short_description, cl.id as client_id, cl.client_name, cl.logo FROM portofolio p LEFT JOIN client cl ON p.client_id = cl.id LEFT JOIN services s ON p.services_id = s.id"
    db.query(sql, (error, result) => {
        if (error) {
            res.status(500).json({
                message: "error fetching portofolio",
                error : error
            })
        } else {
            if (result.length === 0){
                res.status(404).json({
                    message: "portofolio not found"
                })
            } else {
                const formattedData = result.map(data => ({
                    id : data.id,
                    data : {
                        title : data.title, 
                        introduction : data.introduction, 
                        year_project : data.year_project, 
                        scope : data.scope, 
                        team : data.team, 
                        content_1 : data.content_1, 
                        // content_2 : data.content_2,
                        cover: data.portofolio_cover,
                        slug: data.services_name.toLowerCase().replace(/ /g, '-')+data.slug,
                        meta_description : data.meta_description, 
                        created_at : data.created_at,
                        client : {
                            id : data.client_id,
                            name :data.client_name,
                            logo : data.logo
                        },
                        services : {
                            id : data.services_id,
                            name : data.services_name,
                            cover : data.cover,
                            short_description : data.short_description
                        }
                    }
                }))
                res.json({
                    message : "success",
                    portfolio :formattedData
                })
            }
        }
    })
}

const postportofolio = async (req, res) => {
    try {
        let coverURL,content1URL, content2URL
        content2URL = "" //delete content2
        const coverFile = req.files && req.files['cover'] && req.files['cover'][0]
        const content1File = req.files && req.files['content1'] && req.files['content1'][0]
        coverURL = coverFile ? await file.uploadFile(coverFile) : ''
        content1URL = content1File ? await file.uploadFile(content1File) : ''
    
        const {title, introduction, year_project, scope, team, client_id, services_id} = req.body
        const creationDate = new Date()
        const created_at = creationDate.toISOString().slice(0, 10)
        const slug = "/"+title.toLowerCase().replace(/ /g, '-')
        const meta = req.body.meta_description
        const sql = "INSERT INTO portofolio (created_at, title, introduction, year_project, scope, team, content_1, content_2, portofolio_cover, slug, meta_description, client_id, services_id) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)"
        const value = [created_at, title, introduction, year_project, scope, team, content1URL, content2URL, coverURL, slug, meta, client_id, services_id]
        db.query(sql, value, (error, result) => {
            if (error) {
                res.status(500).json({
                    message: "Error inserting client",
                    error: error
                });
            } else {
                res.json({
                    message: "Success",
                    clientId: result.insertId
                });
            }
        })
    } catch {
        res.status(500).send({ error: 'Internal Server Error' });
    }
    
}

const deleteportofolio = (req, res) => {
    const sql = 'DELETE FROM portofolio';

    db.query(sql, (error, result) => {
        if (error) {
            console.error("Error deleting portofolio:", error);
            res.status(500).json({
                message: "Error deleting portofolio",
                error: error
            });
        } else {

            const resetAutoIncrement = 'ALTER TABLE portofolio AUTO_INCREMENT = 1';
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

const getportofoliobyID = (req,res) => {
    const portofolioId = req.params.id
    const sql = "SELECT p.*,s.id as services_id, s.services_name, s.cover, s.short_description,cl.id as client_id, cl.client_name, cl.logo FROM portofolio p LEFT JOIN client cl ON p.client_id = cl.id LEFT JOIN services s ON p.services_id = s.id where p.id = ?"
    db.query(sql,[portofolioId], (error, result) => {
        if (error) {
            console.error("error fetching portofolio: ", error)
            res.status(500).json({
                message: "error fetching portofolio",
                error : error
            })
        } else {
            if (result.length === 0) {
                res.status(404).json({
                    message : "portofolio not found"
                })
            } else {
                res.json({
                    id : result[0].id,
                    data : {
                        title : result[0].title, 
                        introduction : result[0].introduction, 
                        year_project : result[0].year_project, 
                        scope : result[0].scope, 
                        team : result[0].team, 
                        content_1 : result[0].content_1, 
                        // content_2 : result[0].content_2,
                        cover: result[0].portofolio_cover,
                        slug: result[0].services_name.toLowerCase().replace(/ /g, '-')+result[0].slug,
                        meta_description : result[0].meta_description,  
                        created_at : result[0].created_at,
                        client : {
                            id : result[0].client_id,
                            name :result[0].client_name,
                            logo : result[0].logo
                        },
                        services : {
                            id : result[0].services_id,
                            name : result[0].services_name,
                            cover : result[0].cover,
                            short_description : result[0].short_description
                        }
                    }
                })
            }
        }
    })
}

const deleteportofoliobyID = (req, res) => {
    const portofolioId = req.params.id;

    const sql = 'DELETE FROM portofolio WHERE id = ?';

    db.query(sql, [portofolioId], (error, result) => {
        if (error) {
            console.error("Error deleting portofolio:", error);
            res.status(500).json({
                message: "Error deleting portofolio",
                error: error
            });
        } else {
            if (result.affectedRows === 0) {
                res.status(404).json({
                    message: "portofolio not found"
                });
            } else {
                res.json({
                    message: "deleted"
                });
            }
        }
    });
}

const putportofolio = async (req, res) => {
    const portofolioId = req.params.id
    const {title, meta_description, introduction, year_project,scope,team,client_id,services_id} = req.body
    const slug = "/"+title.toLowerCase().replace(/ /g, '-')
    let coverURL, content1URL, content2URL = ""
    const coverFile = req.files && req.files['cover'] && req.files['cover'][0]
    const content1File = req.files && req.files['content1'] && req.files['content1'][0]

    try {
        const getServicesFromDB = () => new Promise((resolve, reject) => {
            const sql = 'SELECT services_id FROM portofolio WHERE id = ?';
            db.query(sql, [portofolioId], (error, result) => {
                if (error) return reject("Error fetching services: " + error);
                if (result.length === 0 || !result[0].services_id) return reject("Services not found in the database");
                resolve(result[0].services_id);
            });
        });

        const getClientFromDB = () => new Promise((resolve, reject) => {
            const sql = 'SELECT client_id FROM portofolio WHERE id = ?';
            db.query(sql, [portofolioId], (error, result) => {
                if (error) return reject("Error fetching client: " + error);
                if (result.length === 0 || !result[0].client_id) return reject("Client not found in the database");
                resolve(result[0].client_id);
            });
        });

        const getImageFromDB = (column) => new Promise((resolve, reject) => {
            const sql = `SELECT ${column} FROM portofolio WHERE id = ?`;
            db.query(sql, [portofolioId], (error, result) => {
                if (error) return reject(`Error fetching ${column}: ` + error);
                if (result.length === 0 || !result[0][column]) return reject(`${column} not found in the database`);
                resolve(result[0][column]);
            });
        });

        const services = services_id || await getServicesFromDB();
        const client = client_id || await getClientFromDB();
        content1URL = content1File ? await file.uploadFile(content1File) : await getImageFromDB('content_1')
        coverURL = coverFile ? await file.uploadFile(coverFile) : await getImageFromDB('portofolio_cover');
        updateportofolio()
        function updateportofolio(){
            const sql = "UPDATE portofolio SET title = ? , introduction = ?, year_project = ?, scope = ?, team = ?, content_1 = ?, content_2 = ?, slug = ?, meta_description = ?, portofolio_cover = ?, client_id = ?, services_id = ? WHERE id = ? "
            const value = [title, introduction, year_project, scope, team, content1URL, content2URL, slug, meta_description, coverURL, client, services, portofolioId]
            db.query(sql, value, (error, result) => {
                if(error){
                    console.log("error updating client", error)
                    res.status(500).json({
                        message: "error updating portofolio",
                        error : error
                    })
                } else {
                    if (result.length === 0){
                        res.status(404).json({
                            message:"portofolio not found"
                        })
                    } else {
                        res.json({
                            message:"updated"
                        })
                    }
                }
            })
        }

    } catch(err) {
        console.error("An error occurred:", err);
        res.status(500).json({
            message: "An error occurred",
            error: err.message
        });
    }

    
    // console.log(title,introduction, year_project, scope,team,content_1,cover);
}
 
module.exports = {
    getAllportofolio,
    postportofolio,
    deleteportofolio,
    getportofoliobyID,
    deleteportofoliobyID,
    putportofolio
}