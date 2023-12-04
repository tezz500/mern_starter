const bcrypt = require('bcrypt');
const roles = require('../../app/Data/role.json');
const permissions = require('../../app/Data/permissions');
const users = require('../../app/Data/user');

const Role = require('../../app/Models/Role');
const User = require('../../app/Models/User');
const Permission = require('../../app/Models/Permission');
const RoleHasPermission = require('../../app/Models/RoleHasPermission');

const dotenv = require('dotenv');
const connectDatabase = require('../../config/database')


dotenv.config()

connectDatabase();

const storeData = async () => {
    try {
        await Role.deleteMany();
        await User.deleteMany();
        await Permission.deleteMany();
        await RoleHasPermission.deleteMany();


        await Role.insertMany(roles);
        for (const u of users) {
            u.password = await getHashValue();
            const saveUser = new User(u);
            await saveUser.save();
        }
        await Permission.insertMany(permissions);
        const getR = await getRoles();
        const getPer = await getPermissions();
        for (const r of getR) {
            if(r.value == 1){
                for (const p of getPer) {
                    const savedRoleHasPermission = new RoleHasPermission({
                        'permission_id': p._id,
                        'role_id': r._id,
                    });
                    await savedRoleHasPermission.save();
                }
            }
            if(r.value == 2){
                for (const p of getPer) {
                    const savedRoleHasPermission = new RoleHasPermission({
                        'permission_id': p._id,
                        'role_id': r._id,
                    });
                    await savedRoleHasPermission.save();
                }
            }
        }
        console.log("DB Seed Completed");
        process.exit();
    } catch (error) {
        console.log(error);
        process.exit();
    }
}

const getHashValue = async () => {
    return await bcrypt.hash('password', 10);
}

const getRoles = async () => {
    return await Role.find({});
}

const getPermissions = async () => {
    return await Permission.find({});
}

storeData();