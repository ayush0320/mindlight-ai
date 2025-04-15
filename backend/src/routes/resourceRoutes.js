const express = require('express');
const router = express.Router();

// Mock data for resources
const resources = [
    {
        id: 1,
        category: 'Articles',
        title: 'Understanding Anxiety',
        description: 'Learn more about anxiety and how to cope with it',
        link: 'https://example.com/articles/anxiety',
    },
    {
        id: 2,
        category: 'Videos',
        title: 'Mindfulness Meditation',
        description: 'A guided mindfulness meditation video.',
        link: 'https://example.com/videos/mindfulness',
    },
    {
        id: 3,
        category: 'Activities',
        title: 'Daily Gratitude Journal',
        description: 'Write down things you are grateful for every day.',
        link: 'https://example.com/activities/gratitude-journal',
    },
]

//1. GET All Resources Route
router.get('/', (req, res) => {
    res.json(resources);
})

//2. GET Resources by Category Route
// > Goes through all resources
// > Checks if each resource's category matches what was requested
// > toLowerCase() makes the comparison case-insensitive
// > So "Articles", "articles", and "ARTICLES" all match
// > Creates a new list with only the matching resources
router.get('/:category', (req, res) => {

    const category = req.params.category;
    const filteredResources = resources.filter(
        (resource) => resource.category.toLowerCase() === category.toLowerCase()
    );

    if (filteredResources.length === 0) {
        return res.status(404).json({ message: 'No resources found for this category' });
    } res.json(filteredResources); //Send back the filtered list of resources
});

module.exports = router;

// Get all resources: http://mindlightai.com/resources
// Get only articles: http://mindlightai.com/resources/articles
// Get only videos: http://mindlightai.com/resources/videos
// Get only activities: http://mindlightai.com/resources/activities