const express = require("express");
const router = express.Router();

const { jwtAuthMiddleware, generateToken } = require('./../jwt');
const Candidate = require("../models/candidate");
const User = require("../models/user");

const checkAdminRole = async (userId) => {
    try {
        const user = await User.findById(userId);
        return user.role === 'admin';
    } catch (err) {
        return false;
    }
}

router.post('/', jwtAuthMiddleware, async (req, res) => {
    try {
        if (!await checkAdminRole(req.user.id)) {
            return res.status(404).json({ message: 'user has not admin role' });
        }
        const data = req.body;
        const newCandidate = new Candidate(data);

        const response = await newCandidate.save();
        console.log('data saved');

        res.status(200).json({ response: response });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

// mongodb://127.0.0.1:27017


router.put('/:candidateID', jwtAuthMiddleware, async (req, res) => {
    try {
        if (!await checkAdminRole(req.user.id)) {
            return res.status(403).json({ message: 'user has not admin role' });
        }
        const candidateID = req.params.candidateID;
        const updateCandidateData = req.body;
        const response = await Candidate.findByIdAndUpdate(candidateID, updateCandidateData, {
            new: true,
            runValidators: true,
        })
        if (!response) {
            return res.status(404).json({ error: 'Candidate not found' });
        }
        console.log("candidate data updated");
        res.status(200).json(response);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

router.delete('/:candidateID', jwtAuthMiddleware, async (req, res) => {
    try {
        if (! await checkAdminRole(req.user.id)) {
            return res.status(403).json({ message: 'user has not admin role' });
        }
        const candidateID = req.params.candidateID;
        const response = await Candidate.findByIdAndDelete(candidateID);

        if (!response) {
            return res.status(404).json({ error: 'Candidate not found' });
        }
        console.log("candidate deleted");
        res.status(200).json(response);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})


router.post('/vote/:candidateId', jwtAuthMiddleware, async (req, res) => {
    const candidateID = req.params.candidateId;
    const userId = req.user.id;

    try {
        const candidate = await Candidate.findById(candidateID);
        if (!candidate) {
            return res.status(404).json({ message: 'Candidate not found' });
        }
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (user.isVoted) {
            return res.status(404).json({ message: 'you have already voted' });
        }
        if (user.role === 'admin') {
            return res.status(403).json({ message: 'Admin not allowed' });
        }

        candidate.votes.push({ user: userId });
        candidate.voteCount++;
        await candidate.save();

        user.isVoted = true;
        await user.save();
        res.status(200).json({ message: 'Vote recorded successfully' });

    } catch (err) {
        return res.status(500).json({ error: 'Internal Server error' });
    }
})

router.get('/vote/count', async (req, res) => {
    try {
        const candidate = await Candidate.find().sort({ voteCount: 'desc' });
        const record = candidate.map((data) => {
            return {
                party: data.party,
                count: data.voteCount
            }
        })
        return res.status(200).json(record);

    } catch (err) {
        return res.status(500).json({ error: 'Internal Server error' });
    }
})


module.exports = router;