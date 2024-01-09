/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const hotpink = css({
  color: 'hotpink',
  background: ['red', 'linear-gradient(#e66465, #9198e5)'],
  '&:hover': css({ color: 'whitesmoke' }),
});

export default function Home() {
  return (
    <>
      <div
        css={css({
          color: 'green',
          '&:hover': hotpink,
        })}
      >
        그린
      </div>
      <div css={hotpink}>핫핑크</div>
    </>
  );
}
