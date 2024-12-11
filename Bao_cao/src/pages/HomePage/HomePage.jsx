import React from "react";
import TypeProduct from "../../components/TypeProduct/TypeProduct";
import { WrapperButtonMore, WrapperProducts, WrapperTypeProduct } from "./style";
import SliderComponent from "../../components/SliderComponent/SliderComponent";
import slider1 from "../../assets/images/slider1.webp";
import slider2 from "../../assets/images/slider2.webp";
import slider3 from "../../assets/images/slider3.webp";
import CardComponent from "../../components/CardComponent/CardComponent";
import { useQuery } from "@tanstack/react-query";



import * as ProductService from "../../services/ProductService"


const HomePage = () => {
    const arr = ['ÁO', 'QUẦN', 'PHỤ KIỆN']
    const fetchProductAll = async () => {
        const res = await ProductService.getAllProduct();
        return res; // Trả về dữ liệu cho query
    };
    
    // Sử dụng useQuery với đối tượng và cấu hình retry và retryDelay
    const { isLoading, data: products } = useQuery({
        queryKey: ['products'],   // Đặt key cho query
        queryFn: fetchProductAll, // Hàm lấy dữ liệu
        retry: 3,                 // Thử lại 3 lần nếu có lỗi
        retryDelay: 1000          // Delay 1 giây giữa các lần thử lại
    });
    
    return (
        <>
            <div style={{ margin: '0 auto', width: '1270px' }}>
                <WrapperTypeProduct>
                    {arr.map((item) => {
                        return (
                            <TypeProduct name={item} key={item}></TypeProduct>

                        )
                    })}
                </WrapperTypeProduct>
                <div className="body" style={{ width: '100%', backgroundColor: '#efefef' }}>
                    <div id="container" style={{ margin: '0 auto', height: '1000px', width: '1270px' }}>
                        <SliderComponent arrImages={[slider1, slider2, slider3]} />
                        <WrapperProducts>
                            {products?.data.map((product)=>{
                                return(
                                    <CardComponent key={product._id}
                                     countInStock={product.countInStock} 
                                     description={product.description} 
                                     image={product.image} 
                                     name={product.name}
                                     price ={product.price}
                                     rating = {product.rating}
                                     type={product.type}
                                     selled={product.selled}
                                     discount={product.discount}
                                     />
                                )
                            })}
                        </WrapperProducts>
                        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                            <WrapperButtonMore textButton="Xem thêm" type="outline" styleButton={{
                                border: '1px solid rgb(11, 116, 229)', color: 'rgb(11, 116, 229)', with: '240px', height: '38px', borderRadius: '4px'
                            }}
                                styleTextButton={{ fontWeight: 500 }} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HomePage