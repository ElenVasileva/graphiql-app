'use client';

import Link from 'next/link';

import styled from 'styled-components';

const Body = styled.body`
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #b7c2d7;
  background-color: #212a3b;
  height: 100vh;
`;

const Title = styled.h1`
  font-size: 32px;
  padding: 20px;
  font-weight: bold;
  text-align: center;
`;

const LinkWithStyle = styled(Link)`
  font-size: 26px;
  color: #00c2e0;
  text-decoration: none;
  cursor: pointer;
  text-wrap: nowrap;

  &:hover {
    text-decoration: underline;
  }
`;

const SpanWithStyle = styled.span`
  font-size: 26px;
`;

const ButtonWithStyle = styled.button`
  color: #00c2e0;
  cursor: pointer;
  text-wrap: nowrap;
  background-color: transparent;
  padding: 0;
  border: none;
  font: inherit;
  font-size: 26px;
  background-color: transparent;

  &:hover {
    border-bottom: solid 1px #00c2e0;
  }
`;

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <Body>
        <Title>Something went wrong!</Title>
        <div>
          <SpanWithStyle> Return to &#x20;</SpanWithStyle>
          <LinkWithStyle href="/">main page</LinkWithStyle>
          <SpanWithStyle> &#x20;or &#x20;</SpanWithStyle>
          <ButtonWithStyle onClick={() => reset()}>Try again</ButtonWithStyle>
        </div>
      </Body>
    </html>
  );
}
