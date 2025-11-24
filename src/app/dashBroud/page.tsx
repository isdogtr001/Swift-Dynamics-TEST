'use client'; // จำเป็นสำหรับ Next.js App directory ที่ใช้ useTranslation

import { useTranslation } from 'react-i18next';
import '../../i18n'; // import config i18next
import { Input, Select, DatePicker, Radio, Button, Table, Form } from 'antd';
import { useState } from 'react';
import type { ColumnsType } from 'antd/es/table';
import styles from './_page.module.scss';
import { useRef } from 'react';
import React from 'react';
import type { InputRef, FormProps } from 'antd';
import PhoneSelect from './phoneSelect';
import CountrySelect from './countryselect';
import { RootState } from '../../store/store';
import { deleteItem, edit, setValue } from '../../store/reducer';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';

const { Option } = Select;

interface UserInputData {
  title: string;
  firstName: string;
  lastName: string;
  birthDay: string;
  nationality: string;
  gender: string;
  mobileNo: string;
  phoneCode: string;
  passportNo: string;
  expectSalaly: string;
  id1: string;
  id2: string;
  id3: string;
  id4: string;
  key?: string;
}

export default function Home() {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const [formData, setFormData] = useState<any>({});
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editKey, setEditKey] = useState<string>('');
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const IDs = ['id1', 'id2', 'id3', 'id4'];
  const userData = useSelector((state: RootState) => state.manageData);
  const [form] = Form.useForm();
  const router = useRouter();

  const data: any[] = userData;

  const generateRandomToken = () => {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  };

  const onFinish: FormProps<UserInputData>['onFinish'] = (values) => {
    if (editMode) {
      const sendData: any = {
        ...values,
        name: values.firstName + ' ' + values.lastName,
        id: formData.id1 + formData.id2 + formData.id3 + formData.id4,
        mobileNo: formData.phoneCode + values.mobileNo,
        key: editKey,
        birthDay: formData.birthDay,
      };
      dispatch(edit(sendData));
      setEditMode(false);
    } else {
      const sendData: any = {
        ...values,
        name: values.firstName + ' ' + values.lastName,
        id: formData.id1 + formData.id2 + formData.id3 + formData.id4,
        mobileNo: formData.phoneCode + values.mobileNo,
        key: generateRandomToken(),
        birthDay: formData.birthDay,
      };
      dispatch(setValue(sendData));
    }
    form.resetFields();
  };

  const onFinishFailed: FormProps<UserInputData>['onFinishFailed'] = (
    errorInfo
  ) => {
    console.log('Failed:', errorInfo);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedKeys: React.Key[]) => {
      console.log('Selected Row Keys: ', selectedKeys);
      setSelectedRowKeys(selectedKeys);
    },
  };

  const inputRefs = useRef<Array<InputRef | null>>([]);

  const handleChange = (name: string, value: any) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleChangeID = (name: string, value: any) => {
    setFormData({ ...formData, [name]: value });
    const index = IDs.indexOf(name);
    const max = name === 'id1' ? 4 : 3;

    if (value.length >= max) {
      const nextRef = inputRefs.current[index + 1];
      nextRef?.focus(); // AntD InputRef มี focus() method
    }
  };

  const changeLanguage = (e: any) => {
    i18n.changeLanguage(e); // เปลี่ยนภาษา
  };

  const handleEdit = (data: UserInputData) => {
    form.setFieldsValue({
      title: data.title,
      firstName: data.firstName,
      lastName: data.lastName,
      birthDay: dayjs(data.birthDay, 'DD/MM/YYYY'),
      nationality: data.nationality,
      gender: data.gender,
      phoneCode: data.phoneCode,
      mobileNo: data.mobileNo,
      passportNo: data.passportNo,
      expectSalaly: data.expectSalaly,
      id1: data.id1,
      id2: data.id2,
      id3: data.id3,
      id4: data.id4,
    });

    setFormData(data);
  };

  const returnGender = (g: string) => {
    if (g === 'M') {
      return t('Man');
    } else if (g === 'F') {
      return t('Woman');
    } else {
      return t('Unsex');
    }
  };

  const [page, setPage] = useState<number>(1);

  const columns: ColumnsType<any> = [
    {
      title: t('Name'),
      dataIndex: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: t('Gender'),
      dataIndex: 'gender',
      render: (_, record) => <div>{returnGender(record.gender)}</div>,
      sorter: (a, b) => a.gender.localeCompare(b.gender),
    },
    {
      title: t('MobileNo'),
      dataIndex: 'mobileNo',
      sorter: (a, b) => a.phone.localeCompare(b.phone),
    },
    {
      title: t('Nationality'),
      dataIndex: 'nationality',
      sorter: (a, b) => a.nationality.localeCompare(b.nationality),
    },
    {
      title: t('Manage'),
      key: 'manage',
      render: (_, record) => (
        <div style={{ display: 'flex', gap: 10 }}>
          <Button
            type="link"
            onClick={() => {
              console.log('record', record);
              const editData: UserInputData = {
                title: record.title,
                firstName: record.firstName,
                lastName: record.lastName,
                birthDay: record.birthDay,
                nationality: record.nationality,
                gender: record.gender,
                mobileNo: record.mobileNo.slice(3, 9),
                phoneCode: record.mobileNo.slice(0, 3),
                passportNo: record.passportNo,
                expectSalaly: record.expectSalaly,
                id1: record.id.slice(0, 4),
                id2: record.id.slice(4, 7),
                id3: record.id.slice(7, 10),
                id4: record.id.slice(10, 13),
              };

              setEditKey(record.key);
              handleEdit(editData);
              setEditMode(true);
            }}
          >
            {t('edit')}
          </Button>
          <Button
            type="link"
            danger
            onClick={() => dispatch(deleteItem({ key: record.key }))}
          >
            {t('delete')}
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className={styles.box}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div>
          <h1>{t('Header')}</h1>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            alignItems: 'flex-end',
          }}
        >
          <Select
            style={{ width: 200 }}
            value={i18n.language}
            onChange={changeLanguage}
          >
            <Option value="en">{t('EN')}</Option>
            <Option value="th">{t('TH')}</Option>
          </Select>
          <Button
            onClick={() => router.push('/')}
            style={{ width: 100, float: 'right' }}
          >
            {t('Home')}
          </Button>
        </div>
      </div>

      <div className={styles.page}>
        <Form
          form={form}
          className={styles.formBox}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <div className={styles.row}>
            <div className={styles.titleRow}>
              <Form.Item<UserInputData>
                label={t('Title')}
                name="title"
                rules={[
                  {
                    required: true,
                    message: `${t('errorWarning')} ${t('Title')}!`,
                  },
                ]}
              >
                <Select
                  size="large"
                  placeholder={t('Choice')}
                  onChange={(v) => handleChange('title', v)}
                  options={[
                    { value: 'M', label: 'นาย' },
                    { value: 'F', label: 'นาง' },
                    { value: 'LM', label: 'ดช' },
                    { value: 'LF', label: 'ดญ' },
                  ]}
                />
              </Form.Item>
            </div>

            <div className={styles.field}>
              <Form.Item<UserInputData>
                label={t('FirstName')}
                name="firstName"
                rules={[
                  {
                    required: true,
                    message: `${t('errorWarning')} ${t('FirstName')}!`,
                  },
                ]}
              >
                <Input
                  onChange={(e) => handleChange('firstName', e.target.value)}
                />
              </Form.Item>
            </div>
            <div className={styles.field}>
              <Form.Item<UserInputData>
                label={t('LastName')}
                name="lastName"
                rules={[
                  {
                    required: true,
                    message: `${t('errorWarning')} ${t('LastName')}!`,
                  },
                ]}
              >
                <Input
                  onChange={(e) => handleChange('lastName', e.target.value)}
                />
              </Form.Item>
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <Form.Item<UserInputData>
                label={t('BirthDay')}
                name="birthDay"
                rules={[
                  {
                    required: true,
                    message: `${t('errorWarning')} ${t('BirthDay')}!`,
                  },
                ]}
              >
                <DatePicker
                  size="large"
                  className={styles.fullWidth}
                  style={{ width: '100%' }}
                  onChange={(value) => {
                    const date = value.format('DD/MM/YYYY');
                    handleChange('birthDay', date);
                  }}
                  format="DD/MM/YYYY"
                />
              </Form.Item>
            </div>
            <div className={styles.field}>
              <Form.Item<UserInputData>
                label={t('Nationality')}
                name="nationality"
                rules={[
                  {
                    required: true,
                    message: `${t('errorWarning')} ${t('Nationality')}!`,
                  },
                ]}
              >
                <CountrySelect
                  value={formData.nationality}
                  onChange={(v) => handleChange('nationality', v)}
                />
              </Form.Item>
            </div>
          </div>

          <div className={styles.field}>
            <label>{t('ID')}:</label>
            <div className={styles.idGrid}>
              {IDs.map((id, index) => (
                <div key={id} style={{ display: 'flex', alignItems: 'center' }}>
                  <Form.Item
                    key={id}
                    name={id}
                    rules={[{ required: false }]}
                    style={{ marginBottom: 0, width: '100%' }}
                  >
                    <Input
                      inputMode="numeric"
                      maxLength={id === 'id1' ? 4 : 3}
                      onChange={(e) => handleChangeID(id, e.target.value)}
                      ref={(el) => {
                        inputRefs.current[index] = el;
                      }}
                    />
                  </Form.Item>
                  {id !== 'id4' && (
                    <div style={{ marginTop: 5, paddingLeft: 10 }}> -</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className={styles.field} style={{ marginTop: 10 }}>
            <Form.Item<UserInputData>
              label={t('Gender')}
              name="gender"
              rules={[
                {
                  required: true,
                  message: `${t('errorWarning')} ${t('Gender')}!`,
                },
              ]}
            >
              <Radio.Group
                onChange={(e) => handleChange('gender', e.target.value)}
                style={{ display: 'flex', gap: 20 }}
              >
                <Radio value="M">{t('Man')}</Radio>
                <Radio value="F">{t('Woman')}</Radio>
                <Radio value="MF">{t('Unsex')}</Radio>
              </Radio.Group>
            </Form.Item>
          </div>

          <div className={styles.field}>
            <div className={styles.phoneRow}>
              <Form.Item<UserInputData>
                label={t('MobileNo')}
                name="phoneCode"
                rules={[
                  {
                    required: true,
                    message: `${t('errorWarning')}!`,
                  },
                ]}
              >
                <PhoneSelect onChange={(v) => handleChange('phoneCode', v)} />
              </Form.Item>
              <Form.Item<UserInputData>
                name="mobileNo"
                rules={[
                  {
                    required: true,
                    message: `${t('errorWarning')} ${t('MobileNo')}!`,
                  },
                ]}
                style={{ width: '30%' }}
              >
                <Input
                  type="number"
                  pattern="[0-9]*"
                  maxLength={9}
                  value={formData.mobileNo}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '');
                    handleChange('phoneNumber', value);
                  }}
                />
              </Form.Item>
            </div>
          </div>

          <div className={styles.field} style={{ marginTop: 10 }}>
            <Form.Item<UserInputData>
              label={t('PassportNo')}
              name="passportNo"
              rules={[
                {
                  required: true,
                  message: `${t('errorWarning')} ${t('PassportNo')}!`,
                },
              ]}
            >
              <Input
                onChange={(e) => handleChange('passport', e.target.value)}
              />
            </Form.Item>
          </div>

          <div className={styles.field} style={{ marginTop: 10 }}>
            <Form.Item<UserInputData>
              label={t('ExpectSalaly')}
              name="expectSalaly"
              rules={[
                {
                  required: true,
                  message: `${t('errorWarning')} ${t('ExpectSalaly')}!`,
                },
              ]}
            >
              <Input
                type="number"
                onChange={(e) => handleChange('expectSalaly', e.target.value)}
              />
            </Form.Item>
          </div>

          <div className={styles.buttonRow}>
            <Button
              type="default"
              onClick={() => {
                setEditMode(false);
                form.resetFields();
              }}
            >
              {t('Reset')}
            </Button>
            <Form.Item label={null}>
              <Button type="primary" htmlType="submit">
                {editMode ? t('Save') : t('Sumbit')}
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginBottom: 10,
          marginTop: 100,
          gap: 12,
          alignItems: 'center',
        }}
      >
        <Button
          disabled={page === 1}
          onClick={() => {
            if (page > data.length % 10) {
              setPage((p) => p - 1);
            }
          }}
        >
          PREV
        </Button>

        <span
          style={{
            width: 32,
            height: 32,
            border: '1px solid #ccc',
            borderRadius: 4,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {page}
        </span>

        <Button
          onClick={() => {
            if (page < data.length % 10) {
              setPage((p) => p + 1);
            }
          }}
        >
          NEXT
        </Button>
      </div>
      <Button
        style={{ marginBottom: 10 }}
        onClick={() => {
          selectedRowKeys.forEach((key) => {
            dispatch(deleteItem({ key: key.toString() }));
          });
          setSelectedRowKeys([]); // reset selection
        }}
      >
        Delete Select
      </Button>
      <Table<any>
        columns={columns}
        dataSource={data}
        pagination={{
          current: page,
          pageSize: 10,
          total: data.length,
          onChange: (page) => setPage(page),
        }}
        rowSelection={rowSelection}
      />
    </div>
  );
}
