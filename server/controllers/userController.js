import { Webhook } from "svix"
// https://localhost:5000/api/user/webhooks
const clerkWebhooks = async (req, res) => {
    // Handle Clerk webhooks here
    try {
        const whook=new Webhook(process.env.CLERK_WEBHOOK_SECRET)
        await whook.verify(JSON.stringify(req.body),{
            'svix-id':req.headers['svix-id'],
            'svix-timestamp':req.headers['svix-timestamp'],
            'svix-signature':req.headers['svix-signature']
        })
        const {data,type}=req.body
        switch(type){
            case 'user.created':
                // Handle user created event
                console.log('User created:',data)
                const userData={
                    clerkId:data.id,
                    email:data.email_addresses[0].email_address,
                    firstName:data.first_name,
                    lastName:data.last_name,
                    photo:data.image_url
                }
                await userModel.create(userData)
                res.json({success:true,message:"User created"})
                break;

            case 'user.updated':
                // Handle user updated event            
                console.log('User updated:',data)
                const updateData={
                    email:data.email_addresses[0].email_address,
                    firstName:data.first_name,
                    lastName:data.last_name,
                    photo:data.image_url
                }
                await userModel.findOneAndUpdate({clerkId:data.id},updateData)
                res.json({success:true,message:"User updated"})
                break; 
                     
            case 'user.deleted':
                // Handle user deleted event            
                console.log('User deleted:',data)
                await userModel.findOneAndDelete({clerkId:data.id})
                res.json({success:true,message:"User deleted"})
                break;

            default:
                console.log('Unhandled event type:',type)
        }
    }catch(err){
        res.json({success:false,message:"Invalid request"})
        cosole.log(err.message)
    }
}
export {clerkWebhooks}