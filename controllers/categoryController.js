const db = require("../models/connection")
 
const getAllcategory = (req,res ) => {
    const sql = `
        SELECT 
            c.*, 
            p.id AS portofolioId, 
            p.title, 
            p.subtitle, 
            p.year_project, 
            p.scope, 
            p.team, 
            p.content, 
            p.portofolio_cover, 
            p.created_at AS portofolio_created_at,
            cl.client_name, 
            cl.logo, 
            s.services_name, 
            s.cover AS serviceCover, 
            s.short_description
        FROM category c
        LEFT JOIN portofolio p ON p.category_id = c.id
        LEFT JOIN client cl ON p.client_id = cl.id
        LEFT JOIN services s ON p.services_id = s.id
    `;

    db.query(sql, (error, result) => {
        if (error) {
            return res.status(500).json({
                message: "Error fetching categories",
                error: error
            });
        }

        if (result.length === 0) {
            return res.status(404).json({
                message: "Categories not found"
            });
        }

        const categoryMap = {};
        result.forEach(data => {
            if (!categoryMap[data.id]) {
                categoryMap[data.id] = {
                    id: data.id,
                    data : {
                        name: data.category_name,
                        color: data.color,
                        portofolio: []
                    }
                };
            }

            if (data.portofolioId) {
                categoryMap[data.id].data.portofolio.push({
                    title: data.title,
                    subtitle: data.subtitle,
                    year_project: data.year_project,
                    scope: data.scope,
                    team: data.team,
                    content: data.content,
                    cover: data.portofolio_cover,
                    created_at: data.portofolio_created_at,
                    client: {
                        name: data.client_name,
                        logo: data.logo
                    },
                    services: {
                        name: data.services_name,
                        cover: data.serviceCover,
                        short_description: data.short_description
                    }
                });
            }
        });

        const formattedData = Object.values(categoryMap);
        res.json({
            message : "success",
            category :formattedData
        })
    });
}

const postCategory = (req, res) => {
    // console.log(req.body)
    const {name,color} = req.body
    // console.log(name,color);
    const sql = "INSERT INTO category ( category_name, color) VALUES (?, ?)"
    const value = [name, color]
    db.query(sql, value, (error, result) => {
        if (error) {
            res.status(500).json({
                message: "Error inserting category",
                error: error
            });
        } else {
            res.json({
                message: "Success",
                categoryId: result.insertId
            });
        }
    })
}

const deleteCategory = (req, res) => {
    const sql = 'DELETE FROM category';

    db.query(sql, (error, result) => {
        if (error) {
            console.error("Error deleting category:", error);
            res.status(500).json({
                message: "Error deleting category",
                error: error
            });
        } else {

            const resetAutoIncrement = 'ALTER TABLE category AUTO_INCREMENT = 1';
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

const putCategory = (req, res) => {
    let updatedName, updatedcolor, nameCategory, color
    const id = req.params.id
    nameCategory = req.body.name
    color = req.body.color
    console.log(nameCategory, color);
    const fetchSql = 'SELECT category_name, color FROM category WHERE id = ?';
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
            updatedName = nameCategory !== undefined ? nameCategory : existingValues.nameCategory;
            updatedcolor = color !== undefined ? color : existingValues.color;
            const sql = "UPDATE category SET category_name = ?, color = ? WHERE id = ?"
            console.log(updatedName, updatedcolor);
            const value = [updatedName,updatedcolor, id]
            db.query(sql, value, (error, result) => {
                if (error) {
                    console.error("Error updating category:", error);
                    res.status(500).json({
                        message: "Error updating category",
                        error: error
                    });
                } else {
                    if (result.affectedRows === 0) {
                        res.status(404).json({
                            message: "category not found"
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

const getCategorybyID = (req, res) => {
    const categoryId = req.params.id
    const sql = `
        SELECT 
            c.*, 
            p.id AS portofolioId, 
            p.title, 
            p.subtitle, 
            p.year_project, 
            p.scope, 
            p.team, 
            p.content, 
            p.portofolio_cover, 
            p.created_at AS portofolio_created_at,
            cl.client_name, 
            cl.logo, 
            s.services_name, 
            s.cover AS serviceCover, 
            s.short_description
        FROM category c
        LEFT JOIN portofolio p ON p.category_id = c.id
        LEFT JOIN client cl ON p.client_id = cl.id
        LEFT JOIN services s ON p.services_id = s.id
        WHERE c.id = ?
    `;
    db.query(sql, [categoryId], (error, result) => {
        if (error) {
            console.error("Error fetching category:", error);
            res.status(500).json({
                message: "Error fetching category",
                error: error
            });
        } else {
            if (result.length === 0) {
                res.status(404).json({
                    message: "category not found"
                });
            } else {
                const categoryMap = {};
                result.forEach(data => {
                    if (!categoryMap[data.id]) {
                        categoryMap[data.id] = {
                            id: data.id,
                            data : {
                                name: data.category_name,
                                color: data.color,
                                portofolio: []
                            }
                        };
                    }

                    if (data.portofolioId) {
                        categoryMap[data.id].data.portofolio.push({
                            title: data.title,
                            subtitle: data.subtitle,
                            year_project: data.year_project,
                            scope: data.scope,
                            team: data.team,
                            content: data.content,
                            cover: data.portofolio_cover,
                            created_at: data.portofolio_created_at,
                            client: {
                                name: data.client_name,
                                logo: data.logo
                            },
                            services: {
                                name: data.services_name,
                                cover: data.serviceCover,
                                short_description: data.short_description
                            }
                        });
            }
        });

        const formattedData = Object.values(categoryMap);
        res.json(formattedData);
            }
        }
    })
}

const deleteCategorybyID = (req, res) => {
    const categoryId = req.params.id;

    const sql = 'DELETE FROM category WHERE id = ?';

    db.query(sql, [categoryId], (error, result) => {
        if (error) {
            console.error("Error deleting category:", error);
            res.status(500).json({
                message: "Error deleting category",
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
    getAllcategory,
    postCategory,
    deleteCategory,
    putCategory,
    getCategorybyID,
    deleteCategorybyID
}