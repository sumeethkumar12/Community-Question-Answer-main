//write a serverless function that should return a json object with a message property
export default function handler(req, res) {
    res.status(200).json({ message: 'Hello World' })
    }
    
