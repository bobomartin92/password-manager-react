
import UserPasswords from '../models/postPassword.js'

export const getUser = async (req, res) => {
    const {username} = req.params
    try {
        const user = await UserPasswords.findOne({username: username})

        res.status(200).json(user);

    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

export const createUser = async (req, res) => {
    const user = req.body;

    const newUser = new UserPasswords(user);
    
    try {
        await newUser.save()

        res.status(201).json(newUser);

    } catch (error) {
        res.json({message: error.message})
    }
}

export const updateUser = async (req, res) => {
    const {username} = req.params
    const passData = req.body

    const user = await UserPasswords.findOne({username: username})

    user.passwords.push(passData)
    

    const updatedUser = await UserPasswords.findOneAndUpdate({username: username}, {...user}, {new:true})
    res.json(updatedUser)
}