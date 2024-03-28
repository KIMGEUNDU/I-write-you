/** @jsxImportSource @emotion/react */

import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '@/supabaseClient';

export default function ReceivedRead() {
  const paramsId = useParams();

  useEffect(() => {
    const updateLetterRead = async () => {
      // 이미 true인 경우 update X
      const { data, error } = await supabase
        .from('letter')
        .update({ read: true })
        .eq('id', paramsId);

      if (error) {
        console.error('Error updating letter read: ', error);
      }

      return data;
    };

    updateLetterRead();
  }, [paramsId]);

  return (
    <>
      <h1>받은 편지 읽는 페이지</h1>
    </>
  );
}
