import React, { useEffect, useState } from 'react';
import { WrapperContainerLeft, WrapperContainerRight, WrapperTextLight } from './style';
import InputForm from '../../components/InputForm/InputForm';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import imagelogo from '../../assets/images/logo-login.png';
import { Image } from 'antd';
import { useNavigate } from 'react-router-dom';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import * as UserService from '../../services/UserService'
import { useMutationHooks } from '../../useMutationHook.js/useMutationHook';
import * as message from '../../components/Message/Message'
const SignUpPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const mutation = useMutationHooks(
    data => UserService.signupUser(data)
  )

const {data, isLoading, isSuccess, isError} = mutation

useEffect(()=>{
    if(isSuccess){
      message.success()
      handleNavigateSignIn()
    } else if(isError){
      message.error()
    }
},[isSuccess, isError])



  const handleNavigateSignIn = () => {
    navigate('/sign-in');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };


  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleOnchangeEmail = (value) =>{
      setEmail(value)
  }

  const handleOnchangePassword = (value) =>{
    setPassword(value)
}


const handleOnchangeConfirmPassword = (value) =>{
  setConfirmPassword(value)
}

const handleSignUp = ()=>{
  mutation.mutate({email,password,confirmPassword})
}
  return (
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgb(0, 0, 0, 0.53)', height: '100vh'}}>
      <div style={{width: '800px', height: '445px', borderRadius: '6px', background: '#fff', display: 'flex'}}>
        <WrapperContainerLeft>
          <h1>Xin chào</h1>
          <p>Đăng nhập hoặc tạo tài khoản</p>
          <InputForm style={{marginBottom: '10px'}} placeholder="abc@gmail.com" value={email}  onChange={handleOnchangeEmail} />
          
          <div style={{position: 'relative', marginBottom: '10px'}}>
            <InputForm
              type={showPassword ? 'text' : 'password'}
              placeholder="password"
              value={password}  onChange={handleOnchangePassword}
            />
            <span
              onClick={togglePasswordVisibility}
              style={{position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer'}}
            >
              {showPassword ? <EyeTwoTone /> : <EyeInvisibleOutlined />}
            </span>
          </div>

          <div style={{position: 'relative'}}>
            <InputForm
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="confirm password"
              value={confirmPassword}  onChange={handleOnchangeConfirmPassword}
            />
            <span
              onClick={toggleConfirmPasswordVisibility}
              style={{position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer'}}
            >
              {showConfirmPassword ? <EyeTwoTone /> : <EyeInvisibleOutlined />}
            </span>
          </div>
        {data?.status === 'ERR' && <span style={{color:'red'}}>{data?.message}</span>}
          <ButtonComponent
          disabled={!email.length || !password.length || !confirmPassword.length}
            onClick={handleSignUp}
           
            size={40}
            styleButton={{ background: 'rgb(255, 57, 69)', height: '48px', with: '100%', border: 'none', borderRadius: '4px', margin: '26px 0 10px'}}
            textButton={'Đăng ký'}
            styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}
          />

          <p>Bạn đã có tài khoản? <WrapperTextLight onClick={handleNavigateSignIn} style={{cursor: 'pointer'}}>Đăng nhập ngay</WrapperTextLight></p>
        </WrapperContainerLeft>

        <WrapperContainerRight>
          <Image src={imagelogo} preview={false} alt="image-logo" height="203px" width="203px" />
          <h4>Mua sắm tại đây</h4>
        </WrapperContainerRight>
      </div>
    </div>
  );
};

export default SignUpPage;
