

const router = require('express').Router();
const prisma = require('../prisma/prisma-client.js')


router.post('/signup', async(req, res)=>{
    try{
     const user =  await prisma.user.create({
            data: {
              name: 'Alice',
              email: 'alice@prisma.io',
              posts: {
                create: { title: 'Hello World' },
              },
              profile: {
                create: { bio: 'I like turtles' },
              },
            }
        })

        console.log(user, "user test");
    }catch(err){
        console.log(err);
    }
})


module.exports = router;