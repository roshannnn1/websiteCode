import { useState, useContext } from "react";
//import "./app.css";
import FormInput from "../components/FormInput";
import { AccountContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const {setUser} = useContext(AccountContext)

  const navigate = useNavigate()

  const [values, setValues] = useState({
    username: "",
    password: ""
  });

  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Username",
      errorMessage:
        "Username should be 3-16 characters and shouldn't include any special character!",
      label: "Username",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
    {
      id: 4,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage:
        "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
      label: "Password",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    }
  ];

  const handleSubmit = async (e) => {
    try{
      e.preventDefault()
      const response = await fetch(`/api/auth/login`, {
        mode: 'cors',
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...values
        })
      })

      if(response.ok){
        const data = await response.json()
        //setLoginError("")
        const userData = data.payload
        setUser({...userData})
        navigate("/")
        console.log(data)
      }else{
        const data = await response.json()
        console.log(data)
        window.alert(data.message)
      }

    }catch(error){
      console.log(`Register ERROR: ${error}`)
    }
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}
        <button>Submit</button>
      </form>
    </div>
  );
};

export default Login;