const express = require('express');
const router = express.Router();

const {
    readSingleImage,
    writeSingleImage,
    deleteSingleImage
} = require('../handlers/imageStorage.handlers');

//GET one image
router.get('/:id', readSingleImage, (req,res) => {
    res.status(200).end();
});

//POST one image
router.post('/', writeSingleImage, (req, res) => {
    res.status(201).json({message: 'success', id: res.id});
})

//DELETE one image
router.delete('/:id', deleteSingleImage, (req, res) => {
    res.status(200).json({ message: "image deleted"});
})

module.exports = router;