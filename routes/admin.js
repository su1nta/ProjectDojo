import { Router } from "express";

const adminRouter = Router();
adminRouter.get('/', async (req, res) => {
    // admin endpoint, send res to redirect to login page
    res.send(`Reached ${req.originalUrl}, Method ${req.method}`);
})

adminRouter.post('/signin', async (req, res) => {
    // sign admin in
    res.send(`Reached ${req.originalUrl}, Method ${req.method}`);
});

adminRouter.post('/course', async (req, res) => {
    // add a course
    res.send(`Reached ${req.originalUrl}, Method ${req.method}`);
})

adminRouter.put('/course/:id', async (req, res) => {
    // update a course
    const {id} = req.params;
    res.send(`Reached ${req.originalUrl}, Method ${req.method}, update course ${id}`);
})

adminRouter.put('/course/:id/content', async (req, res) => {
    // add content to a course
    const {id} = req.params;
    res.send(`Reached ${req.originalUrl}, Method ${req.method}, add content to course ${id}`);
})

adminRouter.delete('/course/:id', async (req, res) => {
    // remove a course
    const {id} = req.params;
    res.send(`Reached ${req.originalUrl}, Method ${req.method}, removing course ${id}`);
})

export default adminRouter;