const db = require("../models/connection")
const file = require("../config/filehandling")

 
const getAllemployee = (req,res ) => {
    const baseSQL = `
        SELECT e.*, d.id AS division_id, d.division_name 
        FROM employee e 
        LEFT JOIN division d ON e.division_id = d.id
    `;

    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 15;
    const searchName = req.query.name ? `%${req.query.name}%` : null;
    const start = (page - 1) * pageSize;

    // Extend SQL query with search condition if searchName is provided
    let sql = baseSQL;
    const params = [];

    if (searchName) {
        sql += ` WHERE e.employee_name LIKE ?`;
        params.push(searchName);
    }

    // Apply pagination
    sql += ` LIMIT ?, ?`;
    params.push(start, pageSize);

    db.query(sql, params, (error, result) => {
        if (error) {
            res.status(500).json({
                message: "Error fetching employees",
                error: error
            });
        } else {
            if (result.length === 0) {
                res.status(404).json({
                    message: "Employee not found"
                });
            } else {
                const formattedData = result.map(data => ({
                    id: data.id,
                    data: {
                        name: data.employee_name,
                        role: data.role,
                        image: data.image,
                        department: {
                            id: data.division_id,
                            name: data.division_name
                        }
                    }
                }));

                // Count the total items based on the search condition
                const countSQL = searchName
                    ? `SELECT COUNT(*) AS count FROM employee e WHERE e.employee_name LIKE ?`
                    : `SELECT COUNT(*) AS count FROM employee`;

                db.query(countSQL, searchName ? [searchName] : [], (countError, countResult) => {
                    if (countError) {
                        res.status(500).json({
                            message: "Error counting employees",
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
                            employee: formattedData
                        });
                    }
                });
            }
        }
    });
}

const postemployee = async (req, res) => {
    try{
        let imageURL;
        const imageFile = req.files && req.files['image'] && req.files['image'][0]
        imageURL = imageFile ? await file.uploadFile(imageFile) : ''
        const {name, role, department_id} = req.body
        // console.log(imageURL, " ", employeename)
        const sql = "INSERT INTO employee ( employee_name, image, role, division_id) VALUES (?,?,?,?)"
        const value = [name,imageURL,role,department_id]

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
            // console.error("Error deleting employee:", error);
            res.status(500).json({
                message: "Error deleting employee",
                error: error
            });
        } else {

            const resetAutoIncrement = 'ALTER TABLE employee AUTO_INCREMENT = 1';
            db.query(resetAutoIncrement, (error, result) => {
                if (error) {
                    // console.error("Error resetting auto-increment counter:", error);
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
    // console.log(req.query.name);
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
            // console.error("Error deleting employee:", error);
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
    const {name, role, department_id} = req.body
    const imageFile = req.files && req.files['image'] && req.files['image'][0]
    let imageURL
    try {

        const getDivisionIDFromDB = () => new Promise((resolve, reject) => {
            const sqlSelectImage = 'SELECT division_id FROM employee WHERE id = ?';
            db.query(sqlSelectImage, [employeeId], (error, result) => {
                if (error) return reject("Error fetching employee department" + error)
                if (result.length === 0 || !result[0].division_id) return reject("employee department not found in the database")
                resolve(result[0].division_id)
            })
        })

        const getEmployeeURLFromDB = () => new Promise((resolve, reject) => {
            const sqlSelectImage = 'SELECT image FROM employee WHERE id = ?';
            db.query(sqlSelectImage, [employeeId], (error, result) => {
                if (error) return reject("Error fetching employee image" + error)
                if (result.length === 0 || !result[0].image) return reject("employee image not found in the database")
                resolve(result[0].image)
            })
        })
        
        const division = department_id || await getDivisionIDFromDB()
        imageURL = imageFile ? await file.uploadFile(imageFile) : await getEmployeeURLFromDB()
        updateemployee()

        function updateemployee(){
            const sql = "UPDATE employee SET employee_name = ?, role = ? , image = ?, division_id = ? WHERE id = ? "
            const value = [ name, role, imageURL, division, employeeId]
            db.query(sql, value, (error, result) => {
                if(error){
                    // console.log("error updating client", error)
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
        // console.error("An error occurred:", err);
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