const db = require("../models/connection")

const posthighlightClient = async (req, res) => {
    const client_id = req.body.client_id
    const sql = "INSERT INTO client_highlight (client_id) VALUES (?)"
    const value = [client_id]
    db.query(sql, value, (error, result) => {
        if (error) {
            res.status(500).json({
                message: "Error inserting client",
                error : error
            })
        } else {
            res.json({
                message : "Success",
                client_highlight : result.insertId
            })
        }
    })
}

const getAllhighlightClient = (req, res) => {
    const sql = ` SELECT
    ch.*,
    cl.client_name, cl.logo
    FROM 
        client_highlight ch
    JOIN
        client cl ON ch.client_id = cl.id
    `
    db.query(sql, (error, result) => {
        if (error){
            res.status(404).json({
                message: "error feching client_highlight",
                error : error
            })
        } else {
            if (result.length === 0) {
                res.status(404).json({
                    message : "client_highlight not found"
                })
            } else {
                const formattedData = result.map(data => ({
                    id : data.id,
                    data : {
                        id : data.client_id,
                        name : data.clien_name,
                        logo : data.logo
                    }
                }))
                res.json({
                    message : "success",
                    highlight_client : formattedData
                })
            }
        }
    }) 
}

const deletehighlightClient = (req, res) => {
    const sql = 'DELETE FROM client_highlight';

    db.query(sql, (error, result) => {
        if (error) {
            console.error("Error deleting highlight:", error);
            res.status(500).json({
                message: "Error deleting highlight",
                error: error
            });
        } else {

            const resetAutoIncrement = 'ALTER TABLE client_highlight AUTO_INCREMENT = 1';
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

const deletehiglightClientbyID = (req, res) => {
    const higlightId = req.params.id;

    const sql = 'DELETE FROM client_highlight WHERE id = ?';

    db.query(sql, [higlightId], (error, result) => {
        if (error) {
            console.error("Error deleting higlight:", error);
            res.status(500).json({
                message: "Error deleting higlight",
                error: error
            });
        } else {
            if (result.affectedRows === 0) {
                res.status(404).json({
                    message: "higlight not found"
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
    posthighlightClient,
    getAllhighlightClient,
    deletehighlightClient,
    deletehiglightClientbyID
}