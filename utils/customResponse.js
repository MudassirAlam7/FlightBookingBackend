export const customResponse = (res, status, message, error, success, data)=>{
    return res.status(status).json({
        message, 
        error,
        success, 
        data
    })
}