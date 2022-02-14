import React, { useCallback, useContext } from 'react'
import { Button, Row, Col, Image, Typography, Divider, Input } from 'antd';
import { signInWithGoogle, logInWithEmailAndPassword } from '../../../utils/firebase/authHelper';
import loginLogo from '../../../assets/images/loginLogo.svg';
import logo from '../../../assets/images/logo.svg';
import { useForm, Controller } from 'react-hook-form';
import { getDataLocalStorage, setDataLocalStorage } from '../../../utils/helpers/localStorageHelper';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../../utils/hooks/Auth';
import { ACTIONS, GlobalContext } from '../../../utils/context/GlobalContext';

// style 
import './Login.css';

// constants 
const { Title, Text } = Typography;

const Login = () => {

    // state 
    const { globalState, dispatch } = useContext(GlobalContext);
    useAuth();
    // hooks 
    const { handleSubmit, control, reset, formState: { errors } } = useForm({});
    const navigate = useNavigate();

    const onSubmit = useCallback((data) => {
        console.log("🚀 ~ file: Login.jsx ~ line 17 ~ onSubmit ~ data", data)
        logInWithEmailAndPassword(data.email, data.password);
    });

    const onGoogleSignIn = useCallback(async () => {
        const data = await signInWithGoogle();
        if (data !== null) {
            setDataLocalStorage('user-data', data);
            dispatch({ type: ACTIONS.CACHE_USER_DATA, payload: data });
            navigate('/');
            console.log("🚀 ~ file: Login.jsx ~ line 23 ~ onGoogleSignIn ~ data", data)
        }
    })

    return (
        <div>
            <Row>
                <Col className='section-one' span={12}>
                    <div className='logo-container'>
                        <Image src={loginLogo} preview={false} />
                        <Text className='text-title'>
                            Welcome to BTI Image Uploader App
                        </Text>
                    </div>
                </Col>
                <Col className='section-two' span={12}>
                    <div className='header-login'>
                        <div className='title-container'>
                            <Title className='title'>
                                Image uploader
                            </Title>
                            <Text className='sub-title'>
                                Upload your images to the cloud
                            </Text>
                        </div>
                        <Divider className='divider' type={'vertical'} />
                        <Image src={logo} preview={false} />
                    </div>
                    <div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Controller
                                name="email"
                                control={control}
                                render={({ field }) => <Input {...field} />}
                            />
                            <Controller
                                name="password"
                                control={control}
                                render={({ field }) => <Input type={"password"} {...field} />}
                            />
                            <Button htmlType="submit" >
                                sign in
                            </Button>
                        </form>
                        <Button onClick={() => onGoogleSignIn()}>
                            sign in with Google
                        </Button>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default Login