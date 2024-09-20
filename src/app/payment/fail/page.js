'use client';

import { useSearchParams } from 'next/navigation';

export default function FailPage() {
    const searchParams = useSearchParams();

    return (
        <div>
            <h2>결제 실패</h2>
            <p>오류 메시지: {searchParams.get('message')}</p>
            <p>오류 코드: {searchParams.get('code')}</p>
        </div>
    );
}
