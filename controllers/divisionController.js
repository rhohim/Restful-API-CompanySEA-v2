const db = require("../models/connection")
const ImageKit = require('imagekit');
const ik = new ImageKit({ 
    publicKey: "public_F5lvc2Whw1cbK+bUiWWAaNJ3eRw=",
    privateKey: "private_4CLfPmDyiaRqCAGxkT4jIiwEc+4=",
    urlEndpoint: "https://ik.imagekit.io/cretivox"
  });

const getAlldivision = (req,res ) => {
    const sql = `
        SELECT 
            d.id AS divisionId, 
            d.division_name,
            d.image as icon,
            d.description,
            e.id AS employeeId, 
            e.employee_name, 
            e.role, 
            e.image 
        FROM 
            division d 
        LEFT JOIN 
            employee e 
        ON 
            d.id = e.division_id
    `
    db.query(sql, (error, result) => {
        if (error){
            res.status(500).json({
                message: "Error fetching division",
                error: error
            });
        } else {
            if (result.length === 0) {
                res.status(404).json({ 
                    message: "division not found"
                });
            } else {
                const divisionMap = {};
                result.map(data => {
                    if (!divisionMap[data.divisionId]) {
                        divisionMap[data.divisionId] = {
                            id: data.divisionId,
                            data: {
                                name: data.division_name,
                                image : data.icon,
                                descripton : data.description,
                                employee: []
                            }
                        };
                    }
        
                    if (data.employeeId) {
                        divisionMap[data.divisionId].data.employee.push({
                            name: data.employee_name,
                            role: data.role,
                            image: data.image
                        });
                    }
                });
        
                // Convert divisionMap to an array
                const formattedData = Object.values(divisionMap);
        
                // Send the formatted data as JSON
                res.json({
                    message : "success",
                    division :formattedData
                })
        }
        }      
    })
}

const postdivision = async (req, res) => {
    try {
        let imageURL = "";
        if (req.files && req.files['image'] && req.files['image'][0]) {
            const imageFile = req.files['image'][0];

            const imageUploadResponse = await ik.upload({
                file: imageFile.buffer,
                fileName: imageFile.originalname,
            });

            imageURL = imageUploadResponse.url;

            const {name, description} = req.body

            const sql = "INSERT INTO division (division_name, image, description) VALUES (?,?,?)"
            const value = [name,imageURL, description]
            db.query(sql, value, (error, result) => {
                if (error) {
                    res.status(500).json({
                        message: "Error inserting division",
                        error: error
                    });
                } else {
                    res.json({
                        message: "Success",
                        divisionId: result.insertId
                    });
                }
            })
        }
    } catch{
        res.status(500).send({ error: 'Internal Server Error' });
    }
} 

const deletedivision = (req, res) => {
    const sql = 'DELETE FROM division';

    db.query(sql, (error, result) => {
        if (error) {
            console.error("Error deleting division:", error);
            res.status(500).json({
                message: "Error deleting division",
                error: error
            });
        } else {

            const resetAutoIncrement = 'ALTER TABLE division AUTO_INCREMENT = 1';
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

const putdivision = async (req, res) => {
    const divisionId = req.params.id
    let nameDivision, imageURL
    nameDivision = req.body.name
    description = req.body.description
    // console.log(nameDivision);
    try {
        const imageFile = req.files["image"]
        const nameDivision = req.body.name
        
        if (!imageFile) {
            const sqlSelectImage = 'SELECT image FROM division WHERE id = ?';
            db.query(sqlSelectImage, [divisionId], (error, result) => {
                if (error) {
                    console.error("Error fetching division image:", error);
                    res.status(500).json({
                        message: "Error fetching division image",
                        error: error
                    });
                } else {
                    if (result.length === 0 || !result[0].image) {
                        res.status(404).json({
                            message: "division image not found in the database"
                        });
                    } else {
                        imageURL = result[0].image;
                        // Proceed to update the division
                        updatedivision();
                    }
                }
            });
        } else {
            const imageFile = req.files['image'][0];     
            const divisionImageUploadResponse = await ik.upload({
                file: imageFile.buffer,
                fileName: imageFile.originalname,
            });
            imageURL = divisionImageUploadResponse.url;
            // Proceed to update the division
            updatedivision();
        }

        function updatedivision(){
            const sql = "UPDATE division SET division_name = ?, image = ?, description = ? WHERE id = ?"
            const value = [nameDivision, imageURL, description, divisionId]
            db.query(sql, value, (error, result) => {
                if (error) {
                    console.error("Error updating division:", error);
                    res.status(500).json({
                        message: "Error updating division",
                        error: error
                    });
                } else {
                    if (result.affectedRows === 0) {
                        res.status(404).json({
                            message: "division not found"
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

const getdivisionbyID = (req, res) => {
    const divisionId = req.params.id; // Extract division ID from request parameters

    const sql = `
        SELECT 
            d.id AS divisionId, 
            d.division_name,
            d.image as icon, 
            d.description,
            e.id AS employeeId, 
            e.employee_name, 
            e.role, 
            e.image 
        FROM 
            division d 
        LEFT JOIN 
            employee e 
        ON 
            d.id = e.division_id
        WHERE 
            d.id = ?
    `;

    db.query(sql, [divisionId], (error, result) => {
        if (error) {
            res.status(500).json({
                message: "Error fetching division",
                error: error
            });
        } else {
            if (result.length === 0) {
                res.status(404).json({ 
                    message: "Division not found"
                });
            } else {
                const divisionMap = {};
                result.map(data => {
                    if (!divisionMap[data.divisionId]) {
                        divisionMap[data.divisionId] = {
                            id: data.divisionId,
                            data: {
                                name: data.division_name,
                                image: data.icon,
                                description : data.description,
                                employees: []
                            }
                        };
                    }

                    if (data.employeeId) {
                        divisionMap[data.divisionId].data.employees.push({
                            name: data.employee_name,
                            role: data.role,
                            image: data.image
                        });
                    }
                });

                // Convert divisionMap to an array
                const formattedData = Object.values(divisionMap);

                // Send the formatted data as JSON
                res.json(formattedData[0]); // Since we're querying for a specific division, return the first item
            }
        }
    });
}

const deletedivisionbyID = (req, res) => {
    const divisionId = req.params.id;

    const sql = 'DELETE FROM division WHERE id = ?';

    db.query(sql, [divisionId], (error, result) => {
        if (error) {
            console.error("Error deleting division:", error);
            res.status(500).json({
                message: "Error deleting division",
                error: error
            });
        } else {
            if (result.affectedRows === 0) {
                res.status(404).json({
                    message: "division not found"
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
    getAlldivision,
    postdivision,
    deletedivision,
    putdivision,
    getdivisionbyID,
    deletedivisionbyID
}