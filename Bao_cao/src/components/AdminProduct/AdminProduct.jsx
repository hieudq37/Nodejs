import React, { useState } from 'react';
import { WrapperHeader, WrapperUploadFile } from './style';
import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import TableComponent from '../TableComponent/TableComponent';
import { Form, Modal } from 'antd';
import InputComponent from '../InputComponent/InputComponent';
import { getBase64 } from '../../utils';
import * as ProductService from '../../services/ProductService';
import { useMutationHooks } from '../../useMutationHook.js/useMutationHook';

const AdminProduct = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm(); // Khởi tạo form instance

  const mutation = useMutationHooks((data) => ProductService.createProduct(data));

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleUpload = async (info) => {
    const file = info?.file?.originFileObj;
    if (file) {
      const preview = await getBase64(file);
      form.setFieldsValue({ image: preview }); // Cập nhật giá trị của trường "image" trong Form
    }
  };

  const onFinish = (values) => {
    mutation.mutate(values);
    console.log('Submitted:', values);
  };

  return (
    <div>
      <WrapperHeader>Quản lý sản phẩm</WrapperHeader>
      <div style={{ marginTop: '10px' }}>
        <Button
          style={{
            height: '150px',
            width: '150px',
            borderRadius: '6px',
            borderStyle: 'dashed',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onClick={() => setIsModalOpen(true)}
        >
          <PlusOutlined style={{ fontSize: '60px' }} />
        </Button>
      </div>
      <div style={{ marginTop: '10px' }}>
        <TableComponent />
      </div>
      <Modal title="Tạo sản phẩm" open={isModalOpen} onCancel={handleCancel} footer={null}>
        <Form
          form={form} // Gắn instance của form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
          initialValues={{
            name: '',
            price: '',
            description: '',
            rating: '',
            type: '',
            countInStock: '',
          }}
        >
          {['name', 'type', 'countInStock', 'price', 'description', 'rating'].map((field) => (
            <Form.Item
              key={field}
              label={field.charAt(0).toUpperCase() + field.slice(1)}
              name={field}
              rules={[{ required: true, message: `Please input your ${field}!` }]}
            >
              <InputComponent />
            </Form.Item>
          ))}

          <Form.Item label="Image" name="image" rules={[{ required: true, message: 'Please upload an image!' }]}>
            <WrapperUploadFile onChange={handleUpload} maxCount={1}>
              <Button>Select File</Button>
            </WrapperUploadFile>
            {form.getFieldValue('image') && (
              <img
                src={form.getFieldValue('image')}
                style={{
                  height: '60px',
                  width: '60px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  marginLeft: '10px',
                }}
                alt="avatar"
              />
            )}
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminProduct;
