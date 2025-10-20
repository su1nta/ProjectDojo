import { Router } from "express";

const userRouter = Router();
userRouter.get('/', async (req, res) => {
    // /user/ endpoint, send msg to redirect to signin page
    res.send(`Reached ${req.originalUrl}, Method ${req.method}`);
})

userRouter.post('/signup', async (req, res) => {
    // signup endpoint
    res.send(`Reached ${req.originalUrl}, Method ${req.method}`);
});

userRouter.post('/signin', async (req, res) => {
    // signin endpoint
    res.send(`Reached ${req.originalUrl}, Method ${req.method}`);
})

userRouter.get('/me', async (req, res) => {
    // send signedin user details
    res.send(`Reached ${req.originalUrl}, Method ${req.method}`);
})

export default userRouter;