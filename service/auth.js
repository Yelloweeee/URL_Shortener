const sessionIdToUserMap= new Map();

function setuser(id, user){
    sessionIdToUserMap.set(id, user)
}

function getUser(id){
    return sessionIdToUserMap.get(id)
}

module.exports={
    setuser, getUser
}