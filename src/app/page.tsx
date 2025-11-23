'use client';
import { useRouter } from 'next/navigation';

export default function GoToDashBroud() {
  const router = useRouter();

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          gap: '20px'
        }}
      >
        <button
          onClick={() => router.push('/shape')}
          style={{
            padding: '20px 40px',
            fontSize: '20px',
            borderRadius: '12px',
            border: 'none',
            cursor: 'pointer',
            backgroundColor: '#007bff',
            color: 'white',
            transition: '0.3s',
          }}
        >
          ข้อ 1
        </button>
        <button
          onClick={() => router.push('/dashBroud')}
          style={{
            padding: '20px 40px',
            fontSize: '20px',
            borderRadius: '12px',
            border: 'none',
            cursor: 'pointer',
            backgroundColor: '#007bff',
            color: 'white',
            transition: '0.3s',
          }}
        >
          ข้อ 2
        </button>
      </div>
    </div>
  );
}
