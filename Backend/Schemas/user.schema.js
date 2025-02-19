export const userSchema={
    fullName:{
        isString:true,
        notEmpty:{errorMessage:"fullName must provided"}
    },
    email:{
        isString:true,
        notEmpty:{errorMessage:"email must provided"}
    },
    password:{
        isString:true,
        notEmpty:{errorMessage:"password must provided"}
    }
}