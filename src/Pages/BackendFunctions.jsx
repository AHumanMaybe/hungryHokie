import axios from "axios";

const serverAddress = "18.189.31.236";

export default function BackendFunctions(props)
{
    const username = "marco";
    const password = "password";
    async function httpPOSTexample()
    {
        axios.post(`http://${serverAddress}:8000/login`,{
            username: username,
            password: password
        })
        .then(response=>console.log(response.data));

        return;
        try
        {
            const response = await fetch(`http://${serverAddress}:8000/login`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            })
            .then(response=>response.json())
            .then(data=>{
                console.log(data);

            });
        }
        catch(error)
        {
            console.error(error);
        }
    }

    async function httpGETexample()
    {

    }

    return(
        <div style={{alignItems: "center", justifyItems: "center", display:"grid", gridTemplateColumns: "auto"}}>
            <button onClick={httpPOSTexample}> MAKE POST REQUEST</button>
            <br />
            <button onClick={httpGETexample}> MAKE GET REQUEST</button>
        </div>
    );
}