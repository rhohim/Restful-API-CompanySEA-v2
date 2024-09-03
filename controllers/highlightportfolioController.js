const db = require("../models/connection")

const posthighlight = async (req, res) => {
    try {
        const portofolio_id = req.body.portfolio_id
        const sql = "INSERT INTO portfolio_highlight (portfolio_id) VALUES (?)"
        const value = [portofolio_id]
        db.query(sql, value, (error,result) => {
            if (error) {
                res.status(500).json({
                    message: "Error inserting client",
                    error: error
                });
            } else {
                res.json({
                    message: "Success",
                    highlightId: result.insertId
                });
            }
        })
    } catch {
        res.status(500).send({ error: 'Internal Server Error' });
    }
}

const getAllhighlight = (req, res) => {
    const sql = `SELECT 
        hp.*, hp.id as h_portfolio_id,
        p.*, p.id as portfolio_id,
        s.id as services_id, s.services_name, s.cover, s.short_description,
        cl.id as client_id, cl.client_name, cl.logo
        FROM 
            portfolio_highlight hp
        JOIN 
            portofolio p ON hp.portfolio_id = p.id
        JOIN 
            client cl ON p.client_id = cl.id
        JOIN 
            services s ON p.services_id = s.id`
    db.query(sql, (error, result) => {
        if (error) {
            res.status(500).json({
                message: "error fetching highlight_portofolio",
                error : error
            })
        } else {
            if (result.length === 0){
                res.status(404).json({
                    message: "highlight_portofolio not found"
                })
            } else {
                const formattedData = result.map(data => ({
                    id : data.h_portfolio_id,
                    portfolio : {
                        id : data.portfolio_id,
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
                    }
                }))
                res.json({
                    message : "success",
                    highligt_portfolio :formattedData
                })
            }
        }
    })
}

const deletehighlight = (req, res) => {
    const sql = 'DELETE FROM portfolio_highlight';

    db.query(sql, (error, result) => {
        if (error) {
            console.error("Error deleting highlight:", error);
            res.status(500).json({
                message: "Error deleting highlight",
                error: error
            });
        } else {

            const resetAutoIncrement = 'ALTER TABLE portfolio_highlight AUTO_INCREMENT = 1';
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

const deletehiglightbyID = (req, res) => {
    const higlightId = req.params.id;

    const sql = 'DELETE FROM portfolio_highlight WHERE id = ?';

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
    posthighlight,
    getAllhighlight,
    deletehighlight,
    deletehiglightbyID
}