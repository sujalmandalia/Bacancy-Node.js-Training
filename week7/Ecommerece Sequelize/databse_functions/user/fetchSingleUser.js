import User from "../../models/userModel.js"
import { CustomErrorHandler, httpStatusCodes } from "../../utils/customErrorHandler.js"

const fetchSingleUser = async(id)=>{
  try {
    if(!id){
      throw new CustomErrorHandler("Invalid Data",httpStatusCodes["Bad Request"])
    }
    const data = await User.findByPk(id,{
      attributes:{exclude:['password']}
    })
    if(!data){
      throw new CustomErrorHandler("No Data Found",httpStatusCodes["Bad Request"])
    }
    return data.toJSON()
  } catch (error) {
    throw new CustomErrorHandler(error.message,httpStatusCodes["Bad Request"])
  }
}

export default fetchSingleUser