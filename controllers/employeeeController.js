const db = require("../models/connection")
const ImageKit = require('imagekit');
const ik = new ImageKit({  
    publicKey: "public_F5lvc2Whw1cbK+bUiWWAaNJ3eRw=",
    privateKey: "private_4CLfPmDyiaRqCAGxkT4jIiwEc+4=",
    urlEndpoint: "https://ik.imagekit.io/cretivox"
  });

const getAllemployee = (req,res ) => {
    const sql = "SELECT e.*, d.id as divsion_id, d.division_name FROM employee e LEFT JOIN division d ON e.division_id = d.id"
    const page = parseInt(req.query.page)|| 1;
    const pageSize = parseInt(req.query.pageSize) || 15;
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    db.query(sql, (error, result) => {
        if (error) {
            res.status(500).json({
                message: "error fetching employee",
                error : error
            })
        } else {
            if (result.length === 0){
                res.status(404).json({
                    message: "employee not found"
                })
            } else {
                const paginatedResult = result.slice(start, end);
                const formattedData = paginatedResult.map(data => ({
                    id : data.id,
                    data : {
                        name : data.employee_name, 
                        role : data.role, 
                        image : data.image,
                        department : {
                            id : data.divsion_id,
                            name : data.division_name
                        }
                    }
                }))
                // res.json({
                //     message : "success",
                //     employee :formattedData
                // })
                res.json({
                    page,
                    pageSize: pageSize,
                    totalItems: result.length,
                    totalPages: Math.ceil(result.length / pageSize),
                    message : "success",
                    employee :formattedData
                })
            }
        }
    })
}

const postemployee = async (req, res) => {
    try{
        let imageURL = "";

        if (req.files && req.files['image'] && req.files['image'][0]) {
            const imageFile = req.files['image'][0];

            const imageUploadResponse = await ik.upload({
                file: imageFile.buffer,
                fileName: imageFile.originalname,
            });

            imageURL = imageUploadResponse.url;
        }

        const employeename = req.body.name
        const role = req.body.role
        const iddivision = req.body.department_id
        // console.log(imageURL, " ", employeename)
        const sql = "INSERT INTO employee ( employee_name, image, role, division_id) VALUES (?,?,?,?)"
        const value = [employeename,imageURL,role,iddivision]

        db.query(sql, value, (error, result) => {
            if (error) {
                res.status(500).json({
                    message: "Error inserting employee",
                    error: error
                });
            } else {
                res.json({
                    message: "Success",
                    employeeId: result.insertId
                });
            }
        })
    }catch{
        res.status(500).send({ error: 'Internal Server Error' });
    }
    
}

const deleteemployee = (req, res) => {
    const sql = 'DELETE FROM employee';

    db.query(sql, (error, result) => {
        if (error) {
            console.error("Error deleting employee:", error);
            res.status(500).json({
                message: "Error deleting employee",
                error: error
            });
        } else {

            const resetAutoIncrement = 'ALTER TABLE employee AUTO_INCREMENT = 1';
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

const getemployeebyID = (req,res ) => {
    const employeeId = req.params.id
    // console.log(employeeId);
    const sql = "SELECT e.*, d.id as divsion_id, d.division_name FROM employee e LEFT JOIN division d ON e.division_id = d.id where e.id = ?"
    db.query(sql,[employeeId], (error, result) => {
        if (error) {
            res.status(500).json({
                message: "error fetching employee",
                error : error
            })
        } else {
            if (result.length === 0){
                res.status(404).json({
                    message: "employee not found"
                })
            } else {
                res.json({
                    id : result[0].id,
                    data : {
                        name : result[0].employee_name, 
                        role : result[0].role, 
                        image : result[0].image,
                        department : {
                            id : result[0].divsion_id,
                            name : result[0].division_name
                        }
                    }
                })
            }
        }
    })
}

const deleteemployeebyID = (req, res) => {
    const employeeId = req.params.id;

    const sql = 'DELETE FROM employee WHERE id = ?';

    db.query(sql, [employeeId], (error, result) => {
        if (error) {
            console.error("Error deleting employee:", error);
            res.status(500).json({
                message: "Error deleting employee",
                error: error
            });
        } else {
            if (result.affectedRows === 0) {
                res.status(404).json({
                    message: "employee not found"
                });
            } else {
                res.json({
                    message: "deleted"
                });
            }
        }
    });
}

const putemployeebyID = async (req,res) => {
    const employeeId = req.params.id
    let imageURL, division
    try {
        const imageFile = req.files["image"]
        const employeename = req.body.name
        const role = req.body.role
        division = req.body.department_id
        // console.log("input ",division);

        if (!division){
            const sqlSelectdivision = 'SELECT division_id FROM employee WHERE id = ?';
            db.query(sqlSelectdivision, [employeeId], (error, result) => {
                if (error) {
                    console.error("Error fetching employee division:", error);
                    res.status(500).json({
                        message: "Error fetching employee division",
                        error: error
                    });
                } else {
                    if (result.length === 0 || !result[0].division_id) {
                        res.status(404).json({
                            message: "employee division not found in the database"
                        });
                    } else {
                        division = result[0].division_id;
                        // Proceed to update the client
                        // updateclient();
                    }
                }
            });
        }

        if (!imageFile) {
            const sqlSelectImage = 'SELECT image FROM employee WHERE id = ?';
            db.query(sqlSelectImage, [employeeId], (error, result) => {
                if (error) {
                    console.error("Error fetching employee image:", error);
                    res.status(500).json({
                        message: "Error fetching employee image",
                        error: error
                    });
                } else {
                    if (result.length === 0 || !result[0].image) {
                        res.status(404).json({
                            message: "employee image not found in the database"
                        });
                    } else {
                        imageURL = result[0].image;
                        // Proceed to update the employee
                        updateemployee();
                    }
                }
            });
        } else {
            const imageFile = req.files['image'][0];     
            const employeeImageUploadResponse = await ik.upload({
                file: imageFile.buffer,
                fileName: imageFile.originalname,
            });
            imageURL = employeeImageUploadResponse.url;
            // Proceed to update the employee
            updateemployee();
        }

        function updateemployee(){
            const sql = "UPDATE employee SET employee_name = ?, role = ? , image = ?, division_id = ? WHERE id = ? "
            const value = [ employeename, role, imageURL, division, employeeId]
            db.query(sql, value, (error, result) => {
                if(error){
                    console.log("error updating client", error)
                    res.status(500).json({
                        message: "error updating employee",
                        error : error
                    })
                } else {
                    if (result.length === 0){
                        res.status(404).json({
                            message:"employee not found"
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
}

module.exports = {
    getAllemployee,
    postemployee,
    deleteemployee,
    getemployeebyID,
    deleteemployeebyID,
    putemployeebyID
}