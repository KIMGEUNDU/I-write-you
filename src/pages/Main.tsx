/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const hotpink = css({
  color: 'hotpink',
  background: ['red', 'linear-gradient(#e66465, #9198e5)'],
  '&:hover': css({ color: 'whitesmoke' }),
});

export default function Main() {
  const main = document.querySelector('main');
  main?.setAttribute('style', 'background: #2D3A6F');

  return (
    <>
      <div
        css={css({
          color: 'green',
          '&:hover': hotpink,
        })}
      >
        첫화면
      </div>
      <div css={hotpink}>핫핑크</div>
    </>
  );
}
