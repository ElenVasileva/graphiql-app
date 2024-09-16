'use client';

import { useTranslations } from 'next-intl';

import Link from 'next/link';

import styled from 'styled-components';

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
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

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations('ErrorBoundary');

  return (
    <Content>
      <div>
        <Title>{t('Something went wrong!')}</Title>
        <SpanWithStyle> {`${t('Return to')} `}</SpanWithStyle>
        <LinkWithStyle href="/">{t('main page')}</LinkWithStyle>
        <SpanWithStyle>{` ${t('or')} `}</SpanWithStyle>
        <ButtonWithStyle onClick={() => reset()}>
          {t('Try again')}
        </ButtonWithStyle>
      </div>
    </Content>
  );
}
