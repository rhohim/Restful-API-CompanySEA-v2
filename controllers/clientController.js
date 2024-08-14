const db = require("../models/connection")
const ImageKit = require('imagekit');
const ik = new ImageKit({ 
    publicKey: "public_F5lvc2Whw1cbK+bUiWWAaNJ3eRw=",
    privateKey: "private_4CLfPmDyiaRqCAGxkT4jIiwEc+4=",
    urlEndpoint: "https://ik.imagekit.io/cretivox"
  });
 
const getAllclient = (req,res ) => {
    const sql = "SELECT * FROM client"
    const page = parseInt(req.query.page)|| 1;
    const pageSize = parseInt(req.query.pageSize) || 15;
    // console.log(page, pageSize)
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    // console.log(start,end)
    db.query(sql, (error, result) => {
        if (error){
            res.status(500).json({
                message: "Error fetching client",
                error: error
            });
        } else {
            if (result.length === 0) {
                res.status(404).json({ 
                    message: "client not found"
                });
            } else {
                const paginatedResult = result.slice(start, end);
                const formattedData = paginatedResult.map(data => ({
                        id: data.id,
                        data : {
                            name : data.client_name,
                            logo : data.logo,
                        }
                }))
                // const formattedData = result.map(data => ({
                //     id: data.id,
                //     data : {
                //         name : data.client_name,
                //         logo : data.logo,
                //     }
                // }))
                res.json({
                    page,
                    pageSize: pageSize,
                    totalItems: result.length,
                    totalPages: Math.ceil(result.length / pageSize),
                    message : "success",
                    client :formattedData
                })
        }
        }      
    })
}

const postclient = async (req, res) => {
    try{
        let logoURL = "";

        if (req.files && req.files['logo'] && req.files['logo'][0]) {
            const logoFile = req.files['logo'][0];

            const logoUploadResponse = await ik.upload({
                file: logoFile.buffer,
                fileName: logoFile.originalname,
            });

            logoURL = logoUploadResponse.url;
        }

        const clientname = req.body.name
        // console.log(logoURL, " ", clientname)
        const sql = "INSERT INTO client ( client_name, logo) VALUES (?, ?)"
        const value = [clientname, logoURL]

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
    }catch{
        res.status(500).send({ error: 'Internal Server Error' });
    }
    
}

const deleteclient = (req, res) => {
    const sql = 'DELETE FROM client';

    db.query(sql, (error, result) => {
        if (error) {
            console.error("Error deleting client:", error);
            res.status(500).json({
                message: "Error deleting client",
                error: error
            });
        } else {

            const resetAutoIncrement = 'ALTER TABLE client AUTO_INCREMENT = 1';
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

const putclient = async (req, res) => {
    const clientId = req.params.id
    let logoURL
    try {
        const logoFile = req.files['logo'];
        const clientname = req.body.name;

        if (!logoFile) {
            const sqlSelectImage = 'SELECT logo FROM client WHERE id = ?';
            db.query(sqlSelectImage, [clientId], (error, result) => {
                if (error) {
                    console.error("Error fetching client image:", error);
                    res.status(500).json({
                        message: "Error fetching client image",
                        error: error
                    });
                } else {
                    if (result.length === 0 || !result[0].logo) {
                        res.status(404).json({
                            message: "client image not found in the database"
                        });
                    } else {
                        logoURL = result[0].logo;
                        // Proceed to update the client
                        updateclient();
                    }
                }
            });
        } else {
            const logoFile = req.files['logo'][0];     
            const clientImageUploadResponse = await ik.upload({
                file: logoFile.buffer,
                fileName: logoFile.originalname,
            });
            logoURL = clientImageUploadResponse.url;
            // Proceed to update the client
            updateclient();
        }

        function updateclient(){
            const sql = "UPDATE client SET client_name = ?, logo = ? WHERE id = ?"
            const value = [clientname, logoURL, clientId]
            db.query(sql, value, (error, result) => {
                if (error) {
                    console.error("Error updating client:", error);
                    res.status(500).json({
                        message: "Error updating client", 
                        error: error
                    });
                } else {
                    if (result.affectedRows === 0) {
                        res.status(404).json({
                            message: "client not found"
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
        console.error("An error occurred:", err);
        res.status(500).json({
            message: "An error occurred",
            error: err.message
        });
    }
    
}

const getclientbyID = (req, res) => {
    const clientId = req.params.id
    const sql = "SELECT * FROM client WHERE id = ?"
    db.query(sql, [clientId], (error, result) => {
        if (error) {
            console.error("Error fetching client:", error);
            res.status(500).json({
                message: "Error fetching client",
                error: error
            });
        } else {
            if (result.length === 0) {
                res.status(404).json({
                    message: "client not found"
                });
            } else {
                res.json({
                    id: result[0].id,
                    data : {
                        name : result[0].client_name,
                        logo : result[0].logo,
                    },
                    message: "Success"
                });
            }
        }
    })
}

const deleteclientbyID = (req, res) => {
    const clientId = req.params.id;

    const sql = 'DELETE FROM client WHERE id = ?';

    db.query(sql, [clientId], (error, result) => {
        if (error) {
            console.error("Error deleting client:", error);
            res.status(500).json({
                message: "Error deleting client",
                error: error
            });
        } else {
            if (result.affectedRows === 0) {
                res.status(404).json({
                    message: "client not found"
                });
            } else {
                res.json({
                    message: "deleted"
                });
            }
        }
    });
}

module.exports = {
    getAllclient,
    postclient,
    deleteclient,
    putclient,
    getclientbyID,
    deleteclientbyID
}