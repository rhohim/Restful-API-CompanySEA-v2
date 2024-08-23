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
    let updatevalue_1, updateunit_1, updatevalue_2, updateunit_2, value_1, unit_1, value_2, unit_2
    const id = req.params.id
    value_1 = req.body.value_1
    unit_1 = req.body.unit_1
    value_2 = req.body.value_2,
    unit_2 = req.body.unit_2
    // console.log(value_1, unit_1);
    const fetchSql = 'SELECT value_1, unit_1, value_2, unit_2 FROM platform WHERE id = ?';
    db.query(fetchSql, [id], (fetchError, fetchResult) => {
        if (fetchError) {
            console.error("Error fetching user details:", fetchError);
            res.status(500).json({
                message: "Error fetching user details",
                error: fetchError
            });
        } else {
            const existingValues = fetchResult[0];
            console.log(existingValues);
            updatevalue_1 = value_1 !== undefined ? value_1 : existingValues.value_1;
            updateunit_1 = unit_1 !== undefined ? unit_1 : existingValues.unit_1;
            updatevalue_2 = value_2 !== undefined ? value_2 : existingValues.value_2;
            updateunit_2 = unit_2 !== undefined ? unit_2 : existingValues.unit_2;
            const sql = "UPDATE platform SET value_1 = ?, unit_1 = ?, value_2 = ?, unit_2 = ? WHERE id = ?"
            console.log(updatevalue_1, updateunit_1);
            const value = [updatevalue_1,updateunit_1, updatevalue_2,updateunit_2, id]
            db.query(sql, value, (error, result) => {
                if (error) {
                    console.error("Error updating platform:", error);
                    res.status(500).json({
                        message: "Error updating platform",
                        error: error
                    });
                } else {
                    if (result.affectedRows === 0) {
                        res.status(404).json({
                            message: "platform not found"
                        });
                    } else {
                        res.json({
                            message: "Updated"
                        });
                    }
                }
            });
        }
    })
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