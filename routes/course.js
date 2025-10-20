import { Router } from "express";

const courseRouter = Router();
courseRouter.get('/explore', async (req, res) => {
    // show all courses
    res.send(`Reached ${req.originalUrl}, Method ${req.method}`);
})

courseRouter.get('/', async (req, res) => {
    // show user's bought courses
    res.send(`Reached ${req.originalUrl}, Method ${req.method}`);
});

courseRouter.post('/:id/purchase', async (req, res) => {
    // purchase a course
    const {id} = req.params;
    res.send(`Reached ${req.originalUrl}, Method ${req.method}, course ${id} purchase`);
})

courseRouter.post('/:id/content', async (req, res) => {
    // access a course content, query param contains course id
    const { id } = req.params;
    res.send(`Reached ${req.originalUrl}, Method ${req.method}, course ${id} contents`);
})

export default courseRouter;