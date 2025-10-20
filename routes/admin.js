import { Router } from "express";

const adminRouter = Router();
adminRouter.get('/', async (req, res) => {
    // admin endpoint, send res to redirect to login page
    res.send(`Reached ${req.path}, Method ${req.method}`);
})

adminRouter.post('/signin', async (req, res) => {
    // sign admin in
    res.send(`Reached ${req.path}, Method ${req.method}`);
});

adminRouter.post('/course', async (req, res) => {
    // add a course
    res.send(`Reached ${req.path}, Method ${req.method}`);
})

adminRouter.put('/course/:id', async (req, res) => {
    // update a course
    res.send(`Reached ${req.path}, Method ${req.method}`);
})

adminRouter.put('/course/:id/content', async (req, res) => {
    // add content to a course
    res.send(`Reached ${req.path}, Method ${req.method}`);
})

adminRouter.delete('/course/:id', async (req, res) => {
    // remove a course
    res.send(`Reached ${req.path}, Method ${req.method}`);
})

export default adminRouter;