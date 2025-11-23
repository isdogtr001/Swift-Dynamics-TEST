'use client';

import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import './styles.scss';
import '../../i18n'; // import config i18next
import { Button, Select } from 'antd';
import { useRouter } from 'next/navigation';

const { Option } = Select;

export default function LayoutAndStyle() {
  const { t, i18n } = useTranslation();
  const router = useRouter();

  const changeLanguage = (e: any) => {
    i18n.changeLanguage(e); // เปลี่ยนภาษา
  };

  const bottomShapesDefault = [
    'square',
    'circle',
    'ellipse',
    'trapezoid',
    'rectangle',
    'parallelogram',
  ];

  const [bottomShapes, setBottomShapes] = useState(bottomShapesDefault);

  const moveShape = () => {
    setBottomShapes((prev) => [...prev.slice(1), prev[0]]);
  };
  const movePosition = () => {
    setBottomShapes((prev) => [...prev].reverse());
  };

  const shuffleShapes = () => {
    setBottomShapes((prev) => [...prev].sort(() => Math.random() - 0.5));
  };

  return (
    <div className="layout-page">
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
      <div style={{ padding: 80 }}>
        <div className="top-row">
          <Button className="card-box" onClick={moveShape}>
            <div className="shape-container">
              <div className="triangle-left"></div>
            </div>
            <div className="shape-btn" onClick={moveShape}>
              {t('moveShape')}
            </div>
          </Button>

          <Button className="card-box" onClick={movePosition}>
            <div className="shape-container">
              <div className="triangle-up"></div>
              <div className="triangle-down"></div>
            </div>
            <div className="shape-btn">{t('movePosition')}</div>
          </Button>

          <Button className="card-box" onClick={moveShape}>
            <div className="shape-container">
              <div className="triangle-right"></div>
            </div>
            <div className="shape-btn">{t('moveShape')}</div>
          </Button>
        </div>

        <div className="bottom-grid">
          {bottomShapes.map((shape, idx) => (
            <Button
              key={idx}
              className="bottom-card"
              onClick={shuffleShapes}
              type="default"
            >
              <div className={`${shape}`} />
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
