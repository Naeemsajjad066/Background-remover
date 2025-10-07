import jwt from 'jsonwebtoken'

// middleware function to decode jwt token to get clerk id

const  authUser=async(req,res, next)=>{
    try {
        
        const token = req.headers.authorization || req.headers.token
        
        console.log("Auth token received:", token)

        if(!token){
            return res.json({success:false,message:"not authorized login again"})
        }
        
        // Remove 'Bearer ' prefix if present
        const tokenValue = token.startsWith('Bearer ') ? token.slice(7) : token
        
        const token_decode = jwt.decode(tokenValue)
        
        console.log("Decoded token:", token_decode)
        
        if (!token_decode) {
            return res.json({success:false,message:"Invalid token"})
        }

        // Clerk JWT tokens use 'sub' field for user ID
        const clerkId = token_decode.sub || token_decode.clerkId
        
        // Initialize req.body if it doesn't exist (for GET requests)
        if (!req.body) {
            req.body = {}
        }
        
        req.body.clerkId = clerkId
        
        console.log("ClerkId extracted:", clerkId)
        
        next()

    } catch (error) {
        console.log("Auth middleware error:", error.message)
        res.json({success:false,message:error.message})
    }
}


export default authUser