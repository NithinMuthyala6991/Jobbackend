
import { createToken } from "../middlewares/jwt.js";
import { _comparePassword, _hashPassword } from "../middlewares/password.js";
import jobs from "../models/jobs.js";
import users from "../models/users.js";

const userController = {
    signUp: async (req, res) => {

        try {
            const { name, email, password, userType } = req.body;
            const userExists = await users.findOne({ email });
            if (userExists) {
                throw new Error("User with email exists")
                return;
            }
            const hash = await _hashPassword(password)
            const newUser = users({
                name,
                email,
                password: hash,
                userType
            });
            await newUser.save();
            res.status(201).json({ success: true, message: "user created successfully", data: {} })
        } catch (error) {
            res.status(403).json({ success: false, message: error.message, data: {} })
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            const userExists = await users.findOne({ email }).lean();
            if (!userExists) {
                throw new Error("User doesn't email exists")
                return;
            } else {
                const isValidPassword = await _comparePassword(password, userExists.password);

                if (isValidPassword) {
                    const token = await createToken(userExists);
                    userExists.token = token;
                    res.status(200).json({ success: true, message: "Login successfully", data: userExists })
                } else {
                    throw new Error("Invalid password")
                }
            }






        } catch (error) {
            res.status(403).json({ success: false, message: error.message, data: {} })
        }
    },
    addJob: async (req, res) => {
        try {
            const { companyName, companyEmail, jobTitle, location, jobType, jobDescription } = req.body;
            // console.log(req.file)
            const newJob = jobs({
                companyName, companyEmail, jobTitle, location, jobType, jobDescription,
                postedBy : req.data._id

            })
            await newJob.save();
            res.status(201).json({ success: true, message: "Job created successfully", data: {} })
        } catch (error) {
            console.log(error)
            res.status(403).json({ success: false, message: error.message, data: {} })
        }
    },
    getAllJobs: async (req,res) => {
        try {
            const fetchJobs = await jobs.find().populate('postedBy').lean()
            res.status(200).json({ success: true, message: "Data fetched successfully", data: fetchJobs })
        } catch (error) {
            res.status(403).json({ success: false, message: error.message, data: {} })
        }
     },
    getMyJobs: async (req,res) => { 
        try {
            const fetchJobs = await jobs.find({postedBy : req.data._id}).lean()
            res.status(200).json({ success: false, message: "Data fetched successfully", data: fetchJobs })
        } catch (error) {
            res.status(403).json({ success: false, message: error.message, data: {} })
        }
    },
    deleteJob: () => { }
};

export default userController;