const db = require("../models/connection")
const ImageKit = require('imagekit');
const ik = new ImageKit({
    publicKey: "public_F5lvc2Whw1cbK+bUiWWAaNJ3eRw=",
    privateKey: "private_4CLfPmDyiaRqCAGxkT4jIiwEc+4=",
    urlEndpoint: "https://ik.imagekit.io/cretivox"
  });
 
const getAllportofolio = (req,res) => {
    // const sql = "SELECT * FROM portofolio"
    const sql = "SELECT p.*, s.services_name, s.cover, s.short_description, cl.client_name, cl.logo FROM portofolio p LEFT JOIN client cl ON p.client_id = cl.id LEFT JOIN services s ON p.services_id = s.id"
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
                        content_2 : data.content_2,
                        cover: data.portofolio_cover,
                        slug: data.services_name.toLowerCase()+data.slug,
                        meta_description : data.meta_description, 
                        created_at : data.created_at,
                        client : {
                            name :data.client_name,
                            logo : data.logo
                        },
                        services : {
                            name : data.services_name,
                            cover : data.cover,
                            short_description : data.short_description
                        }
                    }
                }))
                res.json({
                    message : "success",
                    portofolio :formattedData
                })
            }
        }
    })
}

const postportofolio = async (req, res) => {
    try {
        let coverURL,content1URL, content2URL

        if (req.files && req.files['cover'] && req.files['cover'][0]) {
            const coverFile = req.files['cover'][0];

            const coverUploadResponse = await ik.upload({
                file: coverFile.buffer,
                fileName: coverFile.originalname,
            });

            coverURL = coverUploadResponse.url;
        }

        if (req.files && req.files['content1'] && req.files['content1'][0]) {
            const content1File = req.files['content1'][0];

            const content1UploadResponse = await ik.upload({
                file: content1File.buffer,
                fileName: content1File.originalname,
            });

            content1URL = content1UploadResponse.url;
        }

        if (req.files && req.files['content2'] && req.files['content2'][0]) {
            const content2File = req.files['content2'][0];

            const content2UploadResponse = await ik.upload({
                file: content2File.buffer,
                fileName: content2File.originalname,
            });

            content2URL = content2UploadResponse.url;
        }


        // console.log(coverURL);
        const title = req.body.title
        const introduction = req.body.introduction
        const year_project = req.body.year_project
        const scope = req.body.scope
        const team = req.body.team
        const idclient = req.body.client_id
        const idservices = req.body.services_id
        const creationDate = new Date()
        const created_at = creationDate.toISOString().slice(0, 10)
        const slug = "/"+title.toLowerCase().replace(/ /g, '-')
        const meta = req.body.meta_description
        const sql = "INSERT INTO portofolio (created_at, title, introduction, year_project, scope, team, content_1, content_2, portofolio_cover, slug, meta_description, client_id, services_id) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)"
        const value = [created_at, title, introduction, year_project, scope, team, content1URL, content2URL, coverURL, slug, meta, idclient, idservices]
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
    // const {title, introduction, year_project, scope, team, content_1, cover, idcategory, idclient} = req.body
    
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
    const sql = "SELECT p.*, s.services_name, s.cover, s.short_description, cl.client_name, cl.logo FROM portofolio p LEFT JOIN client cl ON p.client_id = cl.id LEFT JOIN services s ON p.services_id = s.id where p.id = ?"
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
                        content_2 : result[0].content_2,
                        cover: result[0].portofolio_cover,
                        slug: result[0].services_name.toLowerCase()+result[0].slug,
                        meta_description : result[0].meta_description,  
                        created_at : result[0].created_at,
                        client : {
                            name :result[0].client_name,
                            logo : result[0].logo
                        },
                        services : {
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
    let coverURL, content1URL, content2URL
    let client, services
    try {
        const coverFile = req.files['cover']
        const content1File = req.files['content1']
        const content2File = req.files['content2']
        const title = req.body.title
        const slug = "/"+title.toLowerCase().replace(/ /g, '-')
        const meta = req.body.meta_description
        const introduction = req.body.introduction
        const year_project = req.body.year_project
        const scope = req.body.scope
        const team = req.body.team
        client = req.body.client_id
        services = req.body.services_id

        if (!services){
            const sqlSelectservices = 'SELECT services_id FROM portofolio WHERE id = ?';
            db.query(sqlSelectservices, [portofolioId], (error, result) => {
                if (error) {
                    console.error("Error fetching portofolio services:", error);
                    res.status(500).json({
                        message: "Error fetching portofolio services",
                        error: error
                    });
                } else {
                    if (result.length === 0 || !result[0].services_id) {
                        res.status(404).json({
                            message: "portofolio services not found in the database"
                        });
                    } else {
                        services = result[0].services_id;
                        // Proceed to update the client
                        // updateclient();
                    }
                }
            });
        }

        if (!client){
            const sqlSelectclient = 'SELECT client_id FROM portofolio WHERE id = ?';
            db.query(sqlSelectclient, [portofolioId], (error, result) => {
                if (error) {
                    console.error("Error fetching portofolio client:", error);
                    res.status(500).json({
                        message: "Error fetching portofolio client",
                        error: error
                    });
                } else {
                    if (result.length === 0 || !result[0].client_id) {
                        res.status(404).json({
                            message: "portofolio client not found in the database"
                        });
                    } else {
                        client = result[0].client_id;
                        // Proceed to update the client
                        // updateclient();
                    }
                }
            });
        }

        if (!content1File) {
            const sqlSelectImage = 'SELECT content_1 FROM portofolio WHERE id = ?';
            db.query(sqlSelectImage, [portofolioId], (error, result) => {
                if (error) {
                    console.error("Error fetching content_1 image:", error);
                    res.status(500).json({
                        message: "Error fetching content_1 image",
                        error: error
                    });
                } else {
                    if (result.length === 0 || !result[0].content_1) {
                        res.status(404).json({
                            message: "content_1 image not found in the database"
                        });
                    } else {
                        content1URL = result[0].content_1;
                        // Proceed to update the portofolio
                        // updateportofolio();
                    }
                }
            });
        } else {
            const content1File = req.files['content1'][0];     
            const portofolioImageUploadResponse = await ik.upload({
                file: content1File.buffer,
                fileName: content1File.originalname,
            });
            content1URL = portofolioImageUploadResponse.url;
            // Proceed to update the portofolio
            // updateportofolio();
        }

        if (!content2File) {
            const sqlSelectImage = 'SELECT content_2 FROM portofolio WHERE id = ?';
            db.query(sqlSelectImage, [portofolioId], (error, result) => {
                if (error) {
                    console.error("Error fetching content_2 image:", error);
                    res.status(500).json({
                        message: "Error fetching content_2 image",
                        error: error
                    });
                } else {
                    if (result.length === 0 || !result[0].content_2) {
                        res.status(404).json({
                            message: "content_2 image not found in the database"
                        });
                    } else {
                        content2URL = result[0].content_2;
                        // Proceed to update the portofolio
                        // updateportofolio();
                    }
                }
            });
        } else {
            const content2File = req.files['content2'][0];     
            const portofolioImageUploadResponse = await ik.upload({
                file: content2File.buffer,
                fileName: content2File.originalname,
            });
            content2URL = portofolioImageUploadResponse.url;
            // Proceed to update the portofolio
            // updateportofolio();
        }


        if (!coverFile) {
            const sqlSelectImage = 'SELECT portofolio_cover FROM portofolio WHERE id = ?';
            db.query(sqlSelectImage, [portofolioId], (error, result) => {
                if (error) {
                    console.error("Error fetching portofolio image:", error);
                    res.status(500).json({
                        message: "Error fetching portofolio image",
                        error: error
                    });
                } else {
                    if (result.length === 0 || !result[0].portofolio_cover) {
                        res.status(404).json({
                            message: "portofolio image not found in the database"
                        });
                    } else {
                        coverURL = result[0].portofolio_cover;
                        // Proceed to update the portofolio
                        updateportofolio();
                    }
                }
            });
        } else {
            const coverFile = req.files['cover'][0];     
            const portofolioImageUploadResponse = await ik.upload({
                file: coverFile.buffer,
                fileName: coverFile.originalname,
            });
            coverURL = portofolioImageUploadResponse.url;
            // Proceed to update the portofolio
            updateportofolio();
        }



        function updateportofolio(){
            const sql = "UPDATE portofolio SET title = ? , introduction = ?, year_project = ?, scope = ?, team = ?, content_1 = ?, content_2 = ?, slug = ?, meta_description = ?, portofolio_cover = ?, client_id = ?, services_id = ? WHERE id = ? "
            const value = [title, introduction, year_project, scope, team, content1URL, content2URL, slug, meta, coverURL, client, services, portofolioId]
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