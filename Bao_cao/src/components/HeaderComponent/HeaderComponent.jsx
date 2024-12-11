import { Badge, Col, Popover } from "antd";
import React, { useEffect, useState } from "react";
import { WrapperHeader, WrapperTextHeader, WrapperHeaderAccount, WrapperTextHeadearSmall, WrapperContentPopup } from "./style";
import {
    UserOutlined,
    CaretDownOutlined,
    ShoppingCartOutlined
} from '@ant-design/icons';
import ButtonInputSearch from "../ButtonInputSearch/ButtonInputSearch";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as UserService from '../../services/UserService'
import { resetUser } from '../../redux/slides/userSlide';
  const HeaderComponent = ({ isHiddenSearch = false, isHiddenCart = false,  isHiddenHeader = false }) => {
    const navigate = useNavigate()
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const [userName, setUserName] = useState('')
    const [userAvatar, setUserAvatar] = useState('')
    const [loading, setLoading] = useState(false)

    const handleNavigateLogin = () => {
        navigate('/sign-in')
    }

    const handleLogout = async () => {
        setLoading(true)
        await UserService.logoutUser()
        dispatch(resetUser())
        setLoading(false)
    }

    useEffect(() => {
        setUserName(user?.name)
        setUserAvatar(user?.avatar)
    }, [user?.name, user?.avatar])

    const content = (
        <div>
            <WrapperContentPopup onClick={handleLogout}>Đăng xuất</WrapperContentPopup>
            <WrapperContentPopup onClick={() => navigate('/profile-user')}>Thông tin người dùng</WrapperContentPopup>
            {user?.isAdmin && (<WrapperContentPopup onClick={() => navigate('/system/admin')}>Quản lý hệ thống</WrapperContentPopup>)}

        </div>
    );
    if (isHiddenHeader) return null; // Không render nếu isHiddenHeader = true
    return (
        <div>
            <WrapperHeader>
                <Col span={6}>
                    {/* gutter ni đẩy ra */}
                    <WrapperTextHeader gutter={16}>
                        37SHOP
                    </WrapperTextHeader>
                </Col>
                {!isHiddenSearch && (
                    <Col span={12}>
                        <ButtonInputSearch
                            size="large"
                            textButton="Tìm kiếm"

                            placeholder="input search text"
                        />
                    </Col>
                )}

                <Col span={6} style={{ display: 'flex', gap: '20px', alignItems: 'center' }} >
                    <loading isLoading={loading}>
                        <WrapperHeaderAccount>
                            {userAvatar ? (
                                <img
                                    src={userAvatar}
                                    style={{
                                        height: '30px',
                                        width: '30px',
                                        borderRadius: '50%',
                                        objectFit: 'cover',
                                    }}
                                    alt="avatar"
                                />
                            ) : (
                                <UserOutlined style={{ fontSize: '30px' }} />
                            )}

                            {user?.access_token ? (
                                <>

                                    <Popover content={content} trigger="click">
                                        <div style={{ cursor: 'pointer' }}>{userName?.length ? userName : user?.email}</div>
                                    </Popover>
                                </>
                            ) : (
                                <div onClick={handleNavigateLogin} style={{ cursor: 'pointer' }}>
                                    <WrapperTextHeadearSmall>Đăng nhập/Đăng ký</WrapperTextHeadearSmall>
                                    <div>
                                        <WrapperTextHeadearSmall>Tài khoản</WrapperTextHeadearSmall>
                                        <CaretDownOutlined />
                                    </div>

                                </div>
                            )}

                        </WrapperHeaderAccount>
                    </loading>
                    {!isHiddenCart && (
                        <div>
                            <Badge count={4} size="small">
                                <ShoppingCartOutlined style={{ fontSize: '30px', color: '#fff' }} />
                            </Badge>
                            <WrapperTextHeadearSmall>Giỏ hàng</WrapperTextHeadearSmall>
                        </div>
                    )}

                </Col>
            </WrapperHeader>

        </div>
    )
}

export default HeaderComponent