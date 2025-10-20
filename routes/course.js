import { Router } from "express";

const courseRouter = Router();
courseRouter.get('/explore', async (req, res) => {
    // show all courses
    res.send(`Reached ${req.path}, Method ${req.method}`);
})

courseRouter.get('/', async (req, res) => {
    // show user's bought courses
    res.send(`Reached ${req.path}, Method ${req.method}`);
});

courseRouter.post('/:id/purchase', async (req, res) => {
    // purchase a course
    res.send(`Reached ${req.path}, Method ${req.method}`);
})

courseRouter.post('/:id/content', async (req, res) => {
    // access a course content, query param contains course id
    res.send(`Reached ${req.path}, Method ${req.method}`);
})

export default courseRouter;