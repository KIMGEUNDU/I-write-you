/** @jsxImportSource @emotion/react */
import { informationState } from '@/recoil/atom/useOpen';
import { Common } from '@/style/Common';
import { mq } from '@/style/mq';
import { css } from '@emotion/react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/supabaseClient';
import { useRecoilState } from 'recoil';
import useSession from '@/store/useSession';

export default function Main() {
  const [open, setOpen] = useRecoilState(informationState);
  const session = useSession();

  return (
    <>
      <div css={div}>
        <p css={title}>
          <span>I WRITE</span>
          <span css={you}>YOU</span>
        </p>
        <div css={background}>
          <span css={subTitle}>Save Memories</span>
        </div>
        <button type="button" css={information} onClick={() => setOpen(!open)}>
          ?
        </button>
      </div>
      {!session && (
        <section css={{ maxWidth: '400px', margin: '0 auto' }}>
          <Auth
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            theme="dark"
            providers={['github']}
          />
        </section>
      )}
    </>
  );
}

const div = css({
  background: '#ed94a1',
  position: 'relative',
  overflow: 'hidden',
  width: '100%',
  height: '100%',
});

const title = mq({
  position: 'absolute',
  top: 0,
  left: 0,
  display: 'flex',
  flexDirection: 'column',
  zIndex: 1,
  fontSize: ['25vw', '20vw', '20vw', '200px'],
  color: Common.colors.lightYellow,
});

const background = mq({
  width: '100%',
  height: '80vh',
  background: `${Common.colors.mint} url("/sliceHotel.png") no-repeat 50% 90%`,
  backgroundSize: 'auto 75%',
  transform: 'translateY(30%)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: ['center', 'center', 'flex-end', 'flex-end'],
});

const you = css({
  position: 'absolute',
  bottom: '-60%',
  left: '15px',
});

const subTitle = mq({
  position: 'absolute',
  top: '90px',
  right: '-80px',
  fontSize: '30px',
  transform: 'rotate(90deg)',
  color: Common.colors.lightYellow,
});

const information = css({
  position: 'absolute',
  top: '120px',
  right: '0px',
  border: `none`,
  backgroundColor: Common.colors.darkPurple,
  color: 'white',
  borderRadius: '50%',
  fontSize: '20px',
  width: '30px',
  height: '30px',
  cursor: 'pointer',
});
