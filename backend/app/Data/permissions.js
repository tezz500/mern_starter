const getSlug = (str)=> {
    return str
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
        .replace(/^-+/, '') 
        .replace(/-+$/, '');
}

const permissions = [
    {
        "col_name":"User Management",
        "name":"Read Role",
        "slug":getSlug("Read Role"),
    },
    {
        "col_name":"User Management",
        "name":"Create Role",
        "slug":getSlug("Create Role"),
    },
    {
        "col_name":"User Management",
        "name":"Update Role",
        "slug":getSlug("Update Role"),
    },
    {
        "col_name":"User Management",
        "name":"Delete Role",
        "slug":getSlug("Delete Role"),
    },




    

    {
        "col_name":"Role Management",
        "name":"Read User",
        "slug":getSlug("Read User"),
    },
    {
        "col_name":"Role Management",
        "name":"Create User",
        "slug":getSlug("Create User"),
    },
    {
        "col_name":"Role Management",
        "name":"Update User",
        "slug":getSlug("Update User"),
    },
    {
        "col_name":"Role Management",
        "name":"Delete User",
        "slug":getSlug("Delete User"),
    },




    {
        "col_name":"Product Management",
        "name":"Read Product",
        "slug":getSlug("Read Product"),
    },
    {
        "col_name":"Product Management",
        "name":"Create Product",
        "slug":getSlug("Create Product"),
    },
    {
        "col_name":"Product Management",
        "name":"Update Product",
        "slug":getSlug("Update Product"),
    },
    {
        "col_name":"Product Management",
        "name":"Delete Product",
        "slug":getSlug("Delete Product"),
    },
];

module.exports = permissions;