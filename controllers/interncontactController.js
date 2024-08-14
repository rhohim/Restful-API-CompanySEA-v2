const db = require("../models/connection")

const getAllintern_contact = (req,res ) => {
    const sql = "SELECT * FROM intern_contact"
    db.query(sql, (error, result) => {
        if (error){
            res.status(500).json({
                message: "Error fetching intern_contact",
                error: error
            });
        } else {
            if (result.length === 0) {
                res.status(404).json({ 
                    message: "intern_contact not found"
                });
            } else {
                const formattedData = result.map(data => ({
                    id: data.id,
                    data : {
                        name : data.contact_name,
                        university : data.university,
                        email : data.email,
                        phone : data.phone,
                    },
                }))
                res.json({
                    message : "success",
                    intern_contact :formattedData
                })
        }
        }      
    })
}

const postintern_contact = (req, res) => {
    // console.log(req.body)
    const {name, university, email, phone} = req.body
    // console.log(name,color);
    const sql = "INSERT INTO intern_contact ( contact_name, university, email, phone) VALUES (?, ?, ?, ?)"
    const value = [name, university, email, phone]
    db.query(sql, value, (error, result) => {
        if (error) {
            res.status(500).json({
                message: "Error inserting intern_contact",
                error: error
            });
        } else {
            res.json({
                message: "Success",
                intern_contactId: result.insertId
            });
        }
    })
}

const deleteintern_contact = (req, res) => {
    const sql = 'DELETE FROM intern_contact';

    db.query(sql, (error, result) => {
        if (error) {
            console.error("Error deleting intern_contact:", error);
            res.status(500).json({
                message: "Error deleting intern_contact",
                error: error
            });
        } else {

            const resetAutoIncrement = 'ALTER TABLE intern_contact AUTO_INCREMENT = 1';
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

const putintern_contact = (req, res) => {
    let updateContact_name, updateUniversity, updateEmail, updatePhone, contact_name, university, email, phone
    const id = req.params.id
    contact_name = req.body.name
    university = req.body.university
    email = req.body.email,
    phone = req.body.phone
    console.log(contact_name, university);
    const fetchSql = 'SELECT contact_name, university, email, phone FROM intern_contact WHERE id = ?';
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
            updateContact_name = contact_name !== undefined ? contact_name : existingValues.contact_name;
            updateUniversity = university !== undefined ? university : existingValues.university;
            updateEmail = email !== undefined ? email : existingValues.email;
            updatePhone = phone !== undefined ? phone : existingValues.phone;
            const sql = "UPDATE intern_contact SET contact_name = ?, university = ?, email = ?, phone = ? WHERE id = ?"
            console.log(updateContact_name, updateUniversity);
            const value = [updateContact_name,updateUniversity, updateEmail,updatePhone, id]
            db.query(sql, value, (error, result) => {
                if (error) {
                    console.error("Error updating intern_contact:", error);
                    res.status(500).json({
                        message: "Error updating intern_contact",
                        error: error
                    });
                } else {
                    if (result.affectedRows === 0) {
                        res.status(404).json({
                            message: "intern_contact not found"
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

const getAllintern_contactbyID = (req,res ) => {
    const intern_contactId = req.params.id
    const sql = "SELECT * FROM intern_contact WHERE id = ?"
    db.query(sql, [intern_contactId] , (error, result) => {
        if (error){
            res.status(500).json({
                message: "Error fetching intern_contact",
                error: error
            });
        } else {
            if (result.length === 0) {
                res.status(404).json({ 
                    message: "intern_contact not found"
                });
            } else {
                const formattedData = result.map(data => ({
                    id: data.id,
                    data : {
                        name : data.contact_name,
                        university : data.university,
                        email : data.email,
                        phone : data.phone,
                    },
                    "message" : "success"
                }))
                res.json(formattedData)
        }
        }      
    })
}

const deleteintern_contactbyID = (req,res) => {
    const deleteintern_contactID = req.params.id
    const sql = 'DELETE FROM intern_contact WHERE id = ?';

    db.query(sql, [deleteintern_contactID], (error, result) => {
        if (error) {
            console.error("Error deleting intern_contact:", error);
            res.status(500).json({
                message: "Error deleting intern_contact", 
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
    getAllintern_contact,
    postintern_contact,
    deleteintern_contact,
    putintern_contact,
    getAllintern_contactbyID,
    deleteintern_contactbyID
}