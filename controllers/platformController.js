const db = require("../models/connection")

const getAllplatform = (req,res ) => {
    const sql = "SELECT * FROM platform"
    db.query(sql, (error, result) => {
        if (error){
            res.status(500).json({
                message: "Error fetching platform",
                error: error
            });
        } else {
            if (result.length === 0) {
                res.status(404).json({ 
                    message: "platform not found"
                });
            } else {
                const formattedData = result.map(data => ({
                    id: data.id,
                    data : {
                        value_1 : data.value_1,
                        unit_1 : data.unit_1,
                        value_2 : data.value_2,
                        unit_2 : data.unit_2,
                    },
                }))
                res.json({
                    message : "success",
                    platform :formattedData
                })
        }
        }      
    })
}

const postplatform = (req, res) => {
    const {value_1, unit_1, value_2, unit_2} = req.body
    const sql = "INSERT INTO platform ( value_1, unit_1, value_2, unit_2) VALUES (?, ?, ?, ?)"
    const value = [value_1, unit_1, value_2, unit_2]
    db.query(sql, value, (error, result) => {
        if (error) {
            res.status(500).json({
                message: "Error inserting platform",
                error: error
            });
        } else {
            res.json({
                message: "Success",
                platformId: result.insertId
            });
        }
    })
}

const deleteplatform = (req, res) => {
    const sql = 'DELETE FROM platform';

    db.query(sql, (error, result) => {
        if (error) {
            console.error("Error deleting platform:", error);
            res.status(500).json({
                message: "Error deleting platform",
                error: error
            });
        } else {

            const resetAutoIncrement = 'ALTER TABLE platform AUTO_INCREMENT = 1';
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

const putplatform = (req, res) => {
    const id = req.params.id;
    const { value_1, unit_1, value_2, unit_2 } = req.body;

    try {
        const fetchSql = 'SELECT value_1, unit_1, value_2, unit_2 FROM platform WHERE id = ?';
        
        db.query(fetchSql, [id], (fetchError, fetchResult) => {
            if (fetchError) {
                console.error("Error fetching platform details:", fetchError);
                return res.status(500).json({
                    message: "Error fetching platform details",
                    error: fetchError
                });
            }

            if (fetchResult.length === 0) {
                return res.status(404).json({ message: "Platform not found" });
            }

            
            const { value_1: existingValue1, unit_1: existingUnit1, value_2: existingValue2, unit_2: existingUnit2 } = fetchResult[0];

            
            const updateValue1 = value_1 ?? existingValue1;
            const updateUnit1 = unit_1 ?? existingUnit1;
            const updateValue2 = value_2 ?? existingValue2;
            const updateUnit2 = unit_2 ?? existingUnit2;

            const updateSql = "UPDATE platform SET value_1 = ?, unit_1 = ?, value_2 = ?, unit_2 = ? WHERE id = ?";
            const values = [updateValue1, updateUnit1, updateValue2, updateUnit2, id];

            db.query(updateSql, values, (updateError, result) => {
                if (updateError) {
                    console.error("Error updating platform:", updateError);
                    return res.status(500).json({
                        message: "Error updating platform",
                        error: updateError
                    });
                }

                if (result.affectedRows === 0) {
                    return res.status(404).json({ message: "Platform not found" });
                }

                res.json({ message: "Updated" });
            });
        });
    } catch (err) {
        console.error("An error occurred:", err);
        res.status(500).json({ message: "An error occurred", error: err.message });
    }
}

const getAllplatformbyID = (req,res ) => {
    const platformId = req.params.id
    const sql = "SELECT * FROM platform WHERE id = ?"
    db.query(sql, [platformId] , (error, result) => {
        if (error){
            res.status(500).json({
                message: "Error fetching platform",
                error: error
            });
        } else {
            if (result.length === 0) {
                res.status(404).json({ 
                    message: "platform not found"
                });
            } else {
                const formattedData = result.map(data => ({
                    id: data.id,
                    data : {
                        value_1 : data.value_1,
                        unit_1 : data.unit_1,
                        value_2 : data.value_2,
                        unit_2 : data.unit_2,
                    },
                    "message" : "success"
                }))
                res.json(formattedData)
        }
        }      
    })
}

const deleteplatformbyID = (req,res) => {
    const deleteplatformID = req.params.id
    const sql = 'DELETE FROM platform WHERE id = ?';

    db.query(sql, [deleteplatformID], (error, result) => {
        if (error) {
            console.error("Error deleting platform:", error);
            res.status(500).json({
                message: "Error deleting platform", 
                error: error
            });
        } else {

            if (result.affectedRows === 0) {
                res.status(404).json({
                    message: "category not found"
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
    getAllplatform,
    postplatform,
    deleteplatform,
    putplatform,
    getAllplatformbyID,
    deleteplatformbyID    
}