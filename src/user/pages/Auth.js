import React, {useState, useContext} from 'react';
import Card from '../../shared/components/UIElements/Card';
import { useForm } from '../../shared/hooks/form-hook';
import Button from '../../shared/components/FormElements/Button';
import Input from '../../shared/components/FormElements/Input';
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators';
import { AuthContext } from '../../shared/context/auth-context';
import './Auth.css';


const Auth = props => {
    const auth = useContext(AuthContext);
    const [isLoginMode, setIsLonginMode] = useState(true);

    

    const [formState, inputHandler, setFormData] = useForm({
        email: {
            value: '',
            isValid: false
        },
        password: {
            value: '',
            isValid: false
        }
    }, false);

    const switchModeHandler = () => {
        if (!isLoginMode) {
            setFormData({
                ...formState.inputs,
                name: undefined
            }, formState.inputs.email.isValid && formState.inputs.password.isValid);
        } else {
            setFormData({
                ...formState.inputs,
                name: {
                    value: '',
                    isValid: false
                }
            }, false);
        }
        setIsLonginMode(prev => !prev);
    };

    const formSubmitHandler = event => {
        event.preventDefault();
        console.log(formState.inputs);
        auth.login();
    }

    return (<Card className="authentication">
        <h2>Login Required</h2>
        <form onSubmit={formSubmitHandler}>
        {!isLoginMode && <Input 
            element="input"
            id="name"
            type="text"
            label="Your Name"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid name."
            onInput={inputHandler}
        />}
            <Input
                id="email"
                element="input"
                type="input"
                label="E-mail"
                validators={[VALIDATOR_EMAIL()]}
                errorText="Please enter a valid password."
                onInput={inputHandler}
                
            />
            <Input
                id="password"
                element="input"
                type="password"
                label="password"
                validators={[VALIDATOR_MINLENGTH(5)]}
                errorText="Please enter a valid password (at least 5 characters)."
                onInput={inputHandler}
      
            />    
            <Button type="submit" disabled={!formState.isValid}>{isLoginMode ? 'LOGIN' : 'SIGNUP'}</Button>
        </form>
        <Button inverse onClick={switchModeHandler}>SWITCH TO {isLoginMode ? 'SIGNUP' : 'LOGIN'}</Button>
    </Card>);
}

export default Auth;