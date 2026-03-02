import { useForm, type FieldErrors } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useFieldArray } from "react-hook-form";
import { useEffect } from "react";
let render = 0;

type FormData = {
  Username: string;
  emailId: string;
  Channel: string;
  social: {
    facebook: string;
    twitter: string;
  };
  phNumber:{
    number:string
  }[];
  dob:Date
};

export const Youtube = () => {
  const form = useForm<FormData>({
    defaultValues: {
      Username: "",
      emailId: "",
      Channel: "beast",
      social: {
        facebook: "",
        twitter: "",
      },
      phNumber:[{number:''}],
      dob: new Date()
    },
  });

  const { register, control, handleSubmit, formState,watch,getValues,setValue,reset } = form;
  const { errors,isDirty ,isValid,isSubmitting,isSubmitSuccessful} = formState;
  console.log(isSubmitting)
  console.log(isDirty)
  const watchfield= watch('Username')
 const {fields,append,remove} =useFieldArray({
name:'phNumber',
control
 })
  const onSubmit = (data: FormData) => {
    console.log("successful submit", data);
  };

  const setField= ()=>{
    setValue("Username", '',{
      shouldTouch:true,
      shouldValidate:true,
      shouldDirty:true
    })
  }
  render++;
const  handleField= ()=>{
  console.log('watch field',getValues('Username'))
}
 const  onError= (error:FieldErrors<FormData>)=>{
  console.log(error)
 }
useEffect(()=>{
  if(isSubmitSuccessful)
    reset()
},[isSubmitSuccessful,reset])

  return (
    <div className="container">
      <div className="form-card">
        <h2 className="title">Create Channel</h2>
        {render}
        <div>
     <h2>watch username:{watchfield}</h2>
        </div>
       
        <form className="form" onSubmit={handleSubmit(onSubmit,onError)} noValidate>

          {/* Username */}
          <div className="input-group">
            <label>Username</label>
            <input
              type="text"
              {...register("Username", {
                required: "Username is required",
              })}
              placeholder="Enter username"
            />
            <p style={{ color: "red" }}>
              {errors.Username?.message}
            </p>
          </div>

          {/* Email */}
          <div className="input-group">
            <label>Email ID</label>
            <input
              type="email"
              {...register("emailId", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter valid email",
                },
                validate: {
                  notAdmin: (value) =>
                    value !== "admin@gmail.com" ||
                    "Enter different email",
                  blacklistDomain: (value) =>
                    !value.endsWith("baddomain.com") ||
                    "This domain is not valid",
                },
              })}
              placeholder="Enter email"
            />
            <p style={{ color: "red" }}>
              {errors.emailId?.message}
            </p>
          </div>

          {/* Channel */}
          <div className="input-group">
            <label>Channel</label>
            <input
              type="text"
              {...register("Channel", {
                required: "Channel is required",
              })}
              placeholder="Enter channel name"
            />
            <p style={{ color: "red" }}>
              {errors.Channel?.message}
            </p>
          </div>

          {/* Facebook */}
          <div className="input-group">
            <label>Facebook</label>
            <input
              type="text"
              {...register("social.facebook", {
                disabled:watch('Username')==='',
                required: "Facebook is required",
              })}
              placeholder="Enter Facebook link"
            />
            <p style={{ color: "red" }}>
              {errors.social?.facebook?.message}
            </p>
          </div>
        {/* Username */}
          <div className="input-group">
            <label>date</label>
            <input
              type="date"
              {...register("dob", {
                valueAsDate:true,
                required: "date is required",
              })}
              placeholder="Enter date"
            />
            <p style={{ color: "red" }}>
              {errors.dob?.message}
            </p>
          </div>


          {/* Twitter */}
          <div className="input-group">
            <label>Twitter</label>
            <input
              type="text"
              {...register("social.twitter", {
                required: "Twitter is required",
              })}
              placeholder="Enter Twitter link"
            />
            <p style={{ color: "red" }}>
              {errors.social?.twitter?.message}
            </p>
          </div>
         <div>
        <label htmlFor=""> list of phonenumbers</label>
         <div>
         { fields.map((field,index)=>{
          return(
          <div className="form-control" key={field.id}>
           <input type="text" {...register(`phNumber.${index}.number` as const)} />
           {
            index >0 &&(
              <button type="button" onClick={()=>remove(index)}>remove  phone</button>

            )
           }
          </div>)
         })}

       
        <button type="button" onClick={()=>append({number:''})}>Add phone</button>

         </div>
    



         </div>
        <button type="button" onClick={handleField}>watch field</button>

          <button type="button" onClick={setField}>set field</button> 
           // <button onClick={()=>reset()}>reset</button>


          <button type="submit" className="submit-btn" disabled= {!isDirty || !isValid || isSubmitting}>
            Submit
          </button>
        </form>

        <DevTool control={control} />
      </div>
    </div>
  );
};