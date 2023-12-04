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
        "name":"Product Create",
        "slug":getSlug("Product Create"),
    },
    {
        "name":"Product Read",
        "slug":getSlug("Product Read"),
    },
    {
        "name":"Product Update",
        "slug":getSlug("Product Update"),
    },
    {
        "name":"Product Delete",
        "slug":getSlug("Product Delete"),
    },
];

module.exports = permissions;