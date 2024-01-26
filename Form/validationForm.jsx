import { useForm } from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";

const ValidationForm = () => {
    const schema = yup.object().shape({
      name : yup.string().required("please enter name"),
      email : yup.string().email("email not avaliable").required("please enter email"),
      age : yup.number().positive().min(18).max(80).required("please enter age"),
      password : yup.string().min(4).max(15).matches(/[a-z]+/).matches(/[A-Z]+/).matches(/\d+/).required("please enter password"),
      confirmpassword : yup.string().oneOf([yup.ref("password")] , "password not matches").required()
    })

    const {register , handleSubmit , formState:{errors}} = useForm({resolver : yupResolver(schema)})

    const onFormSubmit = (data) => {
        console.log("The Form Is Submited")
        console.log(data)
    }

    return (
        <form onSubmit={handleSubmit(onFormSubmit)}>
            <input type="text" placeholder="Name..." {...register("name")} />
            {errors.name && (
                <p>{errors.name?.message}</p>
            )}
            <input type="text" placeholder="Email..." {...register("email")} />
            {errors.email && (
                <p>{errors.email?.message}</p>
            )}
            <input type="number" placeholder="Age..." {...register("age")} />
            {errors.age && (
                <p>{errors.age?.message}</p>
            )}
            <input type="password" placeholder="Password..." {...register("password")} />
            {errors.password && (
                <p>{errors.password?.message}</p>
            )}
            <input type="password" placeholder="Confirm Password..." {...register("confirmpassword")} />
            {errors.confirmpassword && (
                <p>{errors.confirmpassword?.message}</p>
            )}
            <input type="submit"/>
        </form>
    );
}
export default ValidationForm;
