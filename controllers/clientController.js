const db = require("../models/connection")
const ImageKit = require('imagekit');
const ik = new ImageKit({ 
    publicKey: "public_F5lvc2Whw1cbK+bUiWWAaNJ3eRw=",
    privateKey: "private_4CLfPmDyiaRqCAGxkT4jIiwEc+4=",
    urlEndpoint: "https://ik.imagekit.io/cretivox"
  });
  
const getAllclient = (req,res ) => {
    const baseSQL = "SELECT * FROM client";
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 15;
    const searchName = req.query.name ? `%${req.query.name}%` : null;
    const start = (page - 1) * pageSize;
    
    let sql = baseSQL;
    const params = [];

    // Extend SQL query with search condition if searchName is provided
    if (searchName) {
        sql += " WHERE client_name LIKE ?";
        params.push(searchName);
    }

    // Apply pagination
    sql += " LIMIT ?, ?";
    params.push(start, pageSize);

    db.query(sql, params, (error, result) => {
        if (error) {
            res.status(500).json({
                message: "Error fetching clients",
                error: error
            });
        } else {
            if (result.length === 0) {
                res.status(404).json({
                    message: "Client not found"
                });
            } else {
                const formattedData = result.map(data => ({
                    id: data.id,
                    data: {
                        name: data.client_name,
                        logo: data.logo
                    }
                }));

                // Count the total items based on the search condition
                const countSQL = searchName
                    ? "SELECT COUNT(*) AS count FROM client WHERE client_name LIKE ?"
                    : "SELECT COUNT(*) AS count FROM client";

                db.query(countSQL, searchName ? [searchName] : [], (countError, countResult) => {
                    if (countError) {
                        res.status(500).json({
                            message: "Error counting clients",
                            error: countError
                        });
                    } else {
                        const totalItems = countResult[0].count;
                        res.json({
                            page,
                            pageSize,
                            totalItems,
                            totalPages: Math.ceil(totalItems / pageSize),
                            message: "Success",
                            client: formattedData
                        });
                    }
                });
            }
        }
    });
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