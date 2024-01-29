/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

export default function Write() {
  return (
    <>
      <article
        css={css({
          textAlign: 'center',
        })}
      >
        <label htmlFor="photo" className="">
          <input
            type="file"
            accept="image/jpg,image/png,image/jpeg,image/webp,image/avif"
            name="photo"
            id="photo"
          />
        </label>
        <div
          css={css({
            margin: '0 auto',
          })}
        >
          <img src="/vite.svg" alt="photo" css={css({})} />
        </div>
      </article>
    </>
  );
}
