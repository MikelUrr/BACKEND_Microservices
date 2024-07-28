export const rolesValidator = (role, action) => {

    let roles = {
        "admin": {
            "permissions": ["read", "write", "delete"]
        },
        "user": {
            "permissions": ["read"]
        },
        "administator": {
            "permissions": ["read", "write"]
        },
        "superadmin": {
            "permissions": ["read", "write", "delete", "update"]
        },
        "level-1": {
            "permissions": ["read", "write"]
        },
        "level-2": {
            "permissions": ["read", "write", "delete"]
        },
        "level-3": {
            "permissions": ["read", "write", "delete", "update"]
        }

    }
    if (roles[role.name] && roles[role.name].includes(action)) {
        return true;
    } else {
        return false;
    }

}