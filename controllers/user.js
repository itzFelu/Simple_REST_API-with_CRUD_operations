const User = require('../models/user')

async function handleGetAllUsers(req, res) {
    const users = await User.find({})
    if (users)
        return res.status(200).json(users)
    else
        return res.status(404).json({ 'status': "failure", "message": "data not available" });
}
async function handleCreateUser(req, res) {
    // creates new user
    let newData = req.body;
    // console.log(newData);
    if (!newData) {
        return res.status(400).json({
            status: "failed",
            message: "insufficient data"
        })
    }
    try {
        let result = await User.create({
            firstName: newData.first_name,
            lastName: newData.last_name,
            email: newData.email,
            gender: newData.gender,
            jobTitle: newData.job_title
        })
        res.status(201).json({ status: "success", newData: result });
    } catch (err) {
        console.log("error creating data. Error: " + err)
        res.status(400).json({ status: "failure", message: err })
    }

}
async function handleGetUserById(req, res) {
    const users = await User.find({});
    let data = users.find((user) => user.id == req.params.id);
    if (data)
        return res.status(200).json(data);
    else
        return res.status(404).json({ 'status': "failure", "message": "data not available" });
}
async function handleUpdateUserById(req, res) {
    // update user data with ID id
    let users = await User.find({});
    let id = req.params.id;
    let data = users.find((user) => user.id === id);
    if (!data) {
        return res.status(400).json({ 'status': "failure", 'message': 'invalid id' });
    }

    let newData = req.body;
    try {
        if (newData.first_name) await User.findByIdAndUpdate(id, { firstName: newData.first_name });
        if (newData.last_name) await User.findByIdAndUpdate(id, { lastName: newData.last_name });
        if (newData.email) await User.findByIdAndUpdate(id, { email: newData.email });
        if (newData.gender) await User.findByIdAndUpdate(id, { gender: newData.gender });
        if (newData.job_title) await User.findByIdAndUpdate(id, { jobTitle: newData.job_title });

        users = await User.find({});
        data = users.find((user) => user.id === id);
        res.status(201).json({ status: "success", updatedData: data })
    }
    catch (err) {
        console.log("error updating data. Error: " + err)
        res.status(400).json({ status: "failure", message: err })
    }

}
async function handleDeleteUserById(req, res) {
    // delete user with ID id
    let id = req.params.id;
    const users = await User.find({});

    let data = users.find((user) => user.id === id);
    if (!data) return res.status(404).json({ status: "failure", message: "id not found" });

    data = await User.findByIdAndDelete(id);

    return res.status(201).json({ status: "success", "deletedUser": data })

    // fs.writeFile('./MOCK_DATA.json',JSON.stringify(users),(err,result)=>{
    //     if(!err){
    //         // console.log(data);
    //         return res.status(200).json({status:"success","deletedUser":data})
    //     }
    //     else{
    //         return res.status(404).json({'status': "failure"});
    //     }
    // })
}
async function handleGetAllUsersHTML(req, res) {
    const users = await User.find({})
    let html = `
        <table>
            <tr>
                <th>Sl.</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>job Title</th>
            </tr>
            ${users.map((user) => `
                <tr>
                    <td>${user.id}</td>
                    <td>${user.firstName}</td>
                    <td>${user.lastName}</td>
                    <td>${user.gender}</td>
                    <td>${user.email}</td>
                    <td>${user.jobTitle}</td>
                </tr>
            `)}
        </table>
        `
    return res.status(200).end(html)
}

module.exports = {
    handleGetAllUsers,
    handleCreateUser,
    handleGetUserById,
    handleUpdateUserById,
    handleDeleteUserById,
    handleGetAllUsersHTML
}